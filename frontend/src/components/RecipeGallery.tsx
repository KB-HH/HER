
import RecipeCard from "./RecipeCard.tsx";
import {ChangeEvent,useState} from "react";
import Home from "../pages/Home.tsx";
import {Categories, Recipe} from "../model/Recipe.tsx";
import {Link} from "react-router-dom";


type RecipeGalleryProps = {
    recipes?: Recipe[],
    setRecipe: (recipe: Recipe) => void;
    categories?: Categories[],
}

export default function RecipeGallery(props: RecipeGalleryProps) {

    const [searchTerm, setSearchTerm] = useState<string>("")
    const filteredRecipes = props.recipes?.filter((recipe) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            recipe.title.toLowerCase().includes(searchTermLower) ||
            recipe.ingredients.some((ingredient) =>
                ingredient.name.toLowerCase().includes(searchTermLower)
            )
        );
    });

    function onSearchTextChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value)
    }


    return (
        <>
            <Home/>
            <Link to={"/recipes/add"}>New</Link>
                <div className="recipe-gallery">
                <input
                    type="text"
                    placeholder="Suche nach Rezepten / Zutaten"
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