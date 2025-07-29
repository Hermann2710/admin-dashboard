import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import PrivateRoute from "./routes/private-route"
import Dashboard from "./pages/dashboard"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        <Route path='*' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
