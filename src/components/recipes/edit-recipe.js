import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router";

import { RecipesContext } from "../../store/recipes-context";

import RecipeForm from "./recipe-form";

export default function EditRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const { recipes } = useContext(RecipesContext);

    useEffect(() => {
        setRecipe(recipes.find(r => r.id === id));
    }, [recipes, id]);

    return (
        <div>
            <h1>Edit Recipe</h1>

            <RecipeForm recipe={recipe} />
        </div>
    );
}