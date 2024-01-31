import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'


let userRepository: inMemoryUsersRepository
let sut: RegisterUseCase
describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new inMemoryUsersRepository()
    sut = new RegisterUseCase(userRepository)
  })
  it('should hash user password upon registration', async () => {


    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)

  })

  it('should not be able to register with same email twice', async () => {


    const email = 'jhondoe@email.com'

    await sut.execute({
      name: 'Jhon Doe',
      email,
      password: '123456'
    })


    expect(async () => {
      await sut.execute({
        name: 'Jhon Doe',
        email,
        password: '123456'
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {


    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456'
    })
    expect(user.id).toEqual(expect.any(String))

  })
})
