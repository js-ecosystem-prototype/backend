import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { console } from "node:inspector/promises";

const prisma = new PrismaClient();

const getAllMembers = async (req: Request, res: Response): Promise<any> => {
  try {
    const members = await prisma.member.findMany({
      include: {
        major: true 
      }
    });
    return res.status(200).json(members);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });   
  }
};


export default {
  getAllMembers
};

