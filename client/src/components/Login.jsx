import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLogin = () => {
        if (username === "user-admin" && password === "pass@123") {
            setSuccess("Login Successful!");
            setError(""); 
            setTimeout(() => navigate("/dashboard"), 1500); 
        } else {
            setError("Invalid username or password");
            setSuccess("");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl text-black font-bold text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 mb-4 text-black border border-gray-300 rounded-lg"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 text-black border border-gray-300 rounded-lg"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
