import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../../store/user-context";

import logo from '../../assets/images/spaghetti_image.png';

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
                    <p className="main-nav-welcome-text">Welcome, <span className="main-nav-welcome-username">{user.username}</span></p>
                )}

                <NavLink to="/" className={({ isActive }) => isActive ? "main-nav-link main-nav-link-active" : "main-nav-link"}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "main-nav-link main-nav-link-active" : "main-nav-link"}>About</NavLink>

                { user ? (
                    <p className="main-nav-link" onClick={logoutHandler}>Logout</p>
                ) : (
                    <>
                        <NavLink to="/login" className={({ isActive }) => isActive ? "main-nav-link main-nav-link-active" : "main-nav-link"}>Login</NavLink>
                        <NavLink to="/register" className={({ isActive }) => isActive ? "main-nav-link main-nav-link-active" : "main-nav-link"}>Register</NavLink>
                    </>
                )}
            </div>
        </div>
    );
}