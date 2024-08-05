import { Link } from "react-router-dom"
import { RecipeCard } from "../components/RecipeCard"
import { useRecipeContext } from "../hooks/useRecipeContext"
import { Button } from "@material-ui/core"
import { RECIPE_ACTIONS } from "../main"

export function Home() {
  const { recipes, filteredRecipes, dispatch } = useRecipeContext()
  return (
    <>
      {/* Only show this button if FILTER IS ON */}
      {filteredRecipes && (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={(e) =>
            dispatch({
              type: RECIPE_ACTIONS.GET_FILTERED_RECIPES,
              payload: null,
            })
          }
        >
          Reset
        </Button>
      )}
      <div className="flex flex-wrap justify-center items-center gap-8">
        {/* Render all recipes when FILTER IS OFF */}
        {recipes &&
          !filteredRecipes &&
          recipes.map((e) => (
            <Link to={`/recipeDetails/${e._id}`}>
              <RecipeCard
                key={e._id}
                id={e._id}
                email={e.email}
                title={e.title}
                datePosted={e.createdAt}
                imgName={e.image}
                ingredients={e.ingredients}
                instructions={e.instruction}
                likedBy={e.likedBy}
                likeNumber={e.likedBy.length}
              />
            </Link>
          ))}
        {/* Render filtered recipes when FILTER IS ON */}
        {filteredRecipes &&
          filteredRecipes.map((e) => (
            <Link to={`/recipeDetails/${e._id}`}>
              <RecipeCard
                key={e._id}
                id={e._id}
                email={e.email}
                title={e.title}
                datePosted={e.createdAt}
                imgName={e.image}
                ingredients={e.ingredients}
                instructions={e.instruction}
                likedBy={e.likedBy}
                likeNumber={e.likedBy.length}
              />
            </Link>
          ))}
        {recipes?.length == 0 && <p className="mt-10">No recipes yet</p>}
      </div>
    </>
  )
}
