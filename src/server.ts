import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import prisma from './config/db.js'
dotenv.config()

const app = express()
app.use(express.json())

// Test kết nối DB khi app chạy
prisma.$connect()
  .then(() => {
    console.log('✅ Kết nối database thành công!')
  })
  .catch((err: any) => {
    console.error('❌ Kết nối database thất bại:', err)
  })

app.get('/', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()
    res.json({ message: '✅ Server is running', users })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on http://localhost:${PORT}`)
})
