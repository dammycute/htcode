'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage on mount
        const auth = localStorage.getItem('htcode_auth') === 'true';
        setIsAuthenticated(auth);
        setLoading(false);
    }, []);

    const login = (username, password) => {
        if (username === 'htcode' && password === '3490') {
            localStorage.setItem('htcode_auth', 'true');
            localStorage.setItem('htcode_user', 'htcode');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('htcode_auth');
        localStorage.removeItem('htcode_user');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
