import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { inMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkIn'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'



let checkInRepository: inMemoryCheckInRepository
let sut: CheckInUseCase
let gymsRepository: inMemoryGymsRepository
describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new inMemoryCheckInRepository()
    gymsRepository = new inMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0)
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))




    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0
    })

    await expect(checkIn.id).toEqual(expect.any(String))

  })


  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0
    })

    await expect(
      () => {
        return (
          sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: 0,
            userLongitude: 0
          })
        )
      }
    ).rejects.toBeInstanceOf(Error)

  })


  it('should not be able to check in twice but in the different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0
    })

    vi.setSystemTime(new Date(2021, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    })



    await expect(checkIn.id).toEqual(expect.any(String))

  })

  it('should not be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-7.0799741),
      longitude: new Decimal(-34.8520448)
    })





    await expect(async () => {
      await sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -6.9718637,
        userLongitude: -34.8351054
      })
    }).rejects.toBeInstanceOf(Error)

  })
})
