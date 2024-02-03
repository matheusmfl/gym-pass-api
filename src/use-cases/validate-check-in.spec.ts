import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { inMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFound } from './errors/resource-not-found-error'



let checkInRepository: inMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new inMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)


    // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })
  it('should be able to validate a check-in', async () => {
    // vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    await expect(checkIn.validated_at).toEqual(expect.any(Date))
    await expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))

  })


  it('should not be able to validate an inexistent check-in', async () => {
    // vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))



    await expect(async () => await sut.execute({
      checkInId: 'an-inexistent-check-in-id'
    })).rejects.toBeInstanceOf(ResourceNotFound)

  })
})
