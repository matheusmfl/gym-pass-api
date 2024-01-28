import { prisma } from "@/lib/prisma"
import { PrismaUserRepository } from "@/repositories/prisma-users-repository"
import { hash } from "bcryptjs"

interface registerUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({ name, email, password }: registerUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: { email: email }
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists')
  }

  const prismaUserRepository = new PrismaUserRepository()

  await prismaUserRepository.create({
    name,
    email,
    password_hash
  })


}