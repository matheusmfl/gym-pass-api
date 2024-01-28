import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { RegisterUseCase } from "@/use-cases/register"
import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"

export async function register(req: FastifyRequest, res: FastifyReply) {

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })



  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const userRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    await registerUseCase.execute({
      name, email, password
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      res.status(409).send({ message: err.message })
    }
    throw err
  }

  return res.status(201).send()

} 