import { expect, test, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'


describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const prismaUserRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(prismaUserRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@email.com',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)

  })
})
