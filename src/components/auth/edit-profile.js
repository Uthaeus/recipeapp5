import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { updateDoc } from "firebase/firestore";
import { updateProfile, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";

import { auth, db } from "../../firebase";

import { UserContext } from "../../store/user-context";

export default function EditProfile() {
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm();

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    const reauthenticateUser = async (password) => {
        const credential = EmailAuthProvider.credential(user.email, password);
        try {
            await reauthenticateWithCredential(auth.currentUser, credential);

            return true;
        } catch (error) {
            console.log('reauthenticate user error:', error);
            setError('password', { type: 'custom', message: 'Incorrect password' });

            return false;
        }
    }

    const onSubmit = async (data) => {
        console.log('editing profile', data);

        try {
            const newPasswordAuthorized = await reauthenticateUser(data.password);

            if (!newPasswordAuthorized) {
                setError('password', { type: 'custom', message: 'Incorrect password' });

                return;
            }

            if (data.newPassword !== "") {
                if (data.newPassword !== data.confirmNewPassword) {
                    setError('confirmNewPassword', { type: 'custom', message: 'Passwords do not match' });
                    return;
                }
                if (data.newPassword.length < 6) {
                    setError('newPassword', { type: 'custom', message: 'Password must be at least 6 characters' });
                    return;
                }

                await updatePassword(auth.currentUser, data.newPassword);
            }

            await updateProfile(auth.currentUser, {
                displayName: data.username,
                email: data.email
            });

            await updateDoc(doc(db, "users", user.id), {
                username: data.username,
                email: data.email
            });

            console.log('end of edit profile submit');

        } catch (error) {
            console.error('edit profile error:', error);
        } finally {
            navigate('/');
        }
        
    };

    return (
        <div className="auth-container">
            <h1 className="auth-title">Edit Profile</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="auth-input"
                    autoFocus={true}
                    {...register("email", { required: true })}
                />
                {errors.email && <p className="text-danger">Email is required</p>}

                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="auth-input"
                    {...register("username", { required: true })}
                />
                {errors.username && <p className="text-danger">Username is required</p>}

                <input
                    type="password"
                    id="newPassword"
                    placeholder="New Password (leave blank if you don't want to change it)"
                    className="auth-input"
                    {...register("password")}
                />

                <input
                    type="password"
                    id="confirmNewPassword"
                    placeholder="Confirm New Password"
                    className="auth-input"
                    {...register("confirmPassword")}
                />

                <input 
                    type="password"
                    id="password"
                    placeholder="Enter Current Password to Update Profile"
                    className="auth-input"
                    {...register("currentPassword", { required: true })}
                />
                {errors.password && <p className="text-danger">Current Password is required</p>}

                <button type="submit" className="auth-btn">Update Profile</button>
            </form>

            <Link to='/' className="auth-home-link">Return Home</Link>
        </div>
    )
}