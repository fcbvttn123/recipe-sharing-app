import { Button, TextField } from "@material-ui/core"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"
import { handleFormChange } from "../hooks/handleFormChange"
import { useRecipeContext } from "../hooks/useRecipeContext"
import { RECIPE_ACTIONS } from "../main"

export function PostRecipe() {
  const { user } = useAuthContext()
  const { dispatch } = useRecipeContext()
  const [recipeImage, setRecipeImage] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instruction: "",
  })
  function handleFormSubmit(e) {
    e.preventDefault()
    const formDataObj = new FormData()
    formDataObj.append("title", formData.title)
    formDataObj.append("ingredients", formData.ingredients)
    formDataObj.append("instruction", formData.instruction)
    formDataObj.append("email", user.email)
    formDataObj.append("image", recipeImage)
    async function startPosting(formDataObjParameter) {
      let res = await fetch("/api/recipe", {
        method: "POST",
        body: formDataObjParameter,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      let json = await res.json()
      dispatch({ type: RECIPE_ACTIONS.POST_RECIPE, payload: json })
    }
    startPosting(formDataObj)
  }
  // title, ingredients, instruction, email
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
        </form>
      ) : (
        // If user is not logged in, show this text
        <div>
          <h1>Please login to post your own recipe!</h1>
        </div>
      )}
    </>
  )
}
