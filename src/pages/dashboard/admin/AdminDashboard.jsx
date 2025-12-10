import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, FileText, DollarSign, TrendingUp } from 'lucide-react';
import { analyticsAPI } from '../../../services/api';

const COLORS = ['#4f46e5', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

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
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p>Loading analytics...</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard label="Total Users" value={stats.usersCount} icon={Users} color="var(--primary)" />
                <StatCard label="Active Scholarships" value={stats.scholarshipsCount} icon={FileText} color="var(--secondary)" />
                <StatCard label="Total Revenue" value={`$${stats.totalRevenue}`} icon={DollarSign} color="var(--success)" />
                <StatCard label="Applications" value={barChartData.reduce((sum, item) => sum + item.applications, 0)} icon={TrendingUp} color="var(--warning)" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                {/* Bar Chart */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', height: '400px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Applications by Category</h3>
                    {barChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={barChartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="applications" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '85%', color: 'var(--text-muted)' }}>
                            No application data yet
                        </div>
                    )}
                </div>

                {/* Pie Chart */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', height: '400px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Category Distribution</h3>
                    {pieChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="85%">
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '85%', color: 'var(--text-muted)' }}>
                            No category data yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
