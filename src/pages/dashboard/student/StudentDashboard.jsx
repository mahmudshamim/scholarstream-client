import React from 'react';
import { Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

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
    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard label="Applications Submitted" value="12" icon={FileText} color="var(--primary)" />
                <StatCard label="Pending Review" value="4" icon={Clock} color="var(--warning)" />
                <StatCard label="Accepted" value="2" icon={CheckCircle} color="var(--success)" />
                <StatCard label="Rejected" value="6" icon={XCircle} color="var(--error)" />
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
                            {[
                                { title: 'Global Excellence Scholarship', uni: 'Stanford University', date: 'Oct 12, 2025', status: 'Pending' },
                                { title: 'Women in Tech Fellowship', uni: 'Imperial College London', date: 'Oct 10, 2025', status: 'Accepted' },
                                { title: 'Computer Science Merit', uni: 'ETH Zurich', date: 'Oct 05, 2025', status: 'Rejected' },
                            ].map((app, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>{app.title}</td>
                                    <td style={{ padding: '1rem' }}>{app.uni}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{app.date}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600',
                                            background: app.status === 'Accepted' ? '#dcfce7' : app.status === 'Rejected' ? '#fee2e2' : '#fef3c7',
                                            color: app.status === 'Accepted' ? '#166534' : app.status === 'Rejected' ? '#991b1b' : '#92400e'
                                        }}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <button className="btn-ghost" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
