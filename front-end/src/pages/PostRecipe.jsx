import { Button, TextField } from "@material-ui/core"
import { useAuthContext } from "../hooks/useAuthContext"

export function PostRecipe() {
  const { user } = useAuthContext()
  function handleFormSubmit(e) {
    e.preventDefault()
    console.log("hi")
  }
  // title, ingredients, instruction, email
  return (
    <>
      {user?.token ? (
        // If user is logged in, show the form
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
          />
          <TextField
            id="filled-textarea ingredients"
            label="Ingredients"
            placeholder="Enter your ingredients..."
            multiline
            variant="outlined"
            className="w-full"
            name="ingredients"
          />
          <TextField
            id="filled-textarea instruction"
            label="Instruction"
            placeholder="Instruction..."
            multiline
            variant="outlined"
            className="w-full"
            name="instruction"
          />
          <div className="w-full">
            <p>Add Image: </p>
            <input type="file" name="image" id="image" />
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
