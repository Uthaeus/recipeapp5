import { NavLink } from "react-router-dom";

import logo from '../../assets/images/spaghetti_image.png';

export default function MainNavigation() {
    return (
        <div className="main-navigation">
            <div className="main-navigation-left">
                <img src={logo} alt="logo" height="50px" />
            </div>

            <div className="main-navigation-right">
                <NavLink to="/" className={({ isActive }) => isActive ? "main-nav-link main-nav-link-active" : "main-nav-link"}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "main-nav-link main-nav-link-active" : "main-nav-link"}>About</NavLink>
            </div>
        </div>
    );
}