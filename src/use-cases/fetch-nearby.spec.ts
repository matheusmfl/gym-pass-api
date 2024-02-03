import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyUseCase } from './fetch-nearby-gyms'
import { Decimal } from '@prisma/client/runtime/library'



let gymsRepository: inMemoryGymsRepository
let sut: FetchNearbyUseCase
describe('fetch nearby gyms  use case', () => {
  beforeEach(() => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new FetchNearbyUseCase(gymsRepository)
  })

  it('should be able to fetch Nearby gyms', async () => {


    await gymsRepository.create({
      id: 'gym-01',
      title: 'Near gym 2',
      description: '',
      phone: '',
      latitude: new Decimal(-7.0899741),
      longitude: new Decimal(-34.8620448)
    })

    await gymsRepository.create({
      id: 'gym-03',
      title: 'far gym',
      description: '',
      phone: '',
      latitude: new Decimal(-47.0899741),
      longitude: new Decimal(-44.8620448)
    })

    const { gyms } = await sut.execute({
      userLatitude: -7.0899741,
      userLongitude: -34.8620448
    })


    await expect(gyms).toHaveLength(1)

    await expect(gyms).toEqual([
      expect.objectContaining({ id: 'gym-01' }),
    ])
  })
})
