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

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <p className="error">Email is required</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        {...register("username", { required: true })}
                    />
                    {errors.username && <p className="error">Username is required</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        {...register("password", { required: true })}
                    />
                    {errors.password && <p className="error">Password is required</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", { required: true })}
                    />
                    {errors.confirmPassword && <p className="error">Confirm Password is required</p>}
                </div>

                <button type="submit" className="btn btn-primary">Register</button>

                <p className="auth-text">Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
            </form>
        </div>
    );
}