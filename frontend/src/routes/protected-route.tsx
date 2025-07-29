import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../contexts/auth-context-helpers"

export default function ProtectedRoute() {
  const { token } = useAuthContext()
  return !token ? <Outlet /> : <Navigate to='/profile' />
}
