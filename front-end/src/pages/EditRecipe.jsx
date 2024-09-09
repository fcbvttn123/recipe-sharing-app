import { Button, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useRecipeContext } from "../hooks/useRecipeContext"
import { handleFormChange } from "../hooks/handleFormChange"
import { useAuthContext } from "../hooks/useAuthContext"
import { RECIPE_ACTIONS } from "../main"

export function EditRecipe() {
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState(null)
  const [recipeImage, setRecipeImage] = useState(null)
  const { id } = useParams()
  const { recipes, dispatch } = useRecipeContext()
  const { user } = useAuthContext()
  const navigate = useNavigate()
  function handleFormSubmit(e) {
    e.preventDefault()
    if (!formData.title || !formData.ingredients || !formData.instruction) {
      setError("All fields must be filled")
      throw new Error("All fields must be filled")
    }
    const formDataObj = new FormData()
    formDataObj.append("title", formData.title)
    formDataObj.append("ingredients", formData.ingredients)
    formDataObj.append("instruction", formData.instruction)
    formDataObj.append("image", recipeImage)
    async function startEditing(formDataObjParameter) {
      try {
        let res = await fetch(
          `${import.meta.env.VITE__BASE_URL}/api/recipe/${id}`,
          {
            method: "PATCH",
            body: formDataObjParameter,
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        let json = await res.json()
        if (!res.ok) {
          console.log(json)
        }
        if (res.ok) {
          dispatch({ type: RECIPE_ACTIONS.PATCH_RECIPE, payload: json })
          navigate("/")
        }
      } catch (error) {
        console.error(error)
      }
    }
    startEditing(formDataObj)
  }
  useEffect(() => {
    if (recipes) {
      setFormData(recipes.find((e) => e?._id && e._id == id))
    }
  }, [recipes])
  return (
    <div>
      {formData ? (
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center gap-y-5 mb-3 max-w-96"
        >
          <TextField
            id="outlined-basic title"
            label="Title"
            variant="outlined"
            name="title"
            className="w-full"
            value={formData.title}
            onChange={(e) => handleFormChange(e, setFormData)}
          />
          <TextField
            id="filled-textarea ingredients"
            label="Ingredients"
            placeholder="Enter your ingredients..."
            multiline
            rows={10}
            variant="outlined"
            name="ingredients"
            className="w-full"
            value={formData.ingredients}
            onChange={(e) => handleFormChange(e, setFormData)}
          />
          <TextField
            id="filled-textarea instruction"
            label="Instruction"
            placeholder="Instruction..."
            multiline
            rows={10}
            variant="outlined"
            name="instruction"
            className="w-full"
            value={formData.instruction}
            onChange={(e) => handleFormChange(e, setFormData)}
          />
          <img
            src={`/images/${formData.image}`}
            alt="Food"
            srcset={`/images/${formData.image}`}
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
        <p>This recipe is not available right now!</p>
      )}
    </div>
  )
}
