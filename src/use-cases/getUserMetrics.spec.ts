import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './getUserMetrics'



let checkInRepository: inMemoryCheckInRepository
let sut: GetUserMetricsUseCase
describe('Get user Metrics Use Case', () => {
  beforeEach(() => {
    checkInRepository = new inMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(checkInRepository)

  })

  it('should be able to get user metrics', async () => {



    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })



    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    await expect(checkInsCount).toEqual(2)

  })

})
