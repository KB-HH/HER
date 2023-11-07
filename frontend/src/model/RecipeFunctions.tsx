
import { Recipe, Ingredients, Method, Category } from "./Recipe";


export function addNewIngredient(recipe: Recipe, quantityInputRef: React.RefObject<HTMLInputElement>): Recipe {
    const newIngredient: Ingredients = {
        id: recipe.ingredients.length + 1,
        name: "",
        quantity: 0,
        unit: "",
    };
    const updatedRecipe = { ...recipe, ingredients: [...recipe.ingredients, newIngredient] };

    if (quantityInputRef.current) {
        quantityInputRef.current.focus();
    }

    return updatedRecipe;
}

export function addNewMethod(recipe: Recipe): Recipe {
    const newMethod: Method = {
        id: recipe.method.length + 1,
        method: "",
    };
    return { ...recipe, method: [...recipe.method, newMethod] };
}

export function addNewCategory(recipe: Recipe): Recipe {
    const newCategory: Category = {
        id: recipe.categories.length + 1,
        categories: "",
    };
    return { ...recipe, categories: [...recipe.categories, newCategory] };
}

export function deleteIngredient(recipe: Recipe, id: number): Recipe {
    const updatedIngredients = recipe.ingredients.filter((_ingredient, index) => index !== id);
    return { ...recipe, ingredients: updatedIngredients };
}

export function deleteMethod(recipe: Recipe, id: number): Recipe {
    const updatedMethods = recipe.method.filter((_method, index) => index !== id);
    return { ...recipe, method: updatedMethods };
}

export function deleteCategory(recipe: Recipe, id: number): Recipe {
    const updatedCategories = recipe.categories.filter((_category, index) => index !== id);
    return { ...recipe, categories: updatedCategories };
}
