import { Link } from "react-router-dom";

export default function RecipeItem({ recipe }) {

    return (
        <div className="recipe-item">
            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
            <p>{recipe.description}</p>
        </div>
    );
}