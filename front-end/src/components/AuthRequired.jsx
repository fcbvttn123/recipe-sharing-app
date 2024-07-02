import { Outlet, Navigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

export default function AuthRequired() {
  const { user } = useAuthContext()
  const authenticated = user?.token
  if (!authenticated) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
