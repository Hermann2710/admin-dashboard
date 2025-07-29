import { Router } from "express"
import { getAllUsers, getMe } from "../controllers/user-controller"
import { requireAdmin, requiredAuth } from "../middlewares/auth-middleware"

const router = Router()

router.get("/me", requiredAuth, getMe)
router.get("/", requiredAuth, requireAdmin, getAllUsers)

export default router
