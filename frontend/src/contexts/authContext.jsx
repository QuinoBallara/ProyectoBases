import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState();

    const [authData, setAuthData] = useState({
        id: 1, // remove if necessary
        mail: 'test@test.com',
        password: 'test',
    });

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