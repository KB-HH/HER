import './App.css'
import {Route, Routes } from "react-router-dom";
import {useEffect, useState} from "react";
import {Recipe, Ingredients} from "./model/Recipe.tsx";
import axios from "axios";
import RecipeGallery from "./components/RecipeGallery.tsx";
import EditRecipe from "./components/EditRecipe.tsx";


export default function App() {
    const uri: string = "/api/recipes"
    const [recipes, setRecipes] = useState<Recipe[]>();
    const [recipe, setRecipe] = useState<Recipe>();
    const [ingredients, setNewIngredient] = useState<Ingredients>();


    useEffect(() => {
        getAll()
    }, []);

    function getAll() {
        axios.get(uri)
            .then(response => {setRecipes(response.data)
            })
            .catch(() => {
                alert('Kein Rezept vorhanden')
            })
    }

    function updatedRecipe(recipe: Recipe) {
        axios.put(uri, recipe)
            .then((response) => {
                console.log('Rezept erfolgreich aktualisiert:', response.data);
                return response.data;
            })
            .catch((error) => {
                console.error('Fehler beim Aktualisieren des Rezepts:', error);
                throw error;
            });
    }


    return (
    <>

      <Routes>
          <Route path="/" element={<RecipeGallery setRecipe={setRecipe} recipes={recipes}/>}/>
          <Route path="/api/recipes/:id/edit" element={<EditRecipe recipe={recipe}
                                                                   ingredients={ingredients}
                                                                   setNewIngredient={setNewIngredient}
                                                                   updatedRecipe={updatedRecipe}/>}/>

      </Routes>
    </>
  )
}