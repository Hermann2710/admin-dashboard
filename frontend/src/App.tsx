import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import PrivateRoute from "./routes/private-route"
import Dashboard from "./pages/dashboard"
import Profile from "./pages/profile"
import ProtectedRoute from "./routes/protected-route"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='*' element={<Login />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
