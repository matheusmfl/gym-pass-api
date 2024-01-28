import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { registerUseCase } from "@/use-cases/register"

export async function register(req: FastifyRequest, res: FastifyReply) {

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })



  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    await registerUseCase({
      name, email, password
    })
  } catch (error) {
    return res.status(409).send()
  }

  return res.status(201).send()

} 