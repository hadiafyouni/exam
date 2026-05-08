import { useMemo } from 'react';
import { ColDef } from 'ag-grid-community';
import { Users, DollarSign, Activity, TrendingUp, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AgGridReact } from 'ag-grid-react';
import { showToast } from '@/components/Toast';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

type Order = {
    id: string;
    customer: string;
    amount: number;
    status: string;
    date: string;
};

const statsData = [
    { label: 'Total Users', value: '12,450', change: '+12.5%', isPositive: true, icon: Users, textColor: 'text-info', bgColor: 'bg-info/15' },
    { label: 'Revenue', value: '$45,231', change: '+8.2%', isPositive: true, icon: DollarSign, textColor: 'text-success', bgColor: 'bg-success/15' },
    { label: 'Active Sessions', value: '1,203', change: '-2.4%', isPositive: false, icon: Activity, textColor: 'text-primary', bgColor: 'bg-primary/15' },
    { label: 'Conversion Rate', value: '4.6%', change: '+1.1%', isPositive: true, icon: TrendingUp, textColor: 'text-warning', bgColor: 'bg-warning/15' },
];

const chartData = [
    { name: 'Jan', revenue: 4000, signups: 2400 },
    { name: 'Feb', revenue: 3000, signups: 1398 },
    { name: 'Mar', revenue: 2000, signups: 9800 },
    { name: 'Apr', revenue: 2780, signups: 3908 },
    { name: 'May', revenue: 1890, signups: 4800 },
    { name: 'Jun', revenue: 2390, signups: 3800 },
];

const rowData: Order[] = [
    { id: 'ORD-001', customer: 'John Doe', amount: 120.50, status: 'Completed', date: '2026-05-01' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: 450.00, status: 'Pending', date: '2026-05-02' },
    { id: 'ORD-003', customer: 'Bob Johnson', amount: 89.99, status: 'Completed', date: '2026-05-02' },
    { id: 'ORD-004', customer: 'Alice Brown', amount: 210.00, status: 'Failed', date: '2026-05-03' },
    { id: 'ORD-005', customer: 'Charlie Davis', amount: 55.20, status: 'Completed', date: '2026-05-04' },
];

const statusStyles: Record<string, string> = {
    Completed: 'bg-success/15 text-success border-success/30',
    Pending: 'bg-warning/15 text-warning border-warning/30',
    Failed: 'bg-red-500/15 text-red-500 border-red-500/30',
};

export default function DashboardPage() {
    const colDefs = useMemo<ColDef<Order>[]>(() => [
        { field: 'id', headerName: 'Order ID', flex: 1 },
        { field: 'customer', headerName: 'Customer', flex: 1.5 },
        { field: 'amount', headerName: 'Amount', flex: 1, valueFormatter: (p) => `$${p.value.toFixed(2)}` },
        {
            field: 'status', headerName: 'Status', flex: 1,
            cellRenderer: (p: { value: string }) => (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusStyles[p.value]}`}>
                    {p.value}
                </span>
            ),
        },
        { field: 'date', headerName: 'Date', flex: 1 },
    ], []);

    return (
        <div className="space-y-6">

            {/* ── Toast Test Buttons (Now sitting perfectly horizontal at the top) ── */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-sm font-semibold text-slate-500 mr-2">Test Toasts:</p>
                <button
                    onClick={() => showToast.success('Operation completed successfully!')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors bg-success/15 text-success border border-success/30 hover:bg-success/25"
                >
                    <CheckCircle size={15} /> Success
                </button>
                <button
                    onClick={() => showToast.error('Something went wrong!')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25"
                >
                    <XCircle size={15} /> Error
                </button>
                <button
                    onClick={() => showToast.warning('Proceed with caution!')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors bg-warning/15 text-warning border border-warning/30 hover:bg-warning/25"
                >
                    <AlertTriangle size={15} /> Warning
                </button>
            </div>

            {/* ── Stats ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {statsData.map((stat, idx) => (
                    <div key={idx} className="p-5 rounded-xl flex items-center justify-between bg-white border border-slate-200 shadow-sm">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide mb-1 text-slate-400">{stat.label}</p>
                            <h3 className="text-2xl font-bold mb-1 text-dark">{stat.value}</h3>
                            <p className={`text-xs font-semibold ${stat.isPositive ? 'text-success' : 'text-red-400'}`}>
                                {stat.change} from last month
                            </p>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.textColor}`}>
                            <stat.icon size={22} />
                        </div>
                    </div>
                ))}
            </div>

            {/* ── AG Grid ── */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                <h2 className="text-base font-semibold mb-4 text-dark">Recent Orders</h2>
                <div className="ag-theme-quartz" style={{ height: 360, width: '100%' }}>
                    <AgGridReact<Order> rowData={rowData} columnDefs={colDefs} pagination={true} paginationPageSize={5} />
                </div>
            </div>

            {/* ── Charts ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <h2 className="text-base font-semibold mb-4 text-dark">Revenue Overview</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-primary)' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <h2 className="text-base font-semibold mb-4 text-dark">User Signups</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} cursor={{ fill: '#f9f9f9' }} />
                                <Bar dataKey="signups" fill="var(--color-info)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}