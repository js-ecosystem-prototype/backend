import { Router, Request } from "express";
import memberController from "./memberController.js";
const router = Router();  


router.get("/api/v1/members", memberController.getAllMembers);
router.get("/api/v1/members/:id", memberController.getMemberById);

export default router;
