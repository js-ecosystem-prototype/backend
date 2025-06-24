import express from 'express'
import dotenv from 'dotenv'
import prisma from './config/db.js'
import userRouter from './routes/userRouter.js'

dotenv.config()
const app = express()

app.use(express.json())

prisma.$connect().then(() => {
  console.log('✅ Kết nối database thành công!')
}).catch((error:unknown) => {
  console.error('❌ Kết nối database thất bại:', error)
})

app.use('/users', userRouter)

app.listen(3000, () => {
  console.log('🚀 Server is listening on http://localhost:3000')
})
