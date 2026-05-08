import { useState } from 'react';
import { showToast } from '@/components/Toast';
import { Bell, Lock, Palette, Globe, Shield } from 'lucide-react';

type ToggleProps = {
    emailNotif: boolean;
    pushNotif: boolean;
    weeklyReport: boolean;
    twoFactor: boolean;
    loginAlerts: boolean;
};

export default function SettingsPage() {
    const [toggles, setToggles] = useState<ToggleProps>({
        emailNotif: true,
        pushNotif: false,
        weeklyReport: true,
        twoFactor: false,
        loginAlerts: true,
    });

    const [language, setLanguage] = useState('en');
    const [timezone, setTimezone] = useState('UTC+3');
    const [theme, setTheme] = useState('light');

    const toggle = (key: keyof ToggleProps) =>
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

    const handleSave = () => showToast.success('Settings saved successfully!');

    // Reusable Tailwind classes
    const sectionClasses = "rounded-xl p-6 bg-white border border-slate-200 shadow-sm space-y-4";
    const inputClasses = "w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-dark outline-none bg-slate-50 focus:border-primary transition-colors";
    const labelClasses = "block text-[13px] font-medium text-slate-500 mb-1.5";

    const Toggle = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => (
        <button
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-success' : 'bg-slate-200'}`}
        >
            <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
        </button>
    );

    return (
        <div className="max-w-3xl mx-auto space-y-6">

            <div>
                <h1 className="text-2xl font-bold text-dark">Settings</h1>
                <p className="text-sm mt-1 text-slate-400">Manage your account preferences</p>
            </div>

            {/* Notifications */}
            <div className={sectionClasses}>
                <div className="flex items-center gap-2 mb-2">
                    <Bell size={18} className="text-primary" />
                    <h2 className="text-base font-semibold text-dark">Notifications</h2>
                </div>
                {([
                    ['emailNotif', 'Email Notifications', 'Receive updates and alerts via email'],
                    ['pushNotif', 'Push Notifications', 'Browser push notifications'],
                    ['weeklyReport', 'Weekly Report', 'Get a weekly summary of activity'],
                ] as [keyof ToggleProps, string, string][]).map(([key, label, desc]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 last:pb-0">
                        <div>
                            <p className="text-sm font-medium text-dark">{label}</p>
                            <p className="text-xs mt-0.5 text-slate-400">{desc}</p>
                        </div>
                        <Toggle value={toggles[key]} onToggle={() => toggle(key)} />
                    </div>
                ))}
            </div>

            {/* Security */}
            <div className={sectionClasses}>
                <div className="flex items-center gap-2 mb-2">
                    <Lock size={18} className="text-info" />
                    <h2 className="text-base font-semibold text-dark">Security</h2>
                </div>
                {([
                    ['twoFactor', 'Two-Factor Authentication', 'Add an extra layer of security'],
                    ['loginAlerts', 'Login Alerts', 'Get notified of new sign-ins'],
                ] as [keyof ToggleProps, string, string][]).map(([key, label, desc]) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                            <p className="text-sm font-medium text-dark">{label}</p>
                            <p className="text-xs mt-0.5 text-slate-400">{desc}</p>
                        </div>
                        <Toggle value={toggles[key]} onToggle={() => toggle(key)} />
                    </div>
                ))}
                <div className="pt-2">
                    <label className={labelClasses}>Current Password</label>
                    <input type="password" placeholder="••••••••" className={inputClasses} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClasses}>New Password</label>
                        <input type="password" placeholder="••••••••" className={inputClasses} />
                    </div>
                    <div>
                        <label className={labelClasses}>Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className={inputClasses} />
                    </div>
                </div>
            </div>

            {/* Appearance */}
            <div className={sectionClasses}>
                <div className="flex items-center gap-2 mb-2">
                    <Palette size={18} className="text-warning" />
                    <h2 className="text-base font-semibold text-dark">Appearance</h2>
                </div>
                <div>
                    <label className={labelClasses}>Theme</label>
                    <div className="flex gap-3">
                        {['light', 'dark', 'system'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTheme(t)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all border ${theme === t
                                        ? 'bg-dark text-primary border-dark'
                                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Localization */}
            <div className={sectionClasses}>
                <div className="flex items-center gap-2 mb-2">
                    <Globe size={18} className="text-success" />
                    <h2 className="text-base font-semibold text-dark">Localization</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClasses}>Language</label>
                        <select value={language} onChange={(e) => setLanguage(e.target.value)} className={`${inputClasses} cursor-pointer`}>
                            <option value="en">English</option>
                            <option value="ar">Arabic</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClasses}>Timezone</label>
                        <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className={`${inputClasses} cursor-pointer`}>
                            <option value="UTC+0">UTC+0 — London</option>
                            <option value="UTC+2">UTC+2 — Cairo</option>
                            <option value="UTC+3">UTC+3 — Beirut</option>
                            <option value="UTC+5">UTC+5 — Karachi</option>
                            <option value="UTC-5">UTC-5 — New York</option>
                            <option value="UTC-8">UTC-8 — Los Angeles</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-xl p-6 bg-white shadow-sm border border-red-500/20">
                <div className="flex items-center gap-2 mb-4">
                    <Shield size={18} className="text-red-500" />
                    <h2 className="text-base font-semibold text-red-500">Danger Zone</h2>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-dark">Delete Account</p>
                        <p className="text-xs mt-0.5 text-slate-400">Permanently delete your account and all data</p>
                    </div>
                    <button
                        onClick={() => showToast.error('Account deletion is disabled in demo mode.')}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Save */}
            <div className="flex justify-end pb-4">
                <button
                    onClick={handleSave}
                    className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors bg-dark text-primary hover:bg-slate-800"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}