import React from 'react';
import { FileText, Star, AlertCircle } from 'lucide-react';

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

const ModeratorDashboard = () => {
    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard label="Pending Applications" value="24" icon={FileText} color="var(--primary)" />
                <StatCard label="Reviews to Moderate" value="8" icon={Star} color="var(--warning)" />
                <StatCard label="Flagged Content" value="3" icon={AlertCircle} color="var(--error)" />
            </div>

            <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Quick Actions</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-primary">Review Applications</button>
                    <button className="btn btn-secondary">Moderate Comments</button>
                </div>
            </div>
        </div>
    );
};

export default ModeratorDashboard;
