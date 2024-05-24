import { Link } from "react-router-dom";

import image from '../../assets/images/spaghetti_image.png';

export default function RecipeItem({ recipe }) {

    return (
        <div className="recipe-item">
            <img src={image} alt="spaghetti" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', objectPosition: 'center' }} />
            <Link to={`/recipes/${recipe.id}`} className="recipe-item-title">{recipe.name}</Link>
            <p className="recipe-item-description">{recipe.description}</p>
        </div>
    );
}