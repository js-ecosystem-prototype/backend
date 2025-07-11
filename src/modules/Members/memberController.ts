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

const getMemberById = async (req: Request, res: Response): Promise<any> => {
  try {
    const memberId = req.params.id;
    const member = await prisma.member.findUnique({
      where: {
        id: memberId,
      }
    });

    if (!member) {
      return res.status(404).json({ message: "Not found this id of member in database"})
    }
    
    return res.status(200).json(member)
  } catch (err) {
      return res.status(500).json({ error: (err as Error).message });
  }
} 


export default {
  getAllMembers,
  getMemberById
};


