import { prisma } from "@/lib/prisma"
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface registerUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {

  constructor(
    private userRepository: UsersRepository
  ) {

  }


  async execute({ name, email, password }: registerUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)


    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }



    await this.userRepository.create({
      name,
      email,
      password_hash
    })


  }
}

