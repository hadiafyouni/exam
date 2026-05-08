import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthLayout() {
    const { isAuthenticated } = useAuth();

    // If they are already logged in, kick them straight to the dashboard
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-dark">
            {/* The individual login/signup cards will render inside this Outlet */}
            <Outlet />
        </div>
    );
}