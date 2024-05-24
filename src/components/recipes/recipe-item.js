
export default function RecipeItem({ recipe }) {

    return (
        <div className="recipe-item">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
        </div>
    );
}