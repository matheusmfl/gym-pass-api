import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'



let gymsRepository: inMemoryGymsRepository
let sut: SearchGymsUseCase
describe('Search gym test use case', () => {
  beforeEach(() => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {



    await gymsRepository.create({
      title: 'javascript-gyms',
      latitude: 1000,
      longitude: 1000,
    })


    await gymsRepository.create({
      title: 'typescript-gyms',
      latitude: 1000,
      longitude: 1000,
    })

    const { gyms } = await sut.execute({
      query: 'javascript-gyms',
      page: 1
    })

    await expect(gyms).toHaveLength(1)
    await expect(gyms).toEqual([
      expect.objectContaining({ title: 'javascript-gyms' }),
    ])
  })


  it('should be able to fetch paginated gyms search', async () => {



    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }


    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
