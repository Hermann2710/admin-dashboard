import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user"

const JWT_SECRET = process.env.JWT_SECRET || "secret123"

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  try {
    const existing = await User.findOne({ email })
    if (existing)
      return res.status(400).json({ message: "Email déjà utilisé !" })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    })

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    })

    res.status(201).json({
      message: "Utilisateur inscrit avec succès .",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur .",
      error: (error as any).message,
    })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({ message: "Utilisateur introuvable !" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({
        message: "Identifiants invalides !",
      })

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    })

    res.json({
      message: "Connexion réussie .",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur .",
      error: (error as any).message,
    })
  }
}
