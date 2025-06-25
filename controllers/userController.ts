import { RequestHandler } from 'express'
import prisma from '../config/db.js'

// Lấy danh sách user
export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { deletedAt: null }
    })
    res.status(200).json(users)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Lấy thông tin user theo ID
export const getUserById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    })
    if (!user || user.deletedAt !== null) {
      res.status(404).json({ error: 'User not found!' })
      return
    }
    res.status(200).json(user)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Tạo user mới
export const createUser: RequestHandler = async (req, res) => {
  try {
    const { username, password, fullName, email, phone, role, ban } = req.body

    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        fullName: fullName ?? undefined,
        email: email ?? undefined,
        phone: phone ?? undefined,
        role,
        ban
      }
    })

    res.status(201).json(newUser)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Cập nhật thông tin user
export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data
    })
    res.status(200).json(updatedUser)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Xóa mềm user
export const softDeleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.user.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() }
    })
    res.status(200).json({ message: 'User soft deleted successfully!' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
//khôi phục
export const restoreUser: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const user = await prisma.user.update({
      where: { id },
      data: { deletedAt: null }  
    })
    res.status(200).json({ message: 'Khôi phục user thành công'})
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

// Thay đổi role user
export const updateUserRole: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const { role } = req.body
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { role }
    })
    res.status(200).json(updatedUser)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}