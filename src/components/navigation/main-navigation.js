import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../store/user-context";

import logo from '../../assets/images/spaghetti_image.png';
import AccountNavItem from "./account-nav-item";

export default function MainNavigation() {
    const { user, logout } = useContext(UserContext);

    const navigate = useNavigate();

    const logoutHandler = () => {
        console.log('logging out');
        navigate('/');
        logout();
    };

    return (
        <div className="main-navigation">
            <div className="main-navigation-left">
                <img src={logo} alt="logo" height="50px" />
            </div>

            <div className="main-navigation-right">
                { user && (
                    <p className="main-nav-welcome-text">logged in as <span className="main-nav-welcome-username">{user.username}</span></p>
                )}

                <NavLink to="/" className={({ isActive }) => isActive ? "main-nav-link main-nav-link-active" : "main-nav-link"}>Recipes</NavLink>

                { user ? (
                    <>  
                        <NavLink to="/edit-profile" className={({ isActive }) => isActive ? "main-nav-link main-nav-link-active" : "main-nav-link"}>Edit Profile</NavLink>
                        <p className="main-nav-link" onClick={logoutHandler}>Logout</p>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className={({ isActive }) => isActive ? "main-nav-link main-nav-link-active" : "main-nav-link"}>Login</NavLink>
                        <NavLink to="/register" className={({ isActive }) => isActive ? "main-nav-link main-nav-link-active" : "main-nav-link"}>Register</NavLink>
                    </>
                )}

                { user && <AccountNavItem /> }
            </div>
        </div>
    );
}