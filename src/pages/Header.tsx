import { Link, useNavigate } from 'react-router-dom';
import { Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        // Notice there is NO <div className="min-h-screen..."> wrapping this!
        <header className="sticky top-0 z-40 w-full bg-dark border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/dashboard"
                    className="text-xl font-bold tracking-tight text-primary hover:brightness-110 transition-all"
                >
                    StarAdmin
                </Link>

                <div className="flex items-center gap-2">
                    {/* Settings & Profile */}
                    <Link to="/settings" className="p-2 rounded-full transition-colors text-white/50 hover:text-primary hover:bg-primary/10">
                        <Settings size={20} />
                    </Link>
                    <Link to="/profile" className="p-2 rounded-full transition-colors text-white/50 hover:text-primary hover:bg-primary/10">
                        <User size={20} />
                    </Link>

                    <div className="w-px h-6 mx-1 bg-white/10" />

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                    >
                        <LogOut size={15} />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}