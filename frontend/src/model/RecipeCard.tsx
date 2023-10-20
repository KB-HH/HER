import {Link} from "react-router-dom";
import {Recipes} from "../components/Recipes.tsx";

type RecipeCardProps = {
    recipe: Recipes
}
export default function RecipeCard(props: RecipeCardProps) {
    return (
        <div className={"recipe-card"}>
            <Link to={`/recipes/${props.recipe.id}`}>
                <h2>{props.recipe.title}</h2>
                <p>{props.recipe.description}</p>
            </Link>
        </div>
    )

}