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
