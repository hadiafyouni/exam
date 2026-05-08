import toast, { Toaster as HotToaster } from 'react-hot-toast';

export const Toaster = () => (
    <HotToaster
        position="top-right"
        toastOptions={{
            className: 'bg-white text-slate-800 shadow-lg rounded-lg border border-slate-100',
            duration: 3000,
        }}
    />
);

export const showToast = {
    success: (msg: string) => toast.success(msg, {
        iconTheme: { primary: '#16a34a', secondary: '#fff' },
    }),
    error: (msg: string) => toast.error(msg, {
        iconTheme: { primary: '#dc2626', secondary: '#fff' },
    }),
    warning: (msg: string) => toast(msg, {
        icon: '⚠️',
        style: { borderLeft: '4px solid #d97706' },
    }),
    info: (msg: string) => toast(msg, { icon: 'ℹ️' }),
};