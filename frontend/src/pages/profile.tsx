import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../contexts/auth-context-helpers"

export default function Profile() {
  const { user, logout } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return !user ? (
    <div className='flex justify-center items-center p-10'>
      <div className='w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
    </div>
  ) : (
    <div className='max-w-xl mx-auto mt-16 bg-white shadow-md p-8 rounded'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800'>Mon profil</h1>

      <div className='space-y-4'>
        <div>
          <span className='font-semibold'>Nom :</span>
          <span className='ml-2'>{user.name}</span>
        </div>
        <div>
          <span className='font-semibold'>Email :</span>
          <span className='ml-2'>{user.email}</span>
        </div>
        <div>
          <span className='font-semibold'>Role :</span>
          <span className='ml-2 capitalize'>{user.role}</span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className='w-full bg-red-500 text-white py-2 mt-2 rounded hover:bg-red-600 transition'
      >
        Déconnexion
      </button>
    </div>
  )
}
