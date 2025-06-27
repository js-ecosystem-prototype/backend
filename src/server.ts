import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import prisma from './config/db.js'
dotenv.config()

const app = express()
app.use(express.json())

prisma.$connect()
  .then(() => {
    console.log('Connected with database')
  })
  .catch((err: any) => {
    console.error('Cannot connected with database:', err)
  })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)

  
})
