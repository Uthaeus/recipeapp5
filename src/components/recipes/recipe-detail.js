import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { RecipesContext } from "../../store/recipes-context";
import { UserContext } from "../../store/user-context";

import image from '../../assets/images/spaghetti_image.png';

export default function RecipeDetail() {

    const { id } = useParams();
    const { recipes } = useContext(RecipesContext);
    const { user, isAdmin } = useContext(UserContext);
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        setRecipe(recipes.find(r => r.id === id));
    }, [recipes, id]);

    return (
        <div className="recipe-detail">

            <div className="recipe-detail-header">
                <h1 className="recipe-detail-title">{recipe?.name}</h1>
                <p className="recipe-detail-description">{recipe?.description}</p>

                <div className="recipe-detail-header-details">
                    <p className="recipe-detail-author-wrapper">Submitted By <span className="recipe-detail-author">{recipe?.author}</span></p>
                    <p className="recipe-detail-date-wrapper">posted <span className="recipe-detail-date">{recipe?.date}</span></p>
                </div>

                {(user.id === recipe?.uid || isAdmin) && (
                    <Link to={`/recipes/${id}/edit`} className="recipe-detail-edit-link">Edit</Link>
                )}
            </div>

            <p>Time: {recipe?.time}</p>
            <p>Category: {recipe?.category}</p>

            <h2>Ingredients</h2>
            <ul>
                {recipe?.ingredients.map(ingredient => (
                    <li key={ingredient.ingredient}>
                        {ingredient.ingredient} - {ingredient.quantity}
                    </li>
                ))}
            </ul>

            <h2>Steps</h2>
            <ol>
                {recipe?.steps.map((step, index) => (
                    <li key={index}>
                        {step}
                    </li>
                ))}
            </ol>
        </div>
    );
}