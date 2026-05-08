import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string, dryRun?: boolean) => boolean;
    logout: () => void;
}

const VALID_USER = {
    email: 'hadiafyouni@gmail.com',
    password: 'hadi12345',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });

    const login = (email: string, password: string, dryRun = false): boolean => {
        const isValid =
            email === VALID_USER.email && password === VALID_USER.password;

        if (!isValid) return false;

        // dryRun = just validate, don't actually log in yet
        if (!dryRun) {
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
        }

        return true;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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