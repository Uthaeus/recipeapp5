import { createContext, useState, useEffect } from "react";

import { dummyRecipes } from "./dummy/dummy-recipes";

export const RecipesContext = createContext({
    recipes: [],
    categories: [],
    addRecipe: () => {},
    removeRecipe: () => {},
    updateRecipe: () => {},
    filterRecipes: () => {},
    filterRecipesByCategory: () => {},
    filterRecipesByTime: () => {},
});

function RecipesContextProvider({ children }) {

    const [recipes, setRecipes] = useState([]);
    const [allRecipes, setAllRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [recipeFilter, setRecipeFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    const [categoryFilter, setCategoryFilter] = useState('all');
    const [timeFilter, setTimeFilter] = useState('all');

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
        // if (recipeFilter === 'all') {
        //     setRecipes(allRecipes);
        // } else {
        //     setRecipes(allRecipes.filter(recipe => recipe.category === recipeFilter));
        // }

        if (categoryFilter === 'all' && timeFilter === 'all') {
            setRecipes(allRecipes);
        } else if (categoryFilter === 'all' && timeFilter !== 'all') {
            setRecipes(allRecipes.filter(recipe => +recipe.time <= +timeFilter));
        } else if (categoryFilter !== 'all' && timeFilter === 'all') {
            setRecipes(allRecipes.filter(recipe => recipe.category === categoryFilter));
        } else if (categoryFilter !== 'all' && timeFilter !== 'all') {
            setRecipes(allRecipes.filter(recipe => recipe.category === categoryFilter && +recipe.time <= +timeFilter));
        }

    }, [categoryFilter, timeFilter, allRecipes]);

    const addRecipe = (recipe) => {
        setAllRecipes([...allRecipes, recipe]);
    }

    const updateRecipe = (recipe) => {
        setAllRecipes(allRecipes.map(r => r.id === recipe.id ? recipe : r));
    }

    const removeRecipe = (id) => {
        setAllRecipes(allRecipes.filter(recipe => recipe.id !== id));
    }

    const filterRecipes = (filter) => {
        setRecipeFilter(filter);
    }

    const filterRecipesByCategory = (filter) => {
        setCategoryFilter(filter);
    }

    const filterRecipesByTime = (filter) => {
        setTimeFilter(filter);
    }

    const value = {
        recipes,
        categories,
        addRecipe,
        removeRecipe,
        filterRecipes,
        filterRecipesByCategory,
        filterRecipesByTime
    }

    return (
        <RecipesContext.Provider value={value}>
            {!loading && children}
        </RecipesContext.Provider>
    );
}

export default RecipesContextProvider