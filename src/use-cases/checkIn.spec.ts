import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkIn'


let checkInRepository: inMemoryCheckInRepository
let sut: CheckInUseCase
describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new inMemoryCheckInRepository()
    sut = new CheckInUseCase(checkInRepository)
  })
  it('should be able to check in', async () => {

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01'
    })

    await expect(checkIn.id).toEqual(expect.any(String))

  })

})
