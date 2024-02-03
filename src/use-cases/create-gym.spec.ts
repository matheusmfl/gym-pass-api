import { expect, describe, it, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'


let gymsRepository: inMemoryGymsRepository
let sut: CreateGymUseCase
describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new inMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('should be able to register a gym', async () => {

    const { gym } = await sut.execute({
      latitude: 1000,
      longitude: 1000,
      title: 'Gyms-javascript',
      description: 'Olá mundo',
      phone: null
    })

    expect(gym.title).toEqual('Gyms-javascript')

  })
})
