import { useContext } from "react";

import { UserContext } from "../store/user-context";
import { RecipesContext } from "../store/recipes-context";

import RecipeItem from "../components/recipes/recipe-item";

export default function Home() {
    const { user, isAdmin } = useContext(UserContext);
    const { recipes } = useContext(RecipesContext);

    return (
        <div>
            <h1>Home</h1>

            {user && (
                <>
                    <p>Welcome {user.name}</p>
                    <p>You are {isAdmin ? "an admin" : "a user"}</p>
                </>
            )}

            <div className="home-recipes-container">
                {recipes.map(recipe => (
                    <RecipeItem key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}