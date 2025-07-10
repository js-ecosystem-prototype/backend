import { Router, Request } from "express";
import memberController from "./memberController.js";
const router = Router();  


router.get("/", memberController.getAllMembers);


export default router;
