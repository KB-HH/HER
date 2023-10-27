import {Link, useNavigate} from "react-router-dom";
import {Recipe} from "../model/Recipe.tsx";

type RecipeCardProps = {
    recipe: Recipe
    setRecipe: (recipe: Recipe) => void;
}
export default function RecipeCard(props: RecipeCardProps) {

    const navigate = useNavigate();

    function onHandleEdit (recipe: Recipe) {
        navigate(`/recipes/${props.recipe.id}/edit`)
        props.setRecipe(recipe)
    }
    return (
        <div className="list">
            <Link to={`/api/recipes/${props.recipe.id}/edit`} onClick={() => props.recipe && onHandleEdit(props.recipe)}>
                <h5>{props.recipe.title}</h5>
                <h5>{props.recipe.description}</h5>
                <p>{props.recipe.cookingtime}</p>
            </Link>
            </div>
    )
}