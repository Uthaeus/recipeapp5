import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
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

                <button type="submit" className="btn btn-primary">Log In</button>

                <p className="auth-text">Already have an account? <Link to="/register" className="auth-link">Register</Link></p>
            </form>
        </div>
    );
}