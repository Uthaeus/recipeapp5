import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";

import { RecipesContext } from "../../store/recipes-context";
import { UserContext } from "../../store/user-context";

export default function MainSidebar() {

    const { categories, filterRecipesByCategory, filterRecipesByTime } = useContext(RecipesContext);

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const { pathname } = useLocation();


    const selectCategoryHandler = (cat) => {
        if (pathname !== '/') {
            navigate('/');
        }
        filterRecipesByCategory(cat);
    };

    const selectTimeHandler = (t) => {
        if (pathname !== '/') {
            navigate('/');
        }
        filterRecipesByTime(t);
    };



    return (
        <div className="main-sidebar">
            { user && <Link to="/recipes/new" className="new-recipe-link">Add New Recipe</Link>}

            <h1 className="sidebar-title">Filter Recipes</h1>

            <div className="sidebar-container">
                <h2 className="sidebar-subtitle">By Category</h2>

                <p onClick={() => selectCategoryHandler('all')} className="sidebar-reset-btn">All</p>

                <div className="sidebar-categories-container">
                    {categories.map(category => (
                        <p key={category} className="sidebar-category" onClick={() => selectCategoryHandler(category)}>
                            {category}
                        </p>
                    ))}
                </div>

            </div>

            <div className="sidebar-container">
                <h2 className="sidebar-subtitle">By Time</h2>

                <p className="sidebar-reset-btn" onClick={() => selectTimeHandler('all')}>Reset Time Filter</p>

                <select name="time" id="time" className="form-select sidebar-select" onChange={(e) => selectTimeHandler(e.target.value)}>
                    <option value="">select time</option>
                    <option value="15">15 minutes or less</option>
                    <option value="30">30 minutes or less</option>
                    <option value="45">45 minutes or less</option>
                    <option value="60">60 minutes or less</option>
                    <option value='all'>Any time</option>
                </select>
            </div>
        </div>
    );
}