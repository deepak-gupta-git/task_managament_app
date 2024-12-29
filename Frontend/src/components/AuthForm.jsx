import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthForm = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const loginUrl = "https://task-managament-app.onrender.com/api/auth/login"; // Correct API endpoint for login

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(loginUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json(); // Ensure you parse the response

            if (response.ok) {
                // If login is successful, store the token (if available)
                localStorage.setItem('token', res_data.token);
                setUser({ email: "", password: "" });
                toast.success("Login Successful");
                navigate("/dashboard");
            } else {
                toast.error(res_data.message || "Invalid Email or Password");
                console.log(response); // Log the error details from the backend
            }
        } catch (error) {
            console.log(error); // Log any error that occurs during the request
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={handleInput}
                        className="w-full p-2 border rounded"
                        required
                        name="email"
                        autoComplete="off"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Password</label>
                    <input
                        type="password"
                        value={user.password}
                        onChange={handleInput}
                        className="w-full p-2 border rounded"
                        required
                        name="password"
                        autoComplete="off"
                    />
                </div>
                <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">
                    Login
                </button>
                <p className="mt-4 text-sm text-center">
                    Don't have an account? <a href="/register" className="text-blue-500">Register</a>
                </p>
            </form>
        </div>
    );
};

export default AuthForm;
