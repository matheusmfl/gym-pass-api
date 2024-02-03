import { Gym, Prisma } from "@prisma/client";

import { GymsRepository } from "../gyms-repository";

export class inMemoryGymsRepository implements GymsRepository {


  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput): Promise<{ id: string; title: string; description: string | null; phone: string | null; latitude: Prisma.Decimal; longitude: Prisma.Decimal; }> {
    const gym = {
      description: data.description ?? 'description',
      id: data.id ?? 'gym-01',
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      phone: data.phone ?? 'Olá',
      title: data.title
    }

    this.items.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.items.find(item => item.id === id)
    if (!gym) {
      return null
    }
    return gym
  }
}