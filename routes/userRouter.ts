// routes/userRouter.ts
import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  softDeleteUser,
  restoreUser,
  updateUserRole,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", softDeleteUser);
router.patch("/:id/role", updateUserRole);
router.patch('/:id/restore', restoreUser);


export default router;
