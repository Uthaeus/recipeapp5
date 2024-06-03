import { createContext, useState, useEffect } from "react";

import { getDocs, query, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

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

        const getRecipes = async () => {
            const categoryFilterList = [];

            const recipesQuery = query(collection(db, 'recipes'));
            const recipesSnapshot = await getDocs(recipesQuery);
            const recipesList = recipesSnapshot.docs.map(doc => {
                if (!categoryFilterList.includes(doc.data().category)) {
                    categoryFilterList.push(doc.data().category);
                }
                return { id: doc.id, ...doc.data() }
            });
            setRecipes(recipesList);
            setAllRecipes(recipesList);

            setCategories(categoryFilterList);
            setLoading(false);
        };

        getRecipes();
    }, [ ]);


    useEffect(() => {

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
        if (!categories.includes(recipe.category)) {
            setCategories([...categories, recipe.category]);
        }
    }

    const updateRecipe = (recipe) => {
        setAllRecipes(allRecipes.map(r => r.id === recipe.id ? recipe : r));
        if (!categories.includes(recipe.category)) {
            setCategories([...categories, recipe.category]);
        }
    }

    const removeRecipe = (id) => {
        const docRef = doc(db, 'recipes', id);
        deleteDoc(docRef);
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
        updateRecipe,
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