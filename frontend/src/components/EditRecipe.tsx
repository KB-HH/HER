
import Home from "../pages/Home.tsx";
import { Ingredients, Recipe } from "../model/Recipe.tsx";
import {useState} from "react";

type EditRecipeProps = {
    recipe: Recipe | undefined;
    ingredients: Ingredients | (() => Ingredients)
    updatedRecipe: (recipe: Recipe) => void;
};


export default function EditRecipe(props: EditRecipeProps) {
    const [recipe, setRecipe] = useState(props.recipe);


    const handleFieldChange = (id: number, field: string, value: string | number) => {
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
            };
            setRecipe(updatedRecipe);
        }
    };

    return (
        <>
            <Home />
            <div className="recipe-card">
                <form>
                    <div className="div_list">
                        <h2>{props.recipe?.title}</h2>
                        {recipe?.ingredients.map((ingredient, index) => (
                            <div key={ingredient.id || index}>
                                <input
                                    type="text"
                                    value={ingredient.quantity.toString()}
                                    onChange={(e) => handleFieldChange(index, 'quantity', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={ingredient.unit}
                                    onChange={(e) => handleFieldChange(index, 'unit', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={ingredient.name}
                                    onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                    <h2>Beschreibung</h2>
                    <div className="div_description">
                        <textarea value={props.recipe?.description} />
                    </div>

                    <h2>Method</h2>
                    {recipe?.method.map((method, index) => (
                        <div key={method.id || index}>
              <textarea
                  value={"Schritt " + (index + 1) + " " + method.method}
                  onChange={(e) =>
                      handleFieldChange(index, 'method', e.target.value)
                  }
              />
                        </div>
                    ))}
                    <button type="submit">Update</button>
                </form>
            </div>
        </>
    );
}
