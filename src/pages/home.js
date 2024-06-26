import { useContext } from "react";

import { UserContext } from "../store/user-context";
import { RecipesContext } from "../store/recipes-context";

import RecipeItem from "../components/recipes/recipe-item";

export default function Home() {
    const { user, isAdmin } = useContext(UserContext);
    const { recipes } = useContext(RecipesContext);

    return (
        <div className="home">
            <div className="home-header">
                <h1 className="home-title">Steve's Recipe Page</h1>
                <p className="home-subtitle">this is a subtitle for the home page</p>
            </div>

            <div className="home-divider" />

            <div id='home-recipes' className="home-recipes-container">
                {recipes.map(recipe => (
                    <RecipeItem key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}