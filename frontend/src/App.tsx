import './App.css'
import {Route, Routes } from 'react-router-dom';
import {useEffect, useState} from "react";
import {Recipes} from "./components/Recipes.tsx";
import axios from "axios";
import Home from "./pages/Home.tsx";
import RecipeGallery from "./model/RecipeGallery.tsx";

export default function App() {
    const uri: string = "/api/recipes"
    const [recipes, setRecipes] = useState<Recipes[]>();

    useEffect(() => {
        getAll()
    }, []);

    function getAll() {
        axios.get(uri)
            .then(response => {setRecipes(response.data)}
            )
            .catch(() =>{postMessage("Fehler, leider nichts gefunden!",)}
            )
    }

    return (
    <>
        <Home/>
      <Routes>
          <Route path={"/*"} element={<RecipeGallery recipes={recipes}/>}/>
      </Routes>
    </>
  )
}
