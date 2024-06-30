import { createContext, useEffect, useReducer } from "react"
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
  useEffect(() => {
    let userFromLocalStorage = JSON.parse(
      localStorage.getItem("RECIPE-SHARING-APP-USER-TOKEN")
    )
    userFromLocalStorage &&
      dispatch({ type: AUTH_ACTIONS.LOGIN, payload: userFromLocalStorage })
  }, [])
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
