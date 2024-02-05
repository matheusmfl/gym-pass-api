import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsRequest {
  userId: string

}

interface getUserMetricsResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) { }

  async execute({ userId }: GetUserMetricsRequest): Promise<getUserMetricsResponse> {

    const checkInsCount = await this.checkInsRepository.countByUserId(userId)


    return { checkInsCount }
  }
}