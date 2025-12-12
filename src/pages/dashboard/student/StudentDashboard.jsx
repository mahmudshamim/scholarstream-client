import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import { applicationsAPI } from '../../../services/api';
import useAuth from '../../../hooks/useAuth';

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
            <h2 className="text-2xl font-bold text-text-main mb-6">Student Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard label="Applications Submitted" value={stats.total} icon={FileText} color="var(--color-primary)" />
                <StatCard label="Pending Review" value={stats.pending} icon={Clock} color="var(--color-warning)" />
                <StatCard label="Accepted" value={stats.accepted} icon={CheckCircle} color="var(--color-success)" />
                <StatCard label="Rejected" value={stats.rejected} icon={XCircle} color="var(--color-error)" />
            </div>

            {/* Recent Activity / Applications Table Preview */}
            <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-text-main">Recent Applications</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="border-b border-border text-text-muted text-sm">
                                <th>Scholarship</th>
                                <th>University</th>
                                <th>Date Applied</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-text-muted">
                                        Loading applications...
                                    </td>
                                </tr>
                            ) : applications.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-text-muted">
                                        No applications yet. Start applying to scholarships!
                                    </td>
                                </tr>
                            ) : (
                                applications.slice(0, 5).map((app) => (
                                    <tr key={app._id} className="border-b border-border last:border-0 hover:bg-slate-50 transition-colors">
                                        <td className="font-semibold">{app.scholarshipCategory || 'N/A'}</td>
                                        <td>{app.universityName}</td>
                                        <td className="text-text-muted">
                                            {new Date(app.applicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td>
                                            <span className={`badge border-0 font-semibold px-3 py-2 h-auto ${app.applicationStatus === 'completed' ? 'bg-green-100 text-green-700' :
                                                    app.applicationStatus === 'rejected' ? 'bg-red-100 text-red-700' :
                                                        'bg-amber-100 text-amber-700'
                                                } capitalize`}>
                                                {app.applicationStatus}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-ghost btn-xs">View</button>
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
