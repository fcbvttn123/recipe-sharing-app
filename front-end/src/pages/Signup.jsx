import { Button, TextField, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

export function Signup() {
  function handleFormSubmit(e) {
    e.preventDefault()
    console.log("Sign up")
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
        <TextField id="filled-basic" label="Email" variant="filled" />
        <TextField id="filled-basic" label="Password" variant="filled" />
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
      <p className="text-red-600">Form Error</p>
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
