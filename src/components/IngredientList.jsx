import '../styles/form.css'
export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map((ingredient, index) => (
      <li key={index}>
        {ingredient}
        <button
          className="delete-btn"
          onClick={() => props.deleteIngredient(index)}
        >
          X
        </button>
      </li>
    ))
    return (
        <section className='ingredients-recipe-con'>
            <h2 className='.ingredient-h2'>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>

            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <div ref={props.ref}>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>Get a recipe</button>
            </div>}
        </section>
    )
}