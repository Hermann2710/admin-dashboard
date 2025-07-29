import { Request, Response } from "express"
import User from "../models/user"

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password")
    if (!user)
      return res.status(404).json({
        message: "Utilisateur introuvable !",
      })

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur .",
      error: (error as any).message,
    })
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password")
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur .",
      error: (error as any).message,
    })
  }
}

export const updateUserRole = async (req: Request, res: Response) => {
  const userId = req.params.id
  const { role } = req.body

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({
      message: 'Rôle invalide. Doit être "user" ou "admin".',
    })
  }

  try {
    const user = await User.findById(userId)
    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable ." })

    user.role = role
    await user.save()

    res.status(200).json({
      message: `Role mis à jour en ${role}`,
      user: { id: user._id, role: user.role },
    })
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur .",
      error: (error as any).message,
    })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id

  try {
    const user = await User.findByIdAndDelete(userId)
    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable." })
    res.status(200).json({ message: "Utilisateur supprimé avec succès !" })
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur .",
      error: (error as any).message,
    })
  }
}
