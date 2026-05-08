import { useState } from 'react';
import { showToast } from '@/components/Toast';
import { Camera, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react';

export default function ProfilePage() {
    const [form, setForm] = useState({
        firstName: 'Hadi',
        lastName: 'Afyouni',
        email: 'hadiafyouni@gmail.com',
        phone: '+961 70 000 000',
        location: 'Beirut, Lebanon',
        role: 'Administrator',
        department: 'Engineering',
        bio: 'Full-stack developer and admin panel enthusiast. Passionate about clean UI and great developer experience.',
        joinDate: 'January 2024',
    });

    const set = (key: string, val: string) =>
        setForm((prev) => ({ ...prev, [key]: val }));

    const handleUpdate = () => showToast.success('Profile updated successfully!');

    // Reusable Tailwind class strings to keep the JSX clean
    const inputClasses = "w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-dark outline-none bg-slate-50 focus:border-primary transition-colors";
    const labelClasses = "block text-[13px] font-medium text-slate-500 mb-1.5 flex items-center gap-1.5";
    const sectionClasses = "rounded-xl p-6 bg-white border border-slate-200 shadow-sm";

    return (
        <div className="max-w-3xl mx-auto space-y-6">

            <div>
                <h1 className="text-2xl font-bold text-dark">My Profile</h1>
                <p className="text-sm mt-1 text-slate-400">Manage your personal information</p>
            </div>

            {/* Avatar card */}
            <div className={`${sectionClasses} flex items-center gap-6`}>
                <div className="relative">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold select-none bg-dark text-primary">
                        {form.firstName[0]}{form.lastName[0]}
                    </div>
                    <button
                        className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center shadow bg-primary text-dark hover:brightness-95 transition-all"
                        onClick={() => showToast.info('Photo upload coming soon!')}
                    >
                        <Camera size={13} />
                    </button>
                </div>
                <div>
                    <p className="text-lg font-bold text-dark">
                        {form.firstName} {form.lastName}
                    </p>
                    <p className="text-sm text-slate-400">{form.role} · {form.department}</p>
                    <div className="flex items-center gap-1 mt-1 text-slate-400">
                        <Calendar size={12} />
                        <span className="text-xs">Joined {form.joinDate}</span>
                    </div>
                </div>
                <div className="ml-auto">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success border border-success/30">
                        Active
                    </span>
                </div>
            </div>

            {/* Personal info */}
            <div className={`${sectionClasses} space-y-4`}>
                <h2 className="text-base font-semibold mb-2 text-dark">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClasses}>First Name</label>
                        <input type="text" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} className={inputClasses} />
                    </div>
                    <div>
                        <label className={labelClasses}>Last Name</label>
                        <input type="text" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} className={inputClasses} />
                    </div>
                </div>
                <div>
                    <label className={labelClasses}><Mail size={13} /> Email</label>
                    <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputClasses} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClasses}><Phone size={13} /> Phone</label>
                        <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputClasses} />
                    </div>
                    <div>
                        <label className={labelClasses}><MapPin size={13} /> Location</label>
                        <input type="text" value={form.location} onChange={(e) => set('location', e.target.value)} className={inputClasses} />
                    </div>
                </div>
                <div>
                    <label className={labelClasses}>Bio</label>
                    <textarea value={form.bio} onChange={(e) => set('bio', e.target.value)} rows={3} className={`${inputClasses} resize-y`} />
                </div>
            </div>

            {/* Work info */}
            <div className={`${sectionClasses} space-y-4`}>
                <h2 className="text-base font-semibold mb-2 text-dark">Work Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClasses}><Briefcase size={13} /> Role</label>
                        <input type="text" value={form.role} onChange={(e) => set('role', e.target.value)} className={inputClasses} />
                    </div>
                    <div>
                        <label className={labelClasses}>Department</label>
                        <select value={form.department} onChange={(e) => set('department', e.target.value)} className={`${inputClasses} cursor-pointer`}>
                            <option>Engineering</option>
                            <option>Design</option>
                            <option>Marketing</option>
                            <option>Finance</option>
                            <option>Operations</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Save */}
            <div className="flex justify-end pb-4">
                <button
                    onClick={handleUpdate}
                    className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors bg-dark text-primary hover:bg-slate-800"
                >
                    Update Profile
                </button>
            </div>
        </div>
    );
}