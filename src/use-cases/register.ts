import { prisma } from "@/lib/prisma"
import { PrismaUserRepository } from "@/repositories/prisma-users-repository"
import { hash } from "bcryptjs"

interface registerUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {

  constructor(
    private userRepository: any
  ) {

  }


  async execute({ name, email, password }: registerUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: { email: email }
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already exists')
    }



    await this.userRepository.create({
      name,
      email,
      password_hash
    })


  }
}

