import { Prisma } from "@prisma/client"

export class InMemoryUserRepository {
  public users = []

  async create(data: Prisma.UserCreateInput) {

  }
}