import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";

import { RecipesContext } from "../../store/recipes-context";

import RecipeForm from "./recipe-form";

export default function EditRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const { recipes, removeRecipe } = useContext(RecipesContext);

    const navigate = useNavigate();

    useEffect(() => {
        setRecipe(recipes.find(r => r.id === id));
    }, [recipes, id]);

    const deleteRecipeHandler = () => {
        removeRecipe(id);
        navigate("/");
    }

    return (
        <div className="recipe-container">
            <h1 className="recipe-title">Edit Recipe</h1>

            <RecipeForm recipe={recipe} />

            <div className="recipe-actions">
                <button onClick={deleteRecipeHandler} className="btn btn-danger mx-2">Delete Recipe</button>
                <Link to={`/recipes/${id}`} className="btn btn-secondary mx-2">Back to Recipe</Link>
                <Link to="/" className="btn btn-secondary mx-2">Cancel</Link>
            </div>
        </div>
    );
}