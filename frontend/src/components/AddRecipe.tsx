import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Home from "../pages/Home.tsx";
import { Category, Ingredients, Method, Recipe } from "../model/Recipe.tsx";
import axios from "axios";

type AddRecipeProps = {
    addNewRecipe: (recipe: Recipe) => void;
    getAll: () => void;
    uri: string;
};

export default function AddRecipe(props: AddRecipeProps) {
    const initialRecipe: Recipe = {
        title: "",
        description: "",
        ingredients: [],
        method: [],
        categories: [],
        cookingtime: 0,
        author: "",
        url: "",
    };
    const [newRecipe, setNewRecipe] = useState<Recipe>(initialRecipe);
    const navigate = useNavigate();

    const quantityInputRef = useRef<HTMLInputElement | null>(null);

    const handleRecipeChange = (field: string, value: string) => {
        setNewRecipe({ ...newRecipe, [field]: value });
    };

    const handleIngredientChange = (id: number, field: string, value: string | number) => {
        const updatedIngredients = newRecipe.ingredients.map((ingredient) => {
            if (ingredient.id === id) {
                return {
                    ...ingredient,
                    [field]: value,
                };
            }
            return ingredient;
        });
        setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
    };

    const handleMethodChange = (id: number, field: string, value: string | number) => {
        const updatedMethods = newRecipe.method.map((method) => {
            if (method.id === id) {
                return {
                    ...method,
                    [field]: value,
                };
            }
            return method;
        });
        setNewRecipe({ ...newRecipe, method: updatedMethods });
    };

    const handleCategoryChange = (id: number, field: string, value: string | number) => {
        const updatedCategories = newRecipe.categories.map((category) => {
            if (category.id === id) {
                return {
                    ...category,
                    [field]: value,
                };
            }
            return category;
        });
        setNewRecipe({ ...newRecipe, categories: updatedCategories });
    };

    const addNewIngredient = () => {
        const newIngredient: Ingredients = {
            id: newRecipe.ingredients.length + 1,
            name: "",
            quantity: 0,
            unit: "",
        };
        setNewRecipe({ ...newRecipe, ingredients: [...newRecipe.ingredients, newIngredient] });
        if (quantityInputRef.current) {
            quantityInputRef.current.focus();
        }
    };

    const addNewMethod = () => {
        const newMethod: Method = {
            id: newRecipe.method.length + 1,
            method: "",
        };
        setNewRecipe({ ...newRecipe, method: [...newRecipe.method, newMethod] });
    };

    const addNewCategory = () => {
        const newCategory: Category = {
            id: newRecipe.categories.length + 1,
            categories: "",
        };
        setNewRecipe({ ...newRecipe, categories: [...newRecipe.categories, newCategory] });
    };

    const saveRecipe = () => {
        const hasNonZeroQuantity = newRecipe.ingredients.some((ingredient) => ingredient.quantity > 0);
        if (hasNonZeroQuantity) {
            axios
                .post(props.uri, newRecipe)
                .then((response) => {
                    const createdRecipe = response.data;
                    props.addNewRecipe(createdRecipe);
                    props.getAll();
                    navigate("/");
                })
                .catch((error) => {
                    alert('Fehler:' + error.response.data);
                    navigate("/recipes/add");
                });
        } else {
            alert('Gebe bitte mindestens eine Zutat ein, sonst kann Du leider kein Rezept speichern.');
        }
    };

    return (
        <>
            <Home />
            <Link to="/">
                <img src="/icons8-zurück-48.png" alt="Back" />
            </Link>
            <div className="recipe-card">
                <h1>Neues Rezept</h1>
                <form>
                    <h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newRecipe.title}
                            onChange={(e) => handleRecipeChange('title', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Beschreibung"
                            value={newRecipe.description}
                            onChange={(e) => handleRecipeChange('description', e.target.value)}
                        />
                    </h2>

                    <div className="recipe-card">
                        <h2>Zutaten</h2>
                        {newRecipe.ingredients.map((ingredient, index) => (
                            <div key={ingredient.id || index}>
                                <input
                                    ref={(ref) => (index === newRecipe.ingredients.length - 1 ? (quantityInputRef.current && ref) : null)}
                                    type="number"
                                    placeholder="Menge"
                                    value={ingredient.quantity.toString()}
                                    onChange={(e) => handleIngredientChange(ingredient.id, 'quantity', Number(e.target.value))}
                                />
                                <input
                                    type="text"
                                    placeholder="Einheit"
                                    value={ingredient.unit}
                                    onChange={(e) => handleIngredientChange(ingredient.id, 'unit', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Zutat"
                                    value={ingredient.name}
                                    onChange={(e) => handleIngredientChange(ingredient.id, 'name', e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addNewIngredient}>
                            Zutaten
                        </button>
                    </div>

                    <div className="div_list">
                        <h2>Schritte</h2>
                        {newRecipe.method.map((method, index) => (
                            <div key={method.id || index}>
                                <input
                                    type="text"
                                    placeholder="Schritt"
                                    value={method.method}
                                    onChange={(e) => handleMethodChange(method.id, 'method', e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addNewMethod}>
                            Schritte
                        </button>
                    </div>

                    <div className="div_list">
                        <h2>Kategorien</h2>
                        {newRecipe.categories.map((category, index) => (
                            <div key={category.id || index}>
                                <input
                                    type="text"
                                    placeholder="Kategorie"
                                    value={category.categories}
                                    onChange={(e) => handleCategoryChange(category.id, 'categories', e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addNewCategory}>
                            Kategorie
                        </button>
                    </div>

                    <h3>
                        <input
                            type="number"
                            step="5"
                            placeholder="Kochzeit"
                            value={newRecipe.cookingtime}
                            onChange={(e) => handleRecipeChange('cookingtime', e.target.value)}
                        />
                        <label>Kochzeit</label>
                        <input
                            type="text"
                            placeholder="Author"
                            value={newRecipe.author}
                            onChange={(e) => handleRecipeChange('author', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Bilder"
                            value={newRecipe.url}
                            onChange={(e) => handleRecipeChange('url', e.target.value)}
                        />
                    </h3>

                    <button type="button" onClick={saveRecipe}>
                        Rezept speichern
                    </button>
                </form>
            </div>
        </>
    );
}
