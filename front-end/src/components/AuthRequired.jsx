import { Outlet, Navigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

export default function AuthRequired() {
  const { user, loading } = useAuthContext()
  if (loading) {
    return <div>Loading user information...</div>
  }
  const authenticated = user?.token
  if (!authenticated) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
