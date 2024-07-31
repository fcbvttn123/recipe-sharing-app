import { SearchField } from "../SearchField"
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import "stream-chat-react/dist/css/index.css"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect, useState } from "react"

export function CustomListContainer({ children }) {
  const { user } = useAuthContext()
  const [allEmails, setAllEmails] = useState(null)
  function handleSearchClick(e) {
    const email = e.target.textContent
    async function createChannel(email, token) {
      let res = await fetch("/api/chat/createMessagingChannel", {
        method: "POST",
        body: JSON.stringify({ anotherUserEmail: email }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      let json = await res.json()
    }
    createChannel(email, user.token)
  }
  useEffect(() => {
    async function getAllEmails(token) {
      let res = await fetch("/api/auth/getAllEmails", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      let json = await res.json()
      setAllEmails(json)
    }
    user && getAllEmails(user.token)
  }, [user])
  return (
    <div className="w-72 flex flex-col gap-4 m-3 h-full relative">
      <SearchField
        placeholder="Email..."
        data={allEmails}
        handleClick={handleSearchClick}
      />
      {children}
      <Link to=".." relative="path" className="absolute bottom-2 w-full">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="w-full mb-4"
        >
          Back
        </Button>
      </Link>
    </div>
  )
}
