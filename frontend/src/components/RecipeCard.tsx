import {Link, useNavigate} from "react-router-dom";
import {Recipe} from "../model/Recipe.tsx";


type RecipeCardProps = {
    recipe: Recipe
    setRecipe: (recipe: Recipe) => void;
}
export default function RecipeCard(props: RecipeCardProps) {

    const navigate = useNavigate();

    function onHandleEdit (recipe: Recipe) {
        navigate(`/recipes/${props.recipe.id}`)
        props.setRecipe(recipe)
    }
    return (

        <div className="recipe-gallery">
            <Link to={`/api/recipes/${props.recipe.id}`} onClick={() => props.recipe && onHandleEdit(props.recipe)} className="no-underline">
                <div className="recipe-title">
                <h2>{props.recipe.title}</h2>
                    </div>
                <div className="recipe-card">
                <img
                    src={props.recipe.url}
                    alt={props.recipe.url}/>
                <h3>{props.recipe.description} </h3>
                </div>
            </Link>
            </div>
    )
}