import { Button, Snackbar, TextField } from "@mui/material"
import Alert from "@mui/material/Alert"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"
import { handleFormChange } from "../hooks/handleFormChange"
import { useRecipeContext } from "../hooks/useRecipeContext"
import { RECIPE_ACTIONS } from "../main"

export function PostRecipe() {
  // States
  const { user } = useAuthContext()
  const { dispatch } = useRecipeContext()
  const [recipeImage, setRecipeImage] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instruction: "",
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  // Functions
  function handleFormSubmit(e) {
    e.preventDefault()
    if (
      !recipeImage ||
      !formData.title ||
      !formData.ingredients ||
      !formData.instruction
    ) {
      setError("All fields must be filled")
      throw new Error("All fields must be filled")
    }
    const formDataObj = new FormData()
    formDataObj.append("title", formData.title)
    formDataObj.append("ingredients", formData.ingredients)
    formDataObj.append("instruction", formData.instruction)
    formDataObj.append("email", user.email)
    formDataObj.append("image", recipeImage)
    async function startPosting(formDataObjParameter) {
      setIsLoading(true)
      try {
        let res = await fetch(`${import.meta.env.VITE__BASE_URL}/api/recipe`, {
          method: "POST",
          body: formDataObjParameter,
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        let json = await res.json()
        if (!res.ok) {
          setError(json.error)
          setIsLoading(false)
        }
        if (res.ok) {
          dispatch({ type: RECIPE_ACTIONS.POST_RECIPE, payload: json })
          setIsLoading(false)
          setOpenSnackbar(true)
          setFormData({
            title: "",
            ingredients: "",
            instruction: "",
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
    startPosting(formDataObj)
  }
  // UI
  return (
    <>
      {user?.token ? (
        // If user is logged in, show the form
        <form
          onSubmit={(e) => handleFormSubmit(e, setFormData)}
          className="flex flex-col items-center gap-y-5 mb-3 max-w-96"
        >
          <TextField
            id="outlined-basic title"
            label="Title"
            variant="outlined"
            name="title"
            className="w-full"
            onChange={(e) => handleFormChange(e, setFormData)}
            value={formData.title}
          />
          <TextField
            id="filled-textarea ingredients"
            label="Ingredients"
            placeholder="Enter your ingredients..."
            multiline
            variant="outlined"
            name="ingredients"
            className="w-full"
            onChange={(e) => handleFormChange(e, setFormData)}
            value={formData.ingredients}
          />
          <TextField
            id="filled-textarea instruction"
            label="Instruction"
            placeholder="Instruction..."
            multiline
            variant="outlined"
            name="instruction"
            className="w-full"
            onChange={(e) => handleFormChange(e, setFormData)}
            value={formData.instruction}
          />
          <div className="w-full">
            <p>Add Image: </p>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={(e) => setRecipeImage(e.target.files[0])}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      ) : (
        // If user is not logged in, show this text
        <div>
          <h1>Please login to post your own recipe!</h1>
        </div>
      )}

      {/* Snackbar: notification of form submission */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={(e) => setOpenSnackbar(false)}
      >
        <Alert onClose={(e) => setOpenSnackbar(false)} severity="success">
          Form Submitted!
        </Alert>
      </Snackbar>
    </>
  )
}
