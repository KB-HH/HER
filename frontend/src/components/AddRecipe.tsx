import React, {useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Home from "../pages/Home.tsx";
import {Recipe} from "../model/Recipe.tsx";
import {
    addNewIngredient,
    addNewMethod,
    addNewCategory,
    deleteIngredient,
    deleteMethod,
    deleteCategory
} from "../model/RecipeFunctions";
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
    const [showIngredientsTitle, setShowIngredientsTitle] = useState(false);
    const [showMethodsTitle, setShowMethodsTitle] = useState(false);
    const [showCategoriesTitle, setShowCategoriesTitle] = useState(false);
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

    const handleAddNewIngredient = () => {
        if (newRecipe) {
            const updatedRecipe = addNewIngredient(newRecipe, quantityInputRef);
            setNewRecipe(updatedRecipe);
            setShowIngredientsTitle(true);
        }
    };

    const handleAddNewMethod = () => {
        if (newRecipe) {
            const updatedRecipe = addNewMethod(newRecipe);
            setNewRecipe(updatedRecipe);
            setShowMethodsTitle(true);
        }
    };

    const handleAddNewCategory = () => {
        if (newRecipe) {
            const updatedRecipe = addNewCategory(newRecipe);
            setNewRecipe(updatedRecipe);
            setShowCategoriesTitle(true);
        }
    };

    const handleDeleteIngredient = (id: number) => {
        if (newRecipe) {
            const updatedRecipe = deleteIngredient(newRecipe, id);
            setNewRecipe(updatedRecipe);
        }
    };

    const handleDeleteMethod = (id: number) => {
        if (newRecipe) {
            const updatedRecipe = deleteMethod(newRecipe, id);
            setNewRecipe(updatedRecipe);
        }
    };

    const handleDeleteCategory = (id: number) => {
        if (newRecipe) {
            const updatedRecipe = deleteCategory(newRecipe, id);
            setNewRecipe(updatedRecipe);
        }
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
            <div className="div_description">
                <div className="recipe-title">
                <h1>Neues Rezept</h1>
                </div>
                <form>
                    <h2>
                        <input
                            type="text"
                            placeholder="Wie heißt dein Rezept?"
                            value={newRecipe.title}
                            onChange={(event) => handleRecipeChange('title', event.target.value)}
                            style={{ cursor: "pointer",width: "60em", height: "1.5em", marginBottom: "1em" }}
                        />
                        <textarea
                            placeholder="Gebe uns bitte eine kurze Beschreibung dazu..."
                            value={newRecipe.description}
                            onChange={(event) => handleRecipeChange('description', event.target.value) }
                            style={{ cursor: "pointer", width: "56em", marginLeft: "0.2em" ,fontFamily: 'Courier New, serif',fontSize: '0.7em', border: '1px solid #ccc', borderRadius: "1em"}}
                        />
                    </h2>

                    <div className="recipe-details">
                        {showIngredientsTitle && <h2>Zutaten</h2>}
                        {newRecipe.ingredients.map((ingredient, index) => (
                            <div key={ingredient.id || index} className="recipe-list-item">
                                <input
                                    type="number"
                                    placeholder="Menge"
                                    value={ingredient.quantity.toString()}
                                    onChange={(event) => handleIngredientChange(ingredient.id, 'quantity', Number(event.target.value))}
                                    style={{ cursor: "pointer",width: "4em", height: "1.9em",borderRadius:"10%" }}
                                />
                                <input
                                    type="text"
                                    placeholder="Einheit"
                                    value={ingredient.unit}
                                    onChange={(event) => handleIngredientChange(ingredient.id, 'unit', event.target.value)}
                                    style={{ cursor: "pointer",width: "5em"}}
                                />
                                <input
                                    type="text"
                                    placeholder="Zutat"
                                    value={ingredient.name}
                                    onChange={(event) => handleIngredientChange(ingredient.id, 'name', event.target.value)}
                                    style={{ cursor: "pointer",width: "15em"}}
                                />
                                <img
                                    src="/icons8-löschen-24.png"
                                    alt="löschen"
                                    title="Zutat löschen"
                                    onClick={() => handleDeleteIngredient(index)}
                                    onKeyDown={(event: React.KeyboardEvent<HTMLImageElement>) => {
                                        if (event.key === 'Enter') {
                                            handleDeleteIngredient(index);
                                        }
                                    }}
                                    style={{ cursor: "pointer", width: "1em", height: "1em" }}
                                    tabIndex={0}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddNewIngredient}>
                            Zutaten
                        </button>
                        {showMethodsTitle && <h2>Schritte</h2>}
                        {newRecipe.method.map((method, index) => (
                            <div key={method.id || index}>
                                <textarea
                                    placeholder="Schritt"
                                    value={method.method}
                                    onChange={(event) => handleMethodChange(method.id, 'method', event.target.value)}
                                    style={{ cursor: "pointer", width: "30em" ,fontFamily: 'Courier New, serif', marginLeft: "5em",fontSize: '1em', border: '1px solid #ccc', borderRadius: "1em"}}
                                />
                                <img
                                    src="/icons8-löschen-24.png"
                                    alt="löschen"
                                    title="Schritt löschen"
                                    onClick={() => handleDeleteMethod(index)}
                                    onKeyDown={(event: React.KeyboardEvent<HTMLImageElement>) => {
                                        if (event.key === 'Enter') {
                                            handleDeleteMethod(index);
                                        }
                                    }}
                                    style={{ cursor: "pointer", width: "1em", height: "1em" }}
                                    tabIndex={0}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddNewMethod}>
                            Schritte
                        </button>

                        {showCategoriesTitle && <h2>Kategorien</h2>}
                        {newRecipe.categories.map((category, index) => (
                            <div key={category.id || index}>
                                <input
                                    type="text"
                                    placeholder="Kategorie"
                                    value={category.categories}
                                    onChange={(event) => handleCategoryChange(category.id, 'categories', event.target.value)}
                                />
                                <img
                                    src="/icons8-löschen-24.png"
                                    alt="löschen"
                                    title="Kategorie löschen"
                                    onClick={() => handleDeleteCategory(index)}
                                    onKeyDown={(event: React.KeyboardEvent<HTMLImageElement>) => {
                                        if (event.key === 'Enter') {
                                            handleDeleteCategory(index);
                                        }
                                    }}
                                    style={{ cursor: "pointer", width: "1em", height: "1em" }}
                                    tabIndex={0}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddNewCategory}>
                            Kategorie
                        </button>
                    </div>
                        <input
                            type="number"
                            step="5"
                            placeholder="Kochzeit"
                            value={newRecipe.cookingtime}
                            onChange={(event) => handleRecipeChange('cookingtime', event.target.value)}
                            style={{ cursor: "pointer", width: "4em", height: "1.2em" }}
                        />
                        <label>Kochzeit</label>
                        <input
                            type="text"
                            placeholder="Dein Name"
                            value={newRecipe.author}
                            onChange={(event) => handleRecipeChange('author', event.target.value)}
                            style={{ cursor: "pointer", width: "60em", height: "1.2em", marginTop:"0.5em", paddingTop: "0.5" }}
                        />
                        <input
                            type="text"
                            placeholder="Wenn Du Bilder eintragen möchtest, kannst Du hier gern die 'url' eintragen..."
                            value={newRecipe.url}
                            onChange={(event) => handleRecipeChange('url', event.target.value)}
                            style={{ cursor: "pointer", width: "60em", height: "1.2em", marginTop:"0.5em", paddingBottom: "0.5" }}
                        />
                    <button type="button" onClick={saveRecipe}>
                        Rezept speichern
                    </button>
                </form>
            </div>
        </>
    );
}
