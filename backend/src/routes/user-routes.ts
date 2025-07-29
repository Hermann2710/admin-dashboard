import { Router } from "express"
import { getMe } from "../controllers/user-controller"
import { requiredAuth } from "../middlewares/auth-middleware"

const router = Router()

router.get("/me", requiredAuth, getMe)

export default router
