import { useState, } from "react";
import { useAuth } from "../../contexts/authContext";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Input from "../../components/Input"
import Button from "../../components/Button"

export const Login = () => {
    const { logIn, isAuthenticated, setIsAuthenticated, setAuthData } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsAuthenticated(true);
        navigate("/");
    };

    return (
        <div className="login-card">
            <div className="login-header">
                <h1>Login</h1>
            </div>
            <div className="login-body">
                <Input type="email" onChange={(e) => setEmail(e.target.value)} value={email} label="Email" name="Email" />
                <Input type="password" onChange={(e) => setPassword(e.target.value)} value={password} label="Password" name="Password" />
                <Button onClick={handleLogin} label="Login" className="login-button" />
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}