import { Gym, Prisma, User } from "@prisma/client";

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
}