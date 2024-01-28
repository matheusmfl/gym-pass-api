import { prisma } from "@/lib/prisma"
import { FastifyReply, FastifyRequest } from "fastify"
import { hash } from 'bcryptjs'
import { z } from "zod"

export async function register(req: FastifyRequest, res: FastifyReply) {

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })



  const { name, email, password } = registerBodySchema.parse(req.body)

  const password_hash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash
    }
  })

  return res.status(201).send()

} 