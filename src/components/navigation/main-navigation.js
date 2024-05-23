import { NavLink } from "react-router-dom";

export default function MainNavigation() {
    return (
        <div className="main-navigation">
            <div className="main-navigation-left">
                logo here
            </div>

            <div className="main-navigation-right">
                <NavLink to="/" className={({ isActive }) => isActive ? "main-nav-link main-nav-link-active" : "main-nav-link"}>Home</NavLink>
            </div>
        </div>
    );
}