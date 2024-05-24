import { Link } from "react-router-dom";

export default function MainSidebar() {
    return (
        <div className="main-sidebar">
            <Link to="/recipes/new" className="new-recipe-link">Add New Recipe</Link>
            <ul>
                <li>Home</li>
                <li>About</li>
            </ul>
        </div>
    );
}