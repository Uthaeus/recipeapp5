import { Link } from "react-router-dom";

import RecipeForm from "./recipe-form";

export default function NewRecipe() {
    return (
        <div className="recipe-container">
            <h1 className="recipe-title">New Recipe</h1>

            <RecipeForm />

            <div className="recipe-actions">
                <Link to="/" className="btn btn-secondary mx-2">Cancel</Link>
            </div>
        </div>
    );
}