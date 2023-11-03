import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Home from "../pages/Home";
import { Category, Ingredients, Method, Recipe } from "../model/Recipe";

type EditRecipeProps = {
    recipe: Recipe | undefined;
    ingredients: Ingredients[];
    setNewIngredients: (newIngredients: Ingredients[]) => void;
    updatedRecipe: (recipe: Recipe) => void;
};

export default function EditRecipe(props: EditRecipeProps) {
    const [recipe, setRecipe] = useState<Recipe | undefined>(props.recipe);
    const quantityInputRef = useRef<HTMLInputElement | null>(null);

    const handleRecipeChange = (field: string, value: string | number) => {
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
                categories: recipe.categories.map((category, index) => {
                    if (index === id) {
                        return {
                            ...category,
                            [field]: value,
                        };
                    }
                    return category;
                }),
            };
            setRecipe(updatedRecipe);
        }
    };

    const handleDeleteIngredient = (id: number) => {
        if (recipe) {
            const updatedIngredients = recipe.ingredients.filter((_ingredient, index) => index !== id);
            setRecipe({ ...recipe, ingredients: updatedIngredients });
        }
    };

    const handleDeleteMethod = (id: number) => {
        if (recipe) {
            const updatedMethods = recipe.method.filter((_method, index) => index !== id);
            setRecipe({ ...recipe, method: updatedMethods });
        }
    };

    const handleDeleteCategory = (id: number) => {
        if (recipe) {
            const updatedCategories = recipe.categories.filter((_category, index) => index !== id);
            setRecipe({ ...recipe, categories: updatedCategories });
        }
    };

    const addNewIngredient = () => {
        if (recipe) {
            const newIngredient: Ingredients = {
                id: recipe.ingredients.length + 1,
                name: "",
                quantity: 0,
                unit: "",
            };
            setRecipe({ ...recipe, ingredients: [...recipe.ingredients, newIngredient] });
            if (quantityInputRef.current) {
                quantityInputRef.current.focus();
            }
        }
    };

    const addNewMethod = () => {
        if (recipe) {
            const newMethod: Method = {
                id: recipe.method.length + 1,
                method: "",
            };
            setRecipe({ ...recipe, method: [...recipe.method, newMethod] });
        }
    };

    const addNewCategory = () => {
        if (recipe) {
            const newCategory: Category = {
                id: recipe.categories.length + 1,
                categories: "",
            };
            setRecipe({ ...recipe, categories: [...recipe.categories, newCategory] });
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
                    onSubmit={(event) => {
                        event.preventDefault();
                        if (recipe) {
                            props.updatedRecipe(recipe);
                        }
                    }}
                >
                    <h2>
                        <input
                            type="text"
                            value={recipe?.title}
                            onChange={(event) => handleRecipeChange("title", event.target.value)}
                        />
                        <input
                            type="text"
                            value={recipe?.author}
                            onChange={(event) => handleRecipeChange("author", event.target.value)}
                        />
                        <label htmlFor="cookingtime">Kochzeit </label>
                        <input
                            type="number"
                            step="5"
                            id="cookingtime"
                            name="cookingtime"
                            value={recipe?.cookingtime}
                            onChange={(event) => handleRecipeChange("cookingtime", Number(event.target.value))}
                        />
                        <div className="label">
                            <label>Kategorien :</label>
                        </div>
                        {recipe?.categories.map((categories, index) => (
                            <div key={categories.id || index} className="label">
                                <input
                                    type="text"
                                    value={categories.categories}
                                    onChange={(event) =>
                                        handleFieldChange(index, "categories", event.target.value)
                                    }
                                />
                                <img
                                    src="/icons8-löschen-24.png"
                                    alt="löschen"
                                    title="Kategorie löschen"
                                    onClick={() => handleDeleteCategory(index)}
                                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                                />
                            </div>
                        ))}
                        <img
                            src="/icons8-hinzufügen-50.png"
                            alt="hinzufügen"
                            title="Kategorie hinzufügen"
                            onClick={addNewCategory}
                            style={{ cursor: "pointer", width: "20px", height: "20px" }}
                        />

                    </h2>

                    <div className="recipe-details">
                        <h2>Zutaten</h2>
                        {recipe?.ingredients.map((ingredient, index) => (
                            <div key={ingredient.id || index} className="recipe-list-item">
                                <input
                                    type="text"
                                    value={ingredient.quantity.toString()}
                                    onChange={(event) =>
                                        handleFieldChange(index, "quantity", event.target.value)
                                    }
                                    placeholder="Menge"
                                />
                                <input
                                    type="text"
                                    value={ingredient.unit}
                                    onChange={(event) =>
                                        handleFieldChange(index, "unit", event.target.value)
                                    }
                                    placeholder="Einheit"
                                />
                                <input
                                    type="text"
                                    value={ingredient.name}
                                    onChange={(event) =>
                                        handleFieldChange(index, "name", event.target.value)
                                    }
                                    placeholder="Zutat"
                                />
                                <img
                                    src="/icons8-löschen-24.png"
                                    alt="löschen"
                                    title="Zutat löschen"
                                    onClick={() => handleDeleteIngredient(index)}
                                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                                />
                            </div>
                        ))}
                        <img
                            src="/icons8-hinzufügen-50.png"
                            alt="hinzufügen"
                            title="Zutat hinzufügen"
                            onClick={addNewIngredient}
                            style={{ cursor: "pointer", width: "20px", height: "20px" }}
                        />
                    </div>
                    <h2>Beschreibung</h2>
                    <div className="recipe-gallery">
                        <img src={recipe?.url} alt="Rezeptbild" />
                        <div className="recipe-details">
                            <input
                                value={recipe?.description}
                                onChange={(event) => handleRecipeChange("description", event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-box">
                        <h2>Schritte</h2>
                        {recipe?.method.map((method, index) => (
                            <div key={method.id || index} className="flex-item">
                                <input
                                    value={"Schritt " + (index + 1) + " " + method.method}
                                    onChange={(event) =>
                                        handleFieldChange(index, "method", event.target.value)
                                    }
                                />
                                <img
                                    src="/icons8-löschen-24.png"
                                    alt="löschen"
                                    title="Schritt lösche"
                                    onClick={() => handleDeleteMethod(index)}
                                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                                />
                            </div>
                        ))}
                        <img
                            src="/icons8-hinzufügen-50.png"
                            alt="bearbeiten"
                            title="Schritte bearbeiten"
                            onClick={addNewMethod}
                            style={{ cursor: "pointer", width: "20px", height: "20px" }}
                            className="recipe-add-icon"
                        />
                    </div>
                    <div className="flex-item">
                        <button type="submit">Update</button>
                    </div>
                </form>
            </div>
        </>
    );
}
