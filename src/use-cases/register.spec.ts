import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'


describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const userRepository = new inMemoryUsersRepository
    const registerUseCase = new RegisterUseCase(userRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)

  })

  it('should not be able to register with same email twice', async () => {
    const userRepository = new inMemoryUsersRepository
    const registerUseCase = new RegisterUseCase(userRepository)

    const email = 'jhondoe@email.com'

    await registerUseCase.execute({
      name: 'Jhon Doe',
      email,
      password: '123456'
    })


    expect(async () => {
      await registerUseCase.execute({
        name: 'Jhon Doe',
        email,
        password: '123456'
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const userRepository = new inMemoryUsersRepository
    const registerUseCase = new RegisterUseCase(userRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456'
    })
    expect(user.id).toEqual(expect.any(String))

  })
})
