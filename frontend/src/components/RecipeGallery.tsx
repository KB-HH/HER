import RecipeCard from "./RecipeCard.tsx";
import { ChangeEvent, useState } from "react";
import Home from "../pages/Home.tsx";
import { Category, Recipe } from "../model/Recipe.tsx";
import { Link } from "react-router-dom";

type RecipeGalleryProps = {
    recipes?: Recipe[],
    setRecipe: (recipe: Recipe) => void;
    categories?: Category[],
}

export default function RecipeGallery(props: RecipeGalleryProps) {
    const [searchTerm, setSearchTerm] = useState<string>("");

    function filterRecipes(searchTerms: string[]) {
        return props.recipes?.filter((recipe) => {
            const searchTermLower = searchTerms.map(term => term.toLowerCase());
            return searchTermLower.every(term => (
                recipe.ingredients.some(ingredient => ingredient.name.toLowerCase().includes(term))
            ));
        });
    }

    function onSearchTextChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }

    const searchTermsArray = searchTerm.split(",").map(term => term.trim());
    const filteredRecipes = filterRecipes(searchTermsArray);

    return (
        <>
            <Home />
            <Link to="/recipes/add">
                <img src="/icons8-cooking-pot-96.png" alt="Add Recipe" title="Rezept hinzufügen" />
            </Link>

            <div className="recipe-gallery">
                <div className="recipe-list">
                    <input
                        type="text"
                        placeholder="Suche nach Zutaten (durch Kommas getrennt)"
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
