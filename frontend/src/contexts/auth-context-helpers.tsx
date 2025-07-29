import { createContext, useContext } from "react"

export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error(
      "Le useAuthContext doit être utilisé dans un AuthContextProvider"
    )
  return context
}
