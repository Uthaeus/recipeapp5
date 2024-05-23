import { createContext, useState, useEffect } from "react";

import { recipes } from "./dummy/dummy-recipes";

export const RecipesContext = createContext({
    recipes: [],
    addRecipe: () => {},
    removeRecipe: () => {}
});

function RecipesContextProvider({ children }) {

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setRecipes(recipes);
        setLoading(false);
    }, []);

    const addRecipe = (recipe) => {
        setRecipes([...recipes, recipe]);
    }

    const removeRecipe = (id) => {
        setRecipes(recipes.filter(recipe => recipe.id !== id));
    }

    const value = {
        recipes,
        addRecipe,
        removeRecipe
    }

    return (
        <RecipesContext.Provider value={value}>
            {!loading && children}
        </RecipesContext.Provider>
    );
}

export default RecipesContextProvider