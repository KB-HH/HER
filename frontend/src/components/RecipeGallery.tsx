
import RecipeCard from "./RecipeCard.tsx";
import {ChangeEvent, useState} from "react";
import Home from "../pages/Home.tsx";
import {Recipe} from "../model/Recipe.tsx";


type RecipeGalleryProps = {
    recipes?: Recipe[],
    setRecipe: (recipe: Recipe) => void;
}

export default function RecipeGallery(props: RecipeGalleryProps) {

        const [searchTerm, setSearchTerm] = useState<string>("")
        const filteredRecipes = props.recipes?.filter((recipe) => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))

    function onSearchTextChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value)
    }

    return (
        <>
            <Home/>
                <div className="recipe-gallery">
                <input
                    type="text"
                    placeholder="Suche nach Rezepten"
                    onChange={onSearchTextChange} value={searchTerm}
                />
                    {filteredRecipes?.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            setRecipe={props.setRecipe}
                            />

                    ))}
                 </div>
        </>
            )
}