import React, { useContext } from 'react'
import RecipeIngredient from './RecipeIngredient'
import { RecipeContext } from './App'

export default function RecipeEdit({ recipe }) {
    const { handleRecipeChange } = useContext(RecipeContext)

    function handleChange(changes) {
        handleRecipeChange(recipe.id, { ...recipe, ...changes })
    }
    function handleIngredientChange(id, ingredient){
        const newIngredients = [...recipe.ingredients]
        const index = newIngredients.findIndex(i => i.id === id)
        newIngredients[index] = ingredient
        handleChange({ ingredients: newIngredients })
      }
    

    return (
        <div className='recipe-edit'>
            <div className='remove-button-container'>
                <button className='btn remove-button'>&times;</button>
            </div>
            <div className='details-grid'>
                <label htmlFor='name' className='recipe_edit__label'>Name</label>
                <input type="text" name='name' id='name' value={recipe.name} onInput={e => handleChange({ name: e.target.value })} className='recipe_edit__input' />
                <label htmlFor='name' className='recipe_edit__label'>Cook Time</label>
                <input type="text" name='cooktime' id='cooktime' value={recipe.cookTime} onInput={e => handleChange({ cookTime: e.target.value })} className='recipe_edit__input' />
                <label htmlFor='name' className='recipe_edit__label'>Servings</label>
                <input type="number" min="1" name='servings' id='servings' value={recipe.servings} onInput={e => handleChange({ servings: parseInt(e.target.value) || '' })} className='recipe_edit__input' />
                <label htmlFor='instruction' className='recipe_edit__label'>Instructions</label>
                <textarea name='instructions' className='recipe_edit__input' onInput={e=> handleChange({Instruction: e.target.value })}id='instructions'value={recipe.Instruction}/>

                
                
            </div>
            <br />
            <label className='recipe_edit__label'>Ingredients</label>
            <div className='recipe-edit__ingredient-grid'>
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {recipe.ingredients.map(ingredient => (
                    <RecipeIngredient key={ingredient.id}
                    handleIngredientChange = {handleIngredientChange}
                        ingredient={ingredient} />
                ))}

            </div>
            <div className='recipe-edit__add-ingredient-btn-container'>
                <button className='btn btn--primary'>Add Ingredients</button>
            </div>
        </div>
    )
}
