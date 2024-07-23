import { Button, TextField, Typography } from "@material-ui/core"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { handleFormChange } from "../hooks/handleFormChange"
import { useAuthContext } from "../hooks/useAuthContext"
import { AUTH_ACTIONS } from "../main"
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../config/firebase"

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user, dispatch } = useAuthContext()
  const navigate = useNavigate()
  function handleFormSubmit(e) {
    e.preventDefault()
    async function startLogin(email, password) {
      setIsLoading(true)
      try {
        let res = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        let json = await res.json()
        if (!res.ok) {
          setError(json.error)
          setIsLoading(false)
        }
        if (res.ok) {
          localStorage.setItem(
            "RECIPE-SHARING-APP-USER-TOKEN",
            JSON.stringify(json)
          )
          dispatch({ type: AUTH_ACTIONS.LOGIN, payload: json })
          setIsLoading(false)
          navigate("/")
        }
      } catch (error) {
        console.log(error)
      }
    }
    startLogin(formData.email, formData.password)
  }
  async function handleGoogleLogin() {
    // Define Functions
    async function startSignup(email, password, displayName) {
      let res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          displayName,
        }),
      })
      let json = await res.json()
      // save the user to local storage
      localStorage.setItem(
        "RECIPE-SHARING-APP-USER-TOKEN",
        JSON.stringify(json)
      )
      // update the auth context
      dispatch({ type: AUTH_ACTIONS.LOGIN, payload: json })
    }
    async function startLogin(email, password) {
      try {
        let res = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        let json = await res.json()
        localStorage.setItem(
          "RECIPE-SHARING-APP-USER-TOKEN",
          JSON.stringify(json)
        )
        dispatch({ type: AUTH_ACTIONS.LOGIN, payload: json })
        navigate("/")
      } catch (error) {
        console.log(error)
      }
    }
    // Start google login to get google email
    let googleLoginRes = await signInWithPopup(auth, provider)
    let googleDisplayName = googleLoginRes.user.displayName
    // Send google email to server to check if the email already existed
    let apiCall = await fetch("/api/auth/checkIfGoogleAccountExists", {
      method: "POST",
      body: JSON.stringify({ email: googleLoginRes.user.email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    let json = await apiCall.json()
    // If the email is not registered, add it to Google_Account table
    if (
      json.message ==
      "this email is added to Google_Account table, start sign-up process for Users table"
    ) {
      let startSignUpRes = await startSignup(
        googleLoginRes.user.email,
        import.meta.env.VITE__GOOGLE_ACCOUNT_PASSWORD,
        googleDisplayName
      )
      navigate("/")
      // If the email is already registered before, start login
    } else if (
      json.message ==
      "this google account is already registered before, start login"
    ) {
      await startLogin(
        googleLoginRes.user.email,
        import.meta.env.VITE__GOOGLE_ACCOUNT_PASSWORD
      )
      // If the email is already registered, display error
    } else if (json.message == "Email already in use!") {
      setError("Email already in use, please enter your password!")
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Login Text */}
      <Typography variant="h3" color="primary" gutterBottom>
        Login
      </Typography>
      {/* Form */}
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center gap-y-5 mb-3"
      >
        <TextField
          id="filled-basic email"
          label="Email"
          variant="filled"
          name="email"
          value={formData.email}
          onChange={(e) => handleFormChange(e, setFormData)}
        />
        <TextField
          id="filled-basic password"
          label="Password"
          variant="filled"
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleFormChange(e, setFormData)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="w-full"
        >
          Login
        </Button>
      </form>
      {/* Google Login Button */}
      <Button
        variant="contained"
        className="w-52"
        onClick={handleGoogleLogin}
        startIcon={
          <img className="w-5 h-5" src="/images/google.png" alt="" srcset="" />
        }
      >
        Google Login
      </Button>
      {/* Form Error Text */}
      {error && <p className="text-red-600 mt-7">{error}</p>}
      {/* Back Button */}
      <div className="absolute left-5 top-5">
        <Link to={".."} relative="path">
          <Button variant="contained" color="primary">
            Back
          </Button>
        </Link>
      </div>
    </div>
  )
}
