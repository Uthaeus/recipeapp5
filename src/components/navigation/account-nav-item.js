import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import { UserContext } from "../../store/user-context";

import avatar from '../../assets/images/overtime_image2_tn.jpg';

export default function AccountNavItem() {
    const { user, logout } = useContext(UserContext);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const openDropdown = () => {
        setIsDropdownOpen(true);
    };

    const logoutHandler = () => {
        console.log('logging out');
        navigate('/');
        logout();
    };

    return (
        <div className="account-nav-item" onClick={toggleDropdown} onMouseLeave={closeDropdown} onMouseOver={openDropdown}>
            <img src={avatar} alt="avatar" className="account-nav-item__avatar" />
            <p className="account-nav-item__username">{user.username}</p>

            {isDropdownOpen && (
                <div className="account-nav-item__dropdown">
                    <NavLink to="/edit-profile" className="account-nav-item__dropdown-item">Edit Profile</NavLink>
                    <p className="account-nav-item__dropdown-item" onClick={logoutHandler}>Logout</p>
                </div>
            )}
        </div>
    );
}