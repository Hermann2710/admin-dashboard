import { ReactNode, useState } from "react"
import { useAuthContext } from "../contexts/auth-context-helpers"
import { NavLink, useNavigate } from "react-router-dom"

type Props = {
  children: ReactNode
  title: string
  links: { label: string; path: string }[]
}

export default function SidebarLayout({ children, title, links }: Props) {
  const { logout, user } = useAuthContext()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }  md:translate-x-0 md:static md:block`}
      >
        <div className='p-6'>
          <h2 className='text-xl font-bold mb-8 text-blue-600 text-center'>
            {title}
          </h2>
          <nav className='space-y-4'>
            {links.map((link, key) => (
              <NavLink
                to={link.path}
                key={key}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "hover:bg-gray-100 text-gray-700 font-semibold"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              className='block w-full text-left py-2 px-4 text-red-600 hover:bg-red-100 rounded'
              onClick={handleLogout}
            >
              Déconnexion
            </button>
          </nav>
        </div>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <header className='flex items-center justify-between bg-white shadow px-4 py-3 md:hidden'>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='text-gray-700 focus:outline-none'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
          <span className='font-semibold text-gray-800'>
            Bienvenue, {user?.name}
          </span>
        </header>

        <main>{children}</main>
      </div>
    </div>
  )
}
