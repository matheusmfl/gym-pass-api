import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { GetUserProfileUseCase } from "../getUserProfile"

export function makeGetUserProfileUseCase() {
  const userRepository = new PrismaUserRepository()
  const useCase = new GetUserProfileUseCase(userRepository)

  return useCase

}