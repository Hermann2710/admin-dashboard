import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import UserRoute from "./routes/user-route"
import Dashboard from "./pages/dashboard"
import Profile from "./pages/profile"
import ProtectedRoute from "./routes/protected-route"
import AdminRoute from "./routes/admin-route"
import UsersManagement from "./pages/users-management"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='*' element={<Login />} />
        </Route>

        <Route element={<UserRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminRoute />}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/users' element={<UsersManagement />} />
          <Route path='/admin/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
