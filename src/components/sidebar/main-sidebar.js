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

            <h2>Categories</h2>

            <p onClick={() => filterRecipes('all')}>All</p>
            <ul>
                {categories.map(category => (
                    <li key={category}>
                        <p
                            onClick={() => filterRecipes(category)}
                        >
                            {category}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}