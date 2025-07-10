import { Router, Request } from "express";
import memberController from "./memberController.js";
const router = Router();  


router.get("/api/v1/members", memberController.getAllMembers);


export default router;
