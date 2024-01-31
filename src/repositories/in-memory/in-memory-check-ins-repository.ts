import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";

export class inMemoryCheckInRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<{ id: string; created_at: Date; validated_at: Date | null; user_id: string; gym_id: string; }> {
    const checkIn = {
      id: data.id || 'user-1',
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null
    }

    this.items.push(checkIn);

    return checkIn
  }


}