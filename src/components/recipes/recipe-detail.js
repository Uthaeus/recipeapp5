import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";

import { RecipesContext } from "../../store/recipes-context";
import { UserContext } from "../../store/user-context";

export default function RecipeDetail() {

    const { id } = useParams();
    const { recipes } = useContext(RecipesContext);
    const { user, isAdmin } = useContext(UserContext);
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        setRecipe(recipes.find(r => +r.id === +id));
    }, [recipes, id]);

    return (
        <div className="recipe-detail">

            <h1>{recipe?.title}</h1>
            <p>{recipe?.description}</p>

            <p>Author: {recipe?.author}</p>
            <p>Created: {recipe?.date}</p>

            <p>Time: {recipe?.time}</p>
            <p>Category: {recipe?.category}</p>

            <h2>Ingredients</h2>
            <ul>
                {recipe?.ingredients.map(ingredient => (
                    <li key={ingredient.ingredient}>
                        {ingredient.ingredient} - {ingredient.ingredientAmount}
                    </li>
                ))}
            </ul>

            <h2>Steps</h2>
            <ol>
                {recipe?.steps.map(step => (
                    <li key={step.step}>
                        {step.step}
                    </li>
                ))}
            </ol>
        </div>
    );
}