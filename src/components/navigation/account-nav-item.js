import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import { UserContext } from "../../store/user-context";

import avatar from '../../assets/images/overtime_image2_tn.jpg';

export default function AccountNavItem() {
    const { user, logout } = useContext(UserContext);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMouseOverDropdown, setIsMouseOverDropdown] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const delay = 900; // Adjust the delay time as needed (in milliseconds)
        let timeoutId;

        if (isDropdownOpen) {
            timeoutId = setTimeout(() => {
                closeDropdown();
            }, delay);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isDropdownOpen, isMouseOverDropdown]);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const closeDropdown = () => {
        if (!isMouseOverDropdown) {
            setIsDropdownOpen(false);
        }
    };

    const openDropdown = () => {
        setIsDropdownOpen(true);
        setIsMouseOverDropdown(true);
    };

    const logoutHandler = () => {
        console.log('logging out');
        navigate('/');
        logout();
    };

    return (
        <div className="account-nav-item" onClick={toggleDropdown} onMouseLeave={() => closeDropdown()} onMouseOver={openDropdown}>
            <img src={avatar} alt="avatar" className="account-nav-item__avatar" />
            <p className="account-nav-item__username">{user.username}</p>

            {isDropdownOpen && (
                <div className={`account-nav-item__dropdown`} onMouseLeave={() => setIsMouseOverDropdown(false)} onMouseOver={() => setIsMouseOverDropdown(true)}>
                    <NavLink to="/edit-profile" className="account-nav-item__dropdown-item">Edit Profile</NavLink>
                    <p className="account-nav-item__dropdown-item" onClick={logoutHandler}>Logout</p>
                </div>
            )}
        </div>
    );
}