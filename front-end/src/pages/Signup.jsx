import { Button, TextField, Typography } from "@material-ui/core"
import { useState } from "react"
import { Link } from "react-router-dom"
import { handleFormChange } from "../hooks/handleFormChange"

export function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  function handleFormSubmit(e) {
    e.preventDefault()
    async function startSignup() {
      setIsLoading(true)
      try {
        let res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
        let json = await res.json()
        if (!res.ok) {
          setIsLoading(false)
          setError(json.error)
        }
        if (res.ok) {
          // save the user to local storage
          localStorage.setItem(
            "RECIPE-SHARING-APP-USER-TOKEN",
            JSON.stringify(json.token)
          )
          // update the auth context
          // update loading state
          setIsLoading(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
    startSignup()
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Sign Up Text */}
      <Typography variant="h3" color="primary" gutterBottom>
        Sign Up
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
          onChange={(e) => handleFormChange(e, setFormData)}
          value={formData.email}
          name="email"
        />
        <TextField
          id="filled-basic password"
          label="Password"
          variant="filled"
          type="password"
          onChange={(e) => handleFormChange(e, setFormData)}
          value={formData.password}
          name="password"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="w-full"
        >
          Sign up
        </Button>
      </form>
      {/* Form Error Text */}
      {error && <p className="text-red-600">{error}</p>}
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
