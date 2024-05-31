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

                {(user.id === recipe?.uid || isAdmin) && (
                    <Link to={`/recipes/${id}/edit`} className="recipe-detail-edit-link">Edit Recipe</Link>
                )}
            </div>

            <div className="recipe-detail-image-wrapper">
                <img src={image} alt="spaghetti" style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', objectPosition: 'center' }} />
            </div>

            <div className="recipe-detail-header-details">
                <p className="recipe-detail-author-wrapper">Submitted By <span className="recipe-detail-author mx-2">{recipe?.author}</span></p>
                <p className="recipe-detail-date-wrapper">posted <span className="recipe-detail-date mx-2">{recipe?.date}</span></p>
            </div>

            <div className="recipe-detail-body">
                <div className="recipe-detail-body-detail-wrapper">
                    <p className="recipe-detail-body-detail">Category: <span className="recipe-detail-category">{recipe?.category}</span></p>

                    <p className="recipe-detail-body-detail">Approx. Time: <span className="recipe-detail-time">{recipe?.time}</span> minutes</p>
                </div>

                <div className="row my-4">
                    <div className="col-md-8 recipe-detail-steps-container">
                        <h2 className="recipe-detail-subtitle">Steps</h2>
                        
                        {recipe?.steps.map((step, index) => (
                            <p className="recipe-detail-step" key={index}>
                                Step {index + 1}.  <br />
                                <span className="mx-2">{step}</span>
                            </p>
                        ))}
                    </div>

                    <div className="col-md-4 recipe-detail-ingredients-container">
                        <h2 className="recipe-detail-subtitle">Ingredients</h2>
                        
                        {recipe?.ingredients.map(ingredient => (
                            <div className="recipe-detail-ingredient-item" key={ingredient.ingredient}>
                                <p className="recipe-detail-ingredient">{ingredient.ingredient}</p>
                                <p className="recipe-detail-ingredient-amount">{ingredient.quantity}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Link to="/" className="recipe-detail-back-btn">Back to Recipes</Link>
        </div>
    );
}