import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase";

export default function Login() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (data.password.length < 6) {
            setError('password', { type: 'custom', message: 'Password must be at least 6 characters' });
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
            console.error('login user error:', error);
        } finally {
            navigate('/');
        }
    };

    return (
        <div className="auth-container">
            <h1 className="auth-title">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">

                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="auth-input"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <p className="text-danger">Email is required</p>}
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="auth-input"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <p className="text-danger">Password is required</p>}
                </div>

                <button type="submit" className="auth-btn">Log In</button>

                <p className="auth-text">Already have an account? <Link to="/register" className="auth-link">Register</Link></p>
            </form>

            <Link to='/' className="auth-home-link">Return Home</Link>
        </div>
    );
}