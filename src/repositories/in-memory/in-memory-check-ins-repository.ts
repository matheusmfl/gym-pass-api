import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import dayjs from "dayjs";

export class inMemoryCheckInRepository implements CheckInsRepository {


  public items: CheckIn[] = []


  async findManyByUserId(userId: string, page: number): Promise<{ id: string; created_at: Date; validated_at: Date | null; user_id: string; gym_id: string; }[]> {
    return this.items.filter((item) => item.user_id === userId).slice((page - 1) * 20, page * 20)
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find((checkIn) => {

      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

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