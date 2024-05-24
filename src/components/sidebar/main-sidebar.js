import { Link } from "react-router-dom";
import { useContext } from "react";

import { RecipesContext } from "../../store/recipes-context";
import { UserContext } from "../../store/user-context";

export default function MainSidebar() {

    const { categories, filterRecipes } = useContext(RecipesContext);

    const { user } = useContext(UserContext);

    return (
        <div className="main-sidebar">
            { user && <Link to="/recipes/new" className="new-recipe-link">Add New Recipe</Link>}

            <h1 className="sidebar-title">Filter Recipes</h1>

            <div className="sidebar-container">
                <h2 className="sidebar-subtitle">By Category</h2>

                <p onClick={() => filterRecipes('all')} className="sidebar-reset-btn">All</p>

                <div className="sidebar-categories-container">
                    {categories.map(category => (
                        <p key={category} className="sidebar-category" onClick={() => filterRecipes(category)}>
                            {category}
                        </p>
                    ))}
                </div>

            </div>

            <div className="sidebar-container">
                <h2 className="sidebar-subtitle">By Time</h2>

                <p className="sidebar-reset-btn">Reset Time Filter</p>

                <select name="time" id="time" className="form-select sidebar-select">
                    <option value="">select time</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                </select>
            </div>
        </div>
    );
}