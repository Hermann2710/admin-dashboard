import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../contexts/auth-context-helpers"

export default function PrivateRoute() {
  const { token } = useAuthContext()
  return token ? <Outlet /> : <Navigate to='/login' />
}
