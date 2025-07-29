import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT8SECRET || "secret123"

interface AuthPayload {
  id: string
  role: "user" | "admin"
}

export const requiredAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Non authorisé, token manquant .",
    })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      message: "Token invalide ou expiré !",
    })
  }
}

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès refué. Admin Uniquement !" })
  }
  next()
}
