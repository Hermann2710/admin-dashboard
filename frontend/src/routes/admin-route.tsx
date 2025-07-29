import { useAuthContext } from "../contexts/auth-context-helpers"
import { Navigate, Outlet } from "react-router-dom"
import SidebarLayout from "../components/sidebar-layout"

export default function AdminRoute() {
  const { user } = useAuthContext()

  if (!user) {
    return <Navigate to='/login' />
  }

  if (user.role !== "admin") {
    return <Navigate to='/dashboard' />
  }

  return (
    <SidebarLayout
      title='Administration'
      links={[
        { label: "Dashboard", path: "dashboard" },
        { label: "Utilisateurs", path: "users" },
        { label: "Profil", path: "profile" },
      ]}
    >
      <Outlet />
    </SidebarLayout>
  )
}
