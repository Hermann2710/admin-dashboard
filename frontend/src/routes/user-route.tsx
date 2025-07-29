import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../contexts/auth-context-helpers"
import SidebarLayout from "../components/sidebar-layout"

export default function UserRoute() {
  const { user } = useAuthContext()
  if (!user) {
    return <Navigate to='/login' />
  }

  if (user.role !== "user") {
    return <Navigate to='/admin/dashboard' />
  }

  return (
    <SidebarLayout
      title='Utilisateur'
      links={[
        { label: "Dashboard", path: "dashboard" },
        { label: "Profil", path: "profile" },
      ]}
    >
      <Outlet />
    </SidebarLayout>
  )
}
