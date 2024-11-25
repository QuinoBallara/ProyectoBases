import { useState, } from "react";
import { useAuth } from "../../contexts/authContext";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Input from "../../components/Input"
import Button from "../../components/Button"
import * as validate from "../../utils/validation"

export const Login = () => {
    const { logIn, isAuthenticated, setIsAuthenticated, setAuthData } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!validate.emailValidation(email)) {
            alert("Invalid email");
            return;
        }

        const route = `http://localhost:5001/logins/isRegistered?mail=` + email + `&password=` + password

        fetch(route, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(data => {
                if (data.isRegistered) {
                    setAuthData({ email: email, password: password })
                    setIsAuthenticated(true);
                    navigate("/");
                }
                else {
                    alert("Invalid email or password");
                }
            }
            ).catch(error => {
                console.error('Error:', error);
                alert("Error:" + error);
            });
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