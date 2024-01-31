import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "@/use-cases/authenticate"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"

export async function authenticate(req: FastifyRequest, res: FastifyReply) {

  const authenticateBodySchema = z.object({

    email: z.string().email(),
    password: z.string().min(6)
  })



  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const userRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)

    await authenticateUseCase.execute({
      email, password
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      res.status(400).send({ message: err.message })
    }
    throw err
  }

  return res.status(200).send()

} 