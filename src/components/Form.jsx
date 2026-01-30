import React from "react"
import '../styles/form.css'
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientList"
// import { getRecipeFromMistral } from "../ai"
import  { getRecipeFromMistral } from '../Api/getRecipe'
import { Loading } from "./Loading"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipeShown, setRecipeShown] = React.useState("")
    const [loadingAnimation, setLoadingAnimation] = React.useState(false)
    const recipeSection = React.useRef(null)
    console.log(recipeSection)
    
    React.useEffect(() => {
        if (recipeSection !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipeSection])

    async function handleClick() {
        try {
            setLoadingAnimation(true);

            const recipeMarkdown = await getRecipeFromMistral(ingredients);
            if (recipeMarkdown) {
                setRecipeShown(recipeMarkdown);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingAnimation(false);
        }
    }

   

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function deleteIngredient(indexToDelete) {
        setIngredients(prev =>
          prev.filter((_, index) => index !== indexToDelete)
        )
      }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            
            {ingredients.length > 0 && 
                <IngredientsList
                ref = {recipeSection}
                ingredients={ingredients}
                getRecipe={handleClick}
                deleteIngredient = {deleteIngredient}
            />
            }
            {loadingAnimation && <Loading />}
            {recipeShown && <ClaudeRecipe recipeShown={recipeShown} />}
        </main>
    );
}