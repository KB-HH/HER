import './App.css'
import {Route, Routes } from "react-router-dom";
import {useEffect, useState} from "react";
import {Recipe} from "./model/Recipe.tsx";
import axios from "axios";
import RecipeGallery from "./components/RecipeGallery.tsx";
import EditRecipe from "./components/EditRecipe.tsx";


export default function App() {
    const uri: string = "/api/recipes"
    const [recipes, setRecipes] = useState<Recipe[]>();
    const [recipe, setRecipe] = useState<Recipe>();



    useEffect(() => {
        getAll()
    }, []);

    function getAll() {
        axios.get(uri)
            .then(response => {setRecipes(response.data)
            })
            .catch(() => {
                alert("Kein Rezept vorhanden")
            })
    }

    function updatedRecipe(updatedRecipe: Recipe) {
        if (recipes) {
            axios
                .put(`${uri}/${updatedRecipe.id}`, updatedRecipe)
                .then((response) => {
                    const updatedRecipes = (recipes || []).map((recipe) =>
                        recipe.id === updatedRecipe.id ? response.data : recipe
                    );
                    setRecipes(updatedRecipes);
                    alert("Rezept erfolgreich aktualisiert.");
                })
                .catch(() => {
                    alert("Update Rezept fehlgeschlagen");
                });
        }
    }



    return (
    <>

      <Routes>
          <Route path="/" element={<RecipeGallery setRecipe={setRecipe} recipes={recipes}/>}/>
          <Route path="/api/recipes/:id" element={<EditRecipe recipe={recipe} updatedRecipe={updatedRecipe}
                                                                   ingredients={recipe?.ingredients ?? []}
                                                                   setNewIngredients={(newIngredients) =>
                                                                       setRecipe((prevRecipe) =>
                                                                           prevRecipe
                                                                               ? { ...prevRecipe, ingredients: newIngredients }
                                                                               : prevRecipe
                                                                       )
                                                                   }
                                                                   />}/>

      </Routes>
    </>
  )
}