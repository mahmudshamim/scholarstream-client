import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import { applicationsAPI } from '../../../services/api';
import useAuth from '../../../hooks/useAuth';

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

const StudentDashboard = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        accepted: 0,
        rejected: 0
    });

    useEffect(() => {
        const fetchApplications = async () => {
            if (!user?.email) return;

            try {
                const res = await applicationsAPI.getUserApplications(user.email);
                const apps = res.data || [];
                setApplications(apps);

                // Calculate stats from real data
                const total = apps.length;
                const pending = apps.filter(app => app.applicationStatus === 'pending').length;
                const accepted = apps.filter(app => app.applicationStatus === 'completed').length;
                const rejected = apps.filter(app => app.applicationStatus === 'rejected').length;

                setStats({ total, pending, accepted, rejected });
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch applications', error);
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user]);

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard label="Applications Submitted" value={stats.total} icon={FileText} color="var(--primary)" />
                <StatCard label="Pending Review" value={stats.pending} icon={Clock} color="var(--warning)" />
                <StatCard label="Accepted" value={stats.accepted} icon={CheckCircle} color="var(--success)" />
                <StatCard label="Rejected" value={stats.rejected} icon={XCircle} color="var(--error)" />
            </div>

            {/* Recent Activity / Applications Table Preview */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Recent Applications</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <th style={{ padding: '1rem' }}>Scholarship</th>
                                <th style={{ padding: '1rem' }}>University</th>
                                <th style={{ padding: '1rem' }}>Date Applied</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        Loading applications...
                                    </td>
                                </tr>
                            ) : applications.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No applications yet. Start applying to scholarships!
                                    </td>
                                </tr>
                            ) : (
                                applications.slice(0, 5).map((app) => (
                                    <tr key={app._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '1rem', fontWeight: '600' }}>{app.scholarshipCategory || 'N/A'}</td>
                                        <td style={{ padding: '1rem' }}>{app.universityName}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                                            {new Date(app.applicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600',
                                                background: app.applicationStatus === 'completed' ? '#dcfce7' : app.applicationStatus === 'rejected' ? '#fee2e2' : '#fef3c7',
                                                color: app.applicationStatus === 'completed' ? '#166534' : app.applicationStatus === 'rejected' ? '#991b1b' : '#92400e',
                                                textTransform: 'capitalize'
                                            }}>
                                                {app.applicationStatus}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <button className="btn-ghost" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>View</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
