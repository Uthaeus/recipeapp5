import { createContext, useState, useEffect } from "react";

import { dummyRecipes } from "./dummy/dummy-recipes";

export const RecipesContext = createContext({
    recipes: [],
    categories: [],
    addRecipe: () => {},
    removeRecipe: () => {},
    filterRecipes: () => {}
});

function RecipesContextProvider({ children }) {

    const [recipes, setRecipes] = useState([]);
    const [allRecipes, setAllRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [recipeFilter, setRecipeFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const categoriesList = [];
        const allRecipesList = [];
        dummyRecipes.forEach(recipe => {
            if (!categoriesList.includes(recipe.category)) {
                categoriesList.push(recipe.category);
            }
            allRecipesList.push(recipe);
        });
        setCategories(categoriesList);
        setAllRecipes(allRecipesList);

        setLoading(false);
    }, []);


    useEffect(() => {
        if (recipeFilter === 'all') {
            setRecipes(allRecipes);
        } else {
            setRecipes(allRecipes.filter(recipe => recipe.category === recipeFilter));
        }

    }, [recipeFilter, allRecipes]);

    const addRecipe = (recipe) => {
        setRecipes([...recipes, recipe]);
    }

    const removeRecipe = (id) => {
        setRecipes(recipes.filter(recipe => recipe.id !== id));
    }

    const filterRecipes = (filter) => {
        setRecipeFilter(filter);
    }

    const value = {
        recipes,
        categories,
        addRecipe,
        removeRecipe,
        filterRecipes,
    }

    return (
        <RecipesContext.Provider value={value}>
            {!loading && children}
        </RecipesContext.Provider>
    );
}

export default RecipesContextProvider