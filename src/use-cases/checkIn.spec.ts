import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { inMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkIn'



let checkInRepository: inMemoryCheckInRepository
let sut: CheckInUseCase
describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new inMemoryCheckInRepository()
    sut = new CheckInUseCase(checkInRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01'
    })

    await expect(checkIn.id).toEqual(expect.any(String))

  })


  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01'
    })

    await expect(
      () => {
        return (
          sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
          })
        )
      }
    ).rejects.toBeInstanceOf(Error)

  })


  it('should not be able to check in twice but in the different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01'
    })

    vi.setSystemTime(new Date(2021, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })



    await expect(checkIn.id).toEqual(expect.any(String))

  })


})
