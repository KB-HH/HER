
import RecipeCard from "./RecipeCard.tsx";
import {ChangeEvent,useState} from "react";
import Home from "../pages/Home.tsx";
import {Category, Recipe} from "../model/Recipe.tsx";
import {Link} from "react-router-dom";


type RecipeGalleryProps = {
    recipes?: Recipe[],
    setRecipe: (recipe: Recipe) => void;
    categories?: Category[],
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
            <Link to="/recipes/add">
                <img src="/icons8-cooking-pot-96.png" alt="Add Recipe" title="Rezept hinzufügen"/>
            </Link>

            <div className="recipe-gallery">
                <div className="recipe-list">
                <input
                    type="text"
                    placeholder="Suche nach Rezepten / Zutaten"
                    onChange={onSearchTextChange}
                    value={searchTerm}
                />
                </div>
            </div>
            <div className="recipe-gallery">
                <div className="recipe-card-container">
                    {filteredRecipes?.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            setRecipe={props.setRecipe}
                        />
                    ))}
                </div>
            </div>

        </>
            )
}