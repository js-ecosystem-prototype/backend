import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { rateLimit } from 'express-rate-limit'
import prisma from "./config/db.js";
import memberRoutes from "./modules/Members/memberRoutes.ts";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

prisma.$connect()
  .then(() => {
    console.log("Connected with database");
  })
  .catch((err: any) => {
    console.error("Cannot connect with database:", err);
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})


app.use("/", memberRoutes)

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per window
});

app.use(limiter);