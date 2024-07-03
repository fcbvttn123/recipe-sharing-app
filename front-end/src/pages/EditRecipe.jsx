import { Button, TextField } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useRecipeContext } from "../hooks/useRecipeContext"
import { handleFormChange } from "../hooks/handleFormChange"

export function EditRecipe() {
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState(null)
  const [recipeImage, setRecipeImage] = useState(null)
  const { id } = useParams()
  const { recipes } = useRecipeContext()
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
    console.log(formData)
    // const formDataObj = new FormData()
    // formDataObj.append("title", formData.title)
    // formDataObj.append("ingredients", formData.ingredients)
    // formDataObj.append("instruction", formData.instruction)
    // formDataObj.append("email", user.email)
    // formDataObj.append("image", recipeImage)
    // async function startEditing(formDataObjParameter) {
    //   try {
    //     let res = await fetch("/api/recipe", {
    //       method: "POST",
    //       body: formDataObjParameter,
    //       headers: {
    //         Authorization: `Bearer ${user.token}`,
    //       },
    //     })
    //     let json = await res.json()
    //     if (!res.ok) {
    //       setError(json.error)
    //       setIsLoading(false)
    //     }
    //     if (res.ok) {
    //       dispatch({ type: RECIPE_ACTIONS.POST_RECIPE, payload: json })
    //       setIsLoading(false)
    //     }
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }
    // startEditing(formData)
  }
  useEffect(() => {
    if (recipes) {
      setFormData(recipes.find((e) => e._id == id))
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
          <img src={`./images/${formData.image}`} alt="Food" srcset="" />
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
