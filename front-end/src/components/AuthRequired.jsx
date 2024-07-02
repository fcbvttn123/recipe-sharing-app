import { Outlet, Navigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

export default function AuthRequired() {
  const { user } = useAuthContext()
  // const authenticated = user?.token
  const authenticated = localStorage.getItem("RECIPE-SHARING-APP-USER-TOKEN")
  if (!authenticated) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
