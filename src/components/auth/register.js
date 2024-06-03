import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../../firebase";

export default function Register() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    const navigate = useNavigate();

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
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await setDoc(doc(db, "users", user.uid), {
                username: data.username,
                email: data.email,
                role: "user",
                created: new Date(),
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