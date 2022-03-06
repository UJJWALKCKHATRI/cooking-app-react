import React, {useContext} from 'react'
import IngredientList from './IngredientList'
import { RecipeContext } from './App'

export default function Recipe(props) {
    const { handleRecipeDelete, handleRecipeSelect} = useContext(RecipeContext)
    const {
        id,
        name,
        cookTime,
        servings,
        Instruction,
        ingredients,
    }= props
  return (
    <div className='recipe'>
        <div className='header'>
            <h3 className='title'>{name}</h3>
            <div>
                <button className='btn btn--primary mr-1' onClick={()=> handleRecipeSelect(id)}>Edit</button>
                <button className='btn btn--danger'
                onClick={()=> handleRecipeDelete(id)}
                >
                Delete</button>
            </div>
        </div>
        <div className='row'>
            <span className='label'>Cook Time:</span>
            <span className='value'>{cookTime}</span>
        </div>
        <div className='row'>
            <span className='label'>Serving:</span>
            <span className='value'>{servings}</span>
        </div>
        <div className='row'>
            <span className='label'>Instruction</span>
           <div className='value instructions indented'>
              {Instruction}
           </div>
        </div>
        <div className='row'>
            <span className='label'>Ingredient</span>
           <div className='value'>
             <IngredientList ingredients= {ingredients}/>
           </div>
        </div>
    </div>
  )
}
