import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { Gym, User } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms-repository"

interface createGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface createGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {

  constructor(
    private gymsRepository: GymsRepository
  ) {

  }


  async execute({ description, latitude, longitude, phone, title }: createGymUseCaseRequest): Promise<createGymUseCaseResponse> {

    const gym = await this.gymsRepository.create({ description, latitude, longitude, phone, title })

    return { gym }
  }
}

