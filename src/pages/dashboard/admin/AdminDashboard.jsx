import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, FileText, DollarSign, TrendingUp } from 'lucide-react';
import { analyticsAPI } from '../../../services/api';

const COLORS = ['#4f46e5', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${color}20`, color: color }}>
            <Icon size={24} />
        </div>
        <div>
            <div className="text-2xl font-extrabold text-text-main">{value}</div>
            <div className="text-sm text-text-muted">{label}</div>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        usersCount: 0,
        scholarshipsCount: 0,
        totalRevenue: 0,
        chartData: []
    });

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await analyticsAPI.getStats();
                setStats(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch analytics', error);
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    // Transform chartData for Recharts
    const barChartData = stats.chartData.map(item => ({
        name: item._id || 'Unknown',
        applications: item.count
    }));

    const pieChartData = stats.chartData.map(item => ({
        name: item._id || 'Unknown',
        value: item.count
    }));

    if (loading) {
        return (
            <div className="p-8 text-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="mt-4 text-text-muted">Loading analytics...</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-main mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Total Users" value={stats.usersCount} icon={Users} color="var(--color-primary)" />
                <StatCard label="Active Scholarships" value={stats.scholarshipsCount} icon={FileText} color="var(--color-secondary)" />
                <StatCard label="Total Revenue" value={`$${stats.totalRevenue}`} icon={DollarSign} color="var(--color-success)" />
                <StatCard label="Applications" value={barChartData.reduce((sum, item) => sum + item.applications, 0)} icon={TrendingUp} color="var(--color-warning)" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-xl border border-border shadow-sm h-[400px] flex flex-col">
                    <h3 className="text-lg font-bold text-text-main mb-6">Applications by Category</h3>
                    {barChartData.length > 0 ? (
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barChartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="applications" fill="var(--color-primary)" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-text-muted">
                            No application data yet
                        </div>
                    )}
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-xl border border-border shadow-sm h-[400px] flex flex-col">
                    <h3 className="text-lg font-bold text-text-main mb-6">Category Distribution</h3>
                    {pieChartData.length > 0 ? (
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-text-muted">
                            No category data yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
