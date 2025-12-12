import React from 'react';
import { FileText, Star, AlertCircle } from 'lucide-react';

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

const ModeratorDashboard = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-text-main mb-6">Moderator Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard label="Pending Applications" value="24" icon={FileText} color="var(--color-primary)" />
                <StatCard label="Reviews to Moderate" value="8" icon={Star} color="var(--color-warning)" />
                <StatCard label="Flagged Content" value="3" icon={AlertCircle} color="var(--color-error)" />
            </div>

            <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                <h3 className="text-lg font-bold text-text-main mb-6">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                    <button className="btn btn-primary text-white">Review Applications</button>
                    <button className="btn btn-secondary text-white">Moderate Comments</button>
                </div>
            </div>
        </div>
    );
};

export default ModeratorDashboard;
