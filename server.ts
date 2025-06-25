import express from 'express'
import dotenv from 'dotenv'
import prisma from './config/db.js'
import userRouter from './routes/userRouter.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

prisma.$connect().then(() => {
  console.log('✅ Kết nối database thành công!')
}).catch((error: unknown) => {
  console.error('❌ Kết nối database thất bại:', error)
})

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on http://localhost:${PORT}.......`)
})
