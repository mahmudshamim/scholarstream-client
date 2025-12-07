import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, FileText, CheckCircle, TrendingUp } from 'lucide-react';

const data = [
    { name: 'Jan', applications: 400, approved: 240 },
    { name: 'Feb', applications: 300, approved: 139 },
    { name: 'Mar', applications: 200, approved: 480 },
    { name: 'Apr', applications: 278, approved: 390 },
    { name: 'May', applications: 189, approved: 480 },
    { name: 'Jun', applications: 239, approved: 380 },
];

const pieData = [
    { name: 'Engineering', value: 400 },
    { name: 'Business', value: 300 },
    { name: 'Arts', value: 300 },
    { name: 'Medicine', value: 200 },
];

const COLORS = ['#4f46e5', '#8b5cf6', '#3b82f6', '#10b981'];

const StatCard = ({ label, value, icon: Icon, color }) => (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color }}>
            <Icon size={24} />
        </div>
        <div>
            <div style={{ fontSize: '2rem', fontWeight: '800' }}>{value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{label}</div>
        </div>
    </div>
);

const AdminDashboard = () => {
    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard label="Total Users" value="15,234" icon={Users} color="var(--primary)" />
                <StatCard label="Active Scholarships" value="1,432" icon={FileText} color="var(--secondary)" />
                <StatCard label="Applications" value="45,200" icon={TrendingUp} color="var(--warning)" />
                <StatCard label="Approvals" value="12,405" icon={CheckCircle} color="var(--success)" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                {/* Bar Chart */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', height: '400px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Application Trends</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="applications" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="approved" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', height: '400px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Popular Categories</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
