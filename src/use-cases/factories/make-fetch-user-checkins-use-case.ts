import { FetchUsersCheckInHistoryUseCase } from "../fetch-member-check-ins-history"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository"

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUsersCheckInHistoryUseCase(checkInsRepository)

  return useCase

}