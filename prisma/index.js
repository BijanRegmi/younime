import { PrismaClient } from "@prisma/client"

const db = global.db || new PrismaClient({ log: ["query"] })

if (process.env.NODE_ENV !== "production") global.db = db

export default db
