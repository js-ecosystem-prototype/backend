import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "./config/db.js";
import memberRoutes from "./modules/Members/memberRoutes.ts"
dotenv.config();

const app = express();

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
