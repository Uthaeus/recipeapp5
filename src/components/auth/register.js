import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
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