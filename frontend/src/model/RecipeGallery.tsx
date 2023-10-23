
import RecipeCard from "./RecipeCard.tsx";
import {Recipes} from "../components/Recipes.tsx";
import {ChangeEvent, useState} from "react";


type RecipeGalleryProps = {
    recipes?: Recipes[],
}

export default function RecipeGallery(props: RecipeGalleryProps) {
    const [searchText, setSearchText] = useState<string>("")

    const filteredRecipes = props.recipes?.filter((recipes) => recipes.title.toLowerCase().includes(searchText.toLowerCase()))

    function onSearchTextChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchText(event.target.value)
    }

    return (

            <div className="div_Gallery">
                <input onChange={onSearchTextChange} value={searchText}/>
                    {filteredRecipes?.map(recipes => <RecipeCard key={recipes.id} recipe={recipes}/>)}
                    <button>Search</button>
            {props.recipes?.map((recipe) => (
                <div key={recipe.id}>
                    <RecipeCard recipe={recipe}/>
                </div>
            ))}
           </div>
            )
}