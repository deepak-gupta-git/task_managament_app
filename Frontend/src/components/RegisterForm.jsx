import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerUrl = "http://localhost:5000/api/auth/register";

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        navigate("/dashboard");
        toast.success("Registered Successfully");
        setUser({ username: "", email: "", password: "" });
      } else {
        toast.error("Registration Failed");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Welcome To Task Management App</h2>


        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInput}
            className="w-full p-2 border rounded"
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            className="w-full p-2 border rounded"
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInput}
            className="w-full p-2 border rounded"
            required
            autoComplete="off"
          />
        </div>

      

        <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">
          Register
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
