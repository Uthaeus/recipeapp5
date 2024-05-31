import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";

import { RecipesContext } from "../../store/recipes-context";
import { UserContext } from "../../store/user-context";

export default function MainSidebar() {

    const { categories, filterRecipesByCategory, filterRecipesByTime } = useContext(RecipesContext);

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const { pathname } = useLocation();

    const [timeFilter, setTimeFilter] = useState('all');

    const [categoryFilter, setCategoryFilter] = useState('all');


    const selectCategoryHandler = (cat) => {
        if (pathname !== '/') {
            navigate('/#home-recipes');
        }
        filterRecipesByCategory(cat);
        setCategoryFilter(cat);
    };

    const selectTimeHandler = (t) => {
        if (pathname !== '/') {
            navigate('/');
        }
        filterRecipesByTime(t);
        setTimeFilter(t);
    };

    const resetTimeHandler = () => {
        if (pathname !== '/') {
            navigate('/');
        }
        filterRecipesByTime('all');
        setTimeFilter('all');
    };

    const resetAllHandler = () => {
        if (pathname !== '/') {
            navigate('/');
        }
        filterRecipesByCategory('all');
        setCategoryFilter('all');
        filterRecipesByTime('all');
        setTimeFilter('all');
    };

    return (
        <div className="main-sidebar">
            { user && <Link to="/recipes/new" className="new-recipe-link">Add New Recipe</Link>}

            <h1 className="sidebar-title">Filter Recipes</h1>

            <p onClick={resetAllHandler} className="sidebar-reset-btn">Reset All</p>

            <div className="sidebar-container">
                <h2 className="sidebar-subtitle">By Category</h2>

                <p className="sidebar-reset-btn" onClick={() => selectCategoryHandler('all')}>Reset Category Filter</p>
                {/* <p onClick={() => selectCategoryHandler('all')} className={categoryFilter === 'all' ? "sidebar-category sidebar-category-active" : "sidebar-category"}>All</p> */}

                <div className="sidebar-categories-container">
                    {categories.map(category => (
                        <p key={category} className={categoryFilter === category ? "sidebar-category sidebar-category-active" : "sidebar-category"} onClick={() => selectCategoryHandler(category)}>
                            {category}
                        </p>
                    ))}
                </div>

            </div>

            <div className="sidebar-container">
                <h2 className="sidebar-subtitle">By Time</h2>

                <p className="sidebar-reset-btn" onClick={resetTimeHandler}>Reset Time Filter</p>

                <select value={timeFilter} name="time" id="time" className="form-select sidebar-select" onChange={(e) => selectTimeHandler(e.target.value)}>
                    <option value='all'>Any time</option>
                    <option value="15">15 minutes or less</option>
                    <option value="30">30 minutes or less</option>
                    <option value="45">45 minutes or less</option>
                    <option value="60">60 minutes or less</option>
                </select>

                
            </div>
        </div>
    );
}