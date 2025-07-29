import { useEffect, useState } from "react"
import { getErrorMessage } from "../utils"
import axios from "../api/axios"
import toast from "react-hot-toast"
import Button from "../components/button"
import { useAuthContext } from "../contexts/auth-context-helpers"

type User = {
  _id: string
  name: string
  email: string
  role: "admin" | "user"
}

export default function UsersManagement() {
  const { user } = useAuthContext()
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users")
        setUsers(res.data)
      } catch (error) {
        setError(getErrorMessage(error))
      }
    }

    fetchUsers()
  }, [])

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Confirmer la suppression de cet utilisateur ?"
    )
    if (!confirm) return

    try {
      toast.loading("Suppression de l'utilisateur en cours", {
        id: "dashboard",
      })
      await axios.delete(`/users/${id}`)

      toast.success("Suppression de l'utilisateur terminée", {
        id: "dashboard",
      })
      setUsers((prev) => prev.filter((user) => user._id !== id))
    } catch (error) {
      setError(getErrorMessage(error))
    }
  }

  const handleToggleRole = async (userToUpdate: User) => {
    const newRole = userToUpdate.role === "admin" ? "user" : "admin"

    try {
      toast.loading("Mise à jour du role en cours...", { id: "dashboard" })
      const res = await axios.patch(`/users/${userToUpdate._id}/role`, {
        role: newRole,
      })

      toast.success("Mise à jour du role terminée", { id: "dashboard" })
      setUsers((prev) =>
        prev.map((u) => (u._id === res.data.user._id ? res.data.user : u))
      )
    } catch (error) {
      setError(getErrorMessage(error))
    }
  }

  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800'>
        Gestion des utilisateurs
      </h1>

      {error && (
        <p className='text-red-600 bg-red-100 p-2 mb-4 rounded'>{error}</p>
      )}

      <table className='min-w-full bg-white shadow-sm border rounded'>
        <thead className='bg-gray-50 text-left'>
          <tr>
            <th className='py-3 px-4 border'>Identifiant</th>
            <th className='py-3 px-4 border'>Nom</th>
            <th className='py-3 px-4 border'>Email</th>
            <th className='py-3 px-4 border'>Rôle</th>
            <th className='py-3 px-4 border text-right'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className='hover:bg-gray-50'>
              <td className='py-2 px-4 border'>{u._id}</td>
              <td className='py-2 px-4 border'>{u.name}</td>
              <td className='py-2 px-4 border'>{u.email}</td>
              <td className='py-2 px-4 border'>{u.role}</td>
              <td className='py-2 px-4 border text-right space-x-2'>
                <button
                  onClick={() => handleDelete(u._id)}
                  className='text-red-600 hover:underline disabled:hover:no-underline disabled:text-gray-600'
                  disabled={u._id === user!.id}
                >
                  Supprimer
                </button>
                <Button
                  onClick={() => handleToggleRole(u)}
                  className='bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:cursor-not-allowed 
                      disabled:bg-gray-100 disabled:text-gray-700 disabled:hover:bg-gray-200'
                  disabled={user!.id === u._id}
                >
                  Rendre {u.role === "admin" ? "user" : "admin"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
