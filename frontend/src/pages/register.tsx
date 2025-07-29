import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../contexts/auth-context-helpers"
import { FormEvent, useState } from "react"
import { getErrorMessage } from "../utils"
import axios from "../api/axios"

export default function Register() {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const { login } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await axios.post("/auth/register", { name, email, password })
      const { token, user } = res.data

      login(token, user)
      navigate("/dashboard")
    } catch (error) {
      setError(getErrorMessage(error))
    }
  }

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100 px-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded shadow-md w-full max-w-sm'
      >
        <h2 className='text-2xl font-bold mb-6 text-center'>Inscription</h2>

        {error && (
          <p className='bg-red-100 text-red-700 px-3 py-2 text-sm rounded mb-4'>
            {error}
          </p>
        )}

        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Nom d'utilisateur
          </label>
          <input
            type='name'
            name='name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='mt-1 block w-full border px-3 py-2 rounded'
            placeholder='johndoe'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-1 block w-full border px-3 py-2 rounded'
            placeholder='johndoe@gmail.com'
            required
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Mot de passe
          </label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mt-1 block w-full border px-3 py-2 rounded'
            placeholder='Mot de passe'
            required
          />
        </div>

        <button type='submit' className='w-full btn'>
          S'inscrire
        </button>

        <p className='mt-4 text-sm text-center'>
          Déjà inscrit?{" "}
          <Link to='/login' className='link'>
            Connectez vous!
          </Link>
        </p>
      </form>
    </div>
  )
}
