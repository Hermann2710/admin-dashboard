import { Router } from "express"
import {
  deleteUser,
  getAllUsers,
  getMe,
  updateUserRole,
} from "../controllers/user-controller"
import { requireAdmin, requiredAuth } from "../middlewares/auth-middleware"

const router = Router()

router.get("/me", requiredAuth, getMe)
router.get("/", requiredAuth, requireAdmin, getAllUsers)
router.patch("/:id/role", requiredAuth, requireAdmin, updateUserRole)
router.delete("/:id", requiredAuth, requireAdmin, deleteUser)

export default router
