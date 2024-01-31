import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './getUserProfile'
import { ResourceNotFound } from './errors/resource-not-found-error'


let userRepository: inMemoryUsersRepository
let sut: GetUserProfileUseCase
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new inMemoryUsersRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })
  it('should be able get user Profile', async () => {


    const createdUser = await userRepository.create({
      id: 'teste',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password_hash: await hash('123456', 6)
    })
    console.log(createdUser.id)

    const { user } = await sut.execute({
      userId: createdUser.id
    })



    expect(user.name).toEqual('John Doe')

  })

  it('should not be able to get user profile with wrong id', async () => {

    const email = 'jhondoe@email.com'

    await expect(() =>
      sut.execute({
        userId: 'non-existing-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })


})
