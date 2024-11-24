import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const getAuthInitialState = () => {
    const authData = sessionStorage.getItem("authData");
    return authData ? JSON.parse(authData) : null
}

const getIsAuthenticatedInitialState = () => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    return isAuthenticated ? JSON.parse(isAuthenticated) : false
}

export const AuthProvider = ({ children }) => {

    const [authData, setAuthData] = useState(getAuthInitialState);

    const [isAuthenticated, setIsAuthenticated] = useState(getIsAuthenticatedInitialState);

    useEffect(() => {
        sessionStorage.setItem("authData", JSON.stringify(authData))
        sessionStorage.setItem("isAuthenticated", true)
        console.log("User loggeado", authData)
        console.log("isAuthenticated", isAuthenticated)
    }, [authData])

    return (
        <AuthContext.Provider value={{
            authData, isAuthenticated, setIsAuthenticated, setAuthData
        }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
    return useContext(AuthContext);
}