import Home from "../pages/Home.tsx";
import { Ingredients, Recipe } from "../model/Recipe.tsx";
import { useState } from "react";
import { Link } from "react-router-dom";

type EditRecipeProps = {
    recipe: Recipe | undefined;
    ingredients: Ingredients[];
    setNewIngredients: (newIngredients: Ingredients[]) => void;
    updatedRecipe: (recipe: Recipe) => void;
};

export default function EditRecipe(props: EditRecipeProps) {
    const [recipe, setRecipe] = useState(props.recipe);

    const handleRecipeChange = (field: string, value: string) => {
        if (recipe) {
            setRecipe({ ...recipe, [field]: value });
        }
    };

    const handleFieldChange = (
        id: number,
        field: string,
        value: string | number
    ) => {
        if (recipe) {
            const updatedRecipe: Recipe = {
                ...recipe,
                ingredients: recipe.ingredients.map((ingredient, index) => {
                    if (index === id) {
                        return {
                            ...ingredient,
                            [field]: value,
                        };
                    }
                    return ingredient;
                }),
                method: recipe.method.map((method, index) => {
                    if (index === id) {
                        return {
                            ...method,
                            [field]: value,
                        };
                    }
                    return method;
                }),
                categories: recipe.categories.map((categories, index) => {
                    if (index === id) {
                        return {
                            ...categories,
                            [field]: value,
                        };
                    }
                    return categories;
                }),
            };
            setRecipe(updatedRecipe);
        }
    };

    return (
        <>
            <Home />
            <Link to="/">
                <img src="/icons8-zurück-48.png" alt="Back" />
            </Link>
            <div className="recipe-card">

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        props.updatedRecipe(recipe as Recipe);
                    }}
                >
                    <h2>
                        <input
                            type="text"
                            value={recipe?.title}
                            onChange={(e) => handleRecipeChange("title", e.target.value)}
                        />
                    </h2>
                    <div className="recipe-details">
                        <div className="recipe-list-item"></div>
                            <h2>Zutaten</h2>
                            {recipe?.ingredients.map((ingredient, index) => (
                                <div key={ingredient.id || index} className="recipe-list-item">
                                    <input
                                        type="text"
                                        value={ingredient.quantity.toString()}
                                        onChange={(e) =>
                                            handleFieldChange(index, "quantity", e.target.value)
                                        }
                                        placeholder="Menge"
                                    />
                                    <input
                                        type="text"
                                        value={ingredient.unit}
                                        onChange={(e) =>
                                            handleFieldChange(index, "unit", e.target.value)
                                        }
                                        placeholder="Einheit"
                                    />
                                    <input
                                        type="text"
                                        value={ingredient.name}
                                        onChange={(e) =>
                                            handleFieldChange(index, "name", e.target.value)
                                        }
                                        placeholder="Zutat"
                                    />
                                </div>

                            ))}

                        <div className="description">
                            <h2>Beschreibung</h2>
                        <input
                            value={props.recipe?.description}
                            onChange={(e) => handleRecipeChange("description", e.target.value)}
                        />
                        </div>
                    </div>

                        <div className="instructions">
                            <h2>Schritte</h2>
                            {recipe?.method.map((method, index) => (
                                <div key={method.id || index} className="flex-item">
                                    <input
                                        value={"Schritt " + (index + 1) + " " + method.method}
                                        onChange={(e) =>
                                            handleFieldChange(index, "method", e.target.value)
                                        }
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex-container">
                            <h3>Kategorien</h3>
                            {recipe?.categories.map((categories, index) => (
                                <div key={categories.id || index} className="flex-item">
                                    <input
                                        value={categories.categories}
                                        onChange={(e) =>
                                            handleFieldChange(index, "categories", e.target.value)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    <div className="flex-container">
                        <div className="flex-item">
                            <button type="submit">Update</button>
                        </div>
                        <div className="flex-item">
                            <input
                                type="text"
                                value={recipe?.cookingtime}
                                onChange={(e) => handleRecipeChange("cookingtime", e.target.value)}
                            />
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}

