import { createContext, useReducer } from "react"
import { AUTH_ACTIONS } from "../main"

export const AuthContext = createContext()

export function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return {
        user: action.payload,
      }
    case AUTH_ACTIONS.LOGOUT:
      return {
        user: null,
      }
    default:
      return state
  }
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  })
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
