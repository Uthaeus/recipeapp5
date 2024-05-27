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
                    <p className="recipe-detail-author-wrapper">Submitted By <span className="recipe-detail-author mx-2">{recipe?.author}</span></p>
                    <p className="recipe-detail-date-wrapper">posted <span className="recipe-detail-date mx-2">{recipe?.date}</span></p>
                </div>

                {(user.id === recipe?.uid || isAdmin) && (
                    <Link to={`/recipes/${id}/edit`} className="recipe-detail-edit-link">Edit Recipe</Link>
                )}
            </div>

            <div className="recipe-detail-image-wrapper">
                <img src={image} alt="spaghetti" style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', objectPosition: 'center' }} />
            </div>

            <div className="recipe-detail-body">
                <div className="recipe-detail-body-detail-wrapper">
                    <p className="recipe-detail-body-detail">Category: <span className="recipe-detail-category">{recipe?.category}</span></p>

                    <p className="recipe-detail-body-detail">Approx. Time: <span className="recipe-detail-time">{recipe?.time}</span> minutes</p>
                </div>

                <div className="row my-4">
                    <div className="col-md-8">
                        <h2>Steps</h2>
                        <ol>
                            {recipe?.steps.map((step, index) => (
                                <li key={index}>
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="col-md-4">
                        <h2>Ingredients</h2>
                        <ul>
                            {recipe?.ingredients.map(ingredient => (
                                <li key={ingredient.ingredient}>
                                    {ingredient.ingredient} - {ingredient.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="recipe-detail-actions">
                <Link to="/" className="btn btn-primary">Back to Recipes</Link>
            </div>
        </div>
    );
}