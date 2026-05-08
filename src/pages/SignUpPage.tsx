import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function SignUpPage() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) return <Navigate to="/dashboard" replace />;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-dark">
            <div className="p-8 rounded-2xl w-full max-w-md shadow-2xl bg-white/5 border border-white/10 text-center">
                <div className="w-14 h-14 bg-warning/15 rounded-full flex items-center justify-center mx-auto mb-4 text-warning">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold mb-2 text-primary">Registration Disabled</h1>
                <p className="text-sm mb-6 text-white/50">
                    This panel uses a static account. Public registration is not available.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-2.5 rounded-lg font-semibold text-sm transition-all bg-primary text-dark hover:brightness-95"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );
}