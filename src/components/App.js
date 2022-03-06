import React, { useState, useEffect} from "react";
import RecipeList from "./RecipeList";
import { v4 as uuidv4 } from 'uuid'
import '../css/app.css'
import RecipeEdit from "./RecipeEdit";

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cooking.recipes'


function App() {
  const[selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)
  

  useEffect(()=>{
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(recipes))
  },[recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: 'new',
      servings: 1,
      cookTime: '1:00',
      instructions: 'Instr',
      ingredients: [
        { id: uuidv4(), name: 'name', amount: '1tbs' }
      ]
    }
    setRecipes([...recipes, newRecipe])
  }
  function handleRecipeChange(id,recipe){
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }


  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList
        recipes={recipes} />
        {selectedRecipe && <RecipeEdit recipe = { selectedRecipe}/>}
    </RecipeContext.Provider>

  )
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    cookTime: '1:45',
    servings: '3',
    Instruction: '1. Put salt on Children \n2. Put salt on rice \n3. Put salt on vegetable',
    ingredients: [{
      id: 1,
      name: 'Chicken',
      amount: '2 pounds'
    },
    {
      id: 2,
      name: 'Salt',
      amount: '1 tbs'
    }]
  },
  {
    id: 2,
    name: 'Plain pulau',
    cookTime: '4:45',
    servings: '3',
    Instruction: '1. Put salt on pulau \n2. Put salt on rice \n3. Put salt on ghee',
    ingredients: [
      {
        id: 1,
        name: 'manChicken',
        amount: '22 pounds'
      },
      {
        id: 2,
        name: 'malt',
        amount: '4 tbs'
      }
    ]
  }

]

export default App;
