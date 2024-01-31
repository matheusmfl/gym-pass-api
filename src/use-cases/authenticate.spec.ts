import { expect, describe, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let userRepository: inMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    userRepository = new inMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository)
  })
  it('should be able to authenticate', async () => {


    await userRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password_hash: await hash('123456', 6)
    })


    const { user } = await sut.execute({
      email: 'jhondoe@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))

  })

  it('should not be able to authenticate with wrong e-mail', async () => {




    await expect(() => {
      return sut.execute({
        email: 'jhondoe@email.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

  it('should not be able to authenticate with wrong password', async () => {


    await userRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password_hash: await hash('123456', 6)
    })


    await expect(() => {
      return sut.execute({
        email: 'jhondoe@email.com',
        password: '123457',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

})
