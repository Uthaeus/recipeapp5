import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { auth, db, storage } from "../../firebase";

import defaultAvatar from '../../assets/images/guest-icon-add.png';

export default function Register() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const [enteredAvatar,  setEnteredAvatar] = useState(null);

    const navigate = useNavigate();
    const avatar = enteredAvatar?.url ? enteredAvatar.url : defaultAvatar;

    const avatarChangeHandler = (event) => {
        const file = event.target.files[0];
        // create url object
        const url = URL.createObjectURL(file);
        setEnteredAvatar({ url, file });
    }

    const resetAvatarHandler = () => {
        setEnteredAvatar(null);
    }

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', { type: 'custom', message: 'Passwords do not match' });
            return;
        }
        if (data.password.length < 6) {
            setError('password', { type: 'custom', message: 'Password must be at least 6 characters' });
            return;
        }

        try {
            let avatarUrl = null;
            let avatarFileName = null;

            if (enteredAvatar?.url) {
                avatarFileName = enteredAvatar.file.name + Date.now();
                const avatarRef = ref(storage, `avatars/${avatarFileName}`);
                await uploadBytes(avatarRef, enteredAvatar.file);
                avatarUrl = await getDownloadURL(avatarRef);
            }

            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await setDoc(doc(db, "users", user.uid), {
                username: data.username,
                email: data.email,
                role: "user",
                created: new Date(),
                avatar: {
                    url: avatarUrl,
                    fileName: avatarFileName
                }
            });
        } catch (error) {
            console.error('register user error:', error);
        } finally {
            navigate('/');
        }
    };

    return (
        <div className="auth-container">
            <h1 className="auth-title">Register</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <div className="row">
                    <div className="col-9">
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

                    </div>
                    <div className="col-3">
                        <div className="auth-form-avatar-input-container" onClick={() => document.getElementById("avatar-input").click()}>
                            <img
                                src={avatar}
                                alt="avatar"
                                className="auth-form-avatar"
                            />
                            
                            <input
                                type="file"
                                id="avatar-input"
                                className="d-none"
                                onChange={avatarChangeHandler}
                            />
                        </div>

                        <p className="reset-avatar-btn" onClick={resetAvatarHandler}>Reset Avatar</p>
                    </div>
                </div>

                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="auth-input"
                    {...register("password", { required: true })}
                />
                {errors.password && <p className="text-danger">Password is required</p>}

                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className="auth-input"
                    {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword && <p className="text-danger">Confirm Password is required</p>}

                <button type="submit" className="auth-btn">Register</button>

                <p className="auth-text">Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
            </form>

            <Link to='/' className="auth-home-link">Return Home</Link>
        </div>
    );
}