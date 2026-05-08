import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    if (isAuthenticated) return <Navigate to="/dashboard" replace />;

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsDialogOpen(true);
    };

    const handleConfirm = () => {
        setIsDialogOpen(false);
        const success = login(email, password, true); // Assuming your context takes these args now based on your code

        if (!success) {
            setError('Invalid email or password.');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            login(email, password);
            navigate('/dashboard');
        }, 3000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-dark">

            {/* Spinner overlay — sits on top but keeps the form visible behind */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-dark/75 backdrop-blur-sm">
                    <div className="w-14 h-14 rounded-full border-4 border-primary/25 border-t-primary animate-[spin_0.9s_linear_infinite]" />
                    <p className="text-sm font-medium text-primary">Signing you in…</p>
                </div>
            )}

            <div className="p-8 rounded-2xl w-full max-w-md shadow-2xl bg-white/5 border border-white/10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-1 text-primary">Welcome Back</h1>
                    <p className="text-sm text-white/50">Sign in to your admin panel</p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-white/70">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="hadiafyouni@gmail.com"
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all bg-white/5 border border-white/10 text-white focus:border-primary placeholder:text-white/30"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-white/70">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all bg-white/5 border border-white/10 text-white focus:border-primary placeholder:text-white/30"
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg text-sm font-medium bg-red-500/15 border border-red-500/30 text-red-300">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all bg-primary text-dark hover:brightness-95"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-white/40">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold hover:underline text-primary">
                        Sign up
                    </Link>
                </p>
            </div>

            <ConfirmDialog
                isOpen={isDialogOpen}
                title="Are you sure you want to log in?"
                onConfirm={handleConfirm}
                onCancel={() => setIsDialogOpen(false)}
            />
        </div>
    );
}