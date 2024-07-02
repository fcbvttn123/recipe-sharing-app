import { createContext, useEffect, useReducer } from "react"
import { AUTH_ACTIONS } from "../main"

export const AuthContext = createContext()

export function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return {
        user: action.payload,
        loading: false,
      }
    case AUTH_ACTIONS.LOGOUT:
      return {
        user: null,
        loading: false,
      }
    case AUTH_ACTIONS.SET_LOADING:
      return {
        user: null,
        loading: false,
      }
    default:
      return state
  }
}

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
  })
  useEffect(() => {
    let userFromLocalStorage = JSON.parse(
      localStorage.getItem("RECIPE-SHARING-APP-USER-TOKEN")
    )
    if (userFromLocalStorage) {
      userFromLocalStorage &&
        dispatch({ type: AUTH_ACTIONS.LOGIN, payload: userFromLocalStorage })
    } else {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING })
    }
  }, [])
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
