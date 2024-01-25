import { Router } from "express";
import { login, profile, refresh, register } from "../controllers/auth.controller.js";
import { verifyJwt } from "../middlewares/protected.middleware.js";

const router = Router()

router.post("/register" , register)
router.post("/login" , login)
router.post("/refresh" , refresh)
router.post("/profile" , verifyJwt,profile)

export default router