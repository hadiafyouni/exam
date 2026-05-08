import { Outlet } from 'react-router-dom';
import Header from '@/pages/Header';

export default function DashboardLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            {/* The flex-1 ensures it fills space, but py-8 gives it just a normal top/bottom padding */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
}