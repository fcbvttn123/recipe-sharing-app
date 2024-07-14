import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

export function Chat() {
  const { user } = useAuthContext()
  useEffect(() => {
    async function getAllEmails(token) {
      let res = await fetch("/api/auth/getAllEmails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      let json = await res.json()
      console.log(json)
    }
    user?.token && getAllEmails(user.token)
  }, [])
  return (
    <div>
      <p>chat</p>
    </div>
  )
}
