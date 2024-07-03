import { Button, TextField } from "@material-ui/core"
import { useState } from "react"

export function EditRecipe() {
  const [error, setError] = useState(null)
  return (
    <div>
      <form
        onSubmit={(e) => console.log("Form Submitted")}
        className="flex flex-col items-center gap-y-5 mb-3 max-w-96"
      >
        <TextField
          id="outlined-basic title"
          label="Title"
          variant="outlined"
          name="title"
          className="w-full"
          // onChange={(e) => handleFormChange(e, setFormData)}
          // value={formData.title}
        />
        <TextField
          id="filled-textarea ingredients"
          label="Ingredients"
          placeholder="Enter your ingredients..."
          multiline
          variant="outlined"
          name="ingredients"
          className="w-full"
          // onChange={(e) => handleFormChange(e, setFormData)}
          // value={formData.ingredients}
        />
        <TextField
          id="filled-textarea instruction"
          label="Instruction"
          placeholder="Instruction..."
          multiline
          variant="outlined"
          name="instruction"
          className="w-full"
          // onChange={(e) => handleFormChange(e, setFormData)}
          // value={formData.instruction}
        />
        <div className="w-full">
          <p>Add Image: </p>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            // onChange={(e) => setRecipeImage(e.target.files[0])}
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
    </div>
  )
}
