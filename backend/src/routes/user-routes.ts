import { Router } from "express"
import {
  getAllUsers,
  getMe,
  updateUserRole,
} from "../controllers/user-controller"
import { requireAdmin, requiredAuth } from "../middlewares/auth-middleware"

const router = Router()

router.get("/me", requiredAuth, getMe)
router.get("/", requiredAuth, requireAdmin, getAllUsers)
router.patch("/:id/role", requiredAuth, requireAdmin, updateUserRole)

export default router
