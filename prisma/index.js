import { PrismaClient } from "@prisma/client"

const db = global.db || new PrismaClient()

if (process.env.NODE_ENV !== "production") global.db = db

export default db
