import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";

import { UserContext } from "../../store/user-context";

export default function EditProfile() {
    const { user } = useContext(UserContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    const onSubmit = (data) => {
        console.log('editing profile', data);
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
                    placeholder="Current Password"
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