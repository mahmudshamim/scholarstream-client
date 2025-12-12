import React, { useEffect, useState } from 'react';
import { Eye, MessageSquare, X } from 'lucide-react';
import { applicationsAPI } from '../../../services/api';

const ManageApplicationsMod = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [changedStatuses, setChangedStatuses] = useState({});

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const res = await applicationsAPI.getAllApplications();
            setApplications(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch applications", error);
            setLoading(false);
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setChangedStatuses(prev => ({
            ...prev,
            [id]: newStatus
        }));
    };

    const saveStatus = async (id) => {
        const newStatus = changedStatuses[id];
        if (!newStatus) return;

        try {
            await applicationsAPI.updateStatus(id, newStatus);
            // Clear the local change for this item
            setChangedStatuses(prev => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
            fetchApplications();
            alert('Status updated successfully');
        } catch (error) {
            console.error("Failed to update status", error);
            alert('Failed to update status');
        }
    };

    const handleSubmitFeedback = async () => {
        if (!feedback.trim()) {
            alert('Please enter feedback');
            return;
        }
        try {
            await applicationsAPI.addFeedback(selectedApp._id, feedback);
            setShowFeedbackModal(false);
            setFeedback('');
            fetchApplications();
            alert('Feedback added successfully');
        } catch (error) {
            console.error("Failed to add feedback", error);
            alert('Failed to add feedback');
        }
    };

    const handleSaveAll = async () => {
        const updates = Object.entries(changedStatuses);
        if (updates.length === 0) return;

        try {
            // Execute all updates in parallel
            await Promise.all(updates.map(([id, status]) => applicationsAPI.updateStatus(id, status)));

            setChangedStatuses({});
            fetchApplications();
            alert('All changes saved successfully');
        } catch (error) {
            console.error("Failed to save changes", error);
            alert('Failed to save some changes');
        }
    };

    return (
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm min-h-[400px]">
            <h1 className="text-2xl font-bold text-text-main mb-6">Manage Applications</h1>

            <div className="overflow-x-auto rounded-lg border border-border">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr className="border-b border-border text-text-muted text-sm">
                            <th className="py-4 pl-6">Applicant</th>
                            <th className="py-4">University</th>
                            <th className="py-4">Date</th>
                            <th className="py-4">Status</th>
                            <th className="py-4">Payment</th>
                            <th className="py-4 pr-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="text-center py-12 text-text-muted">Loading applications...</td></tr>
                        ) : applications.length === 0 ? (
                            <tr><td colSpan="6" className="text-center py-12 text-text-muted">No applications found.</td></tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app._id} className="border-b border-border last:border-0 hover:bg-slate-50 transition-colors">
                                    <td className="pl-6 py-4">
                                        <div className="font-semibold text-text-main text-base">{app.userName || 'N/A'}</div>
                                        <div className="text-sm text-text-muted">{app.userEmail}</div>
                                    </td>
                                    <td className="py-4 font-medium">{app.universityName}</td>
                                    <td className="py-4 text-text-muted font-medium">
                                        {app.applicationDate ? new Date(app.applicationDate).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="py-4">
                                        <div className="relative">
                                            <select
                                                value={changedStatuses[app._id] || app.applicationStatus}
                                                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                                className={`select select-sm w-full max-w-[140px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 appearance-none cursor-pointer pl-4 pr-8 border border-transparent shadow-sm mx-auto block rounded-lg
                                                ${(changedStatuses[app._id] || app.applicationStatus) === 'completed'
                                                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 focus:ring-emerald-500'
                                                        : (changedStatuses[app._id] || app.applicationStatus) === 'rejected'
                                                            ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 focus:ring-rose-500'
                                                            : (changedStatuses[app._id] || app.applicationStatus) === 'processing'
                                                                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500'
                                                                : 'bg-amber-100 text-amber-700 hover:bg-amber-200 focus:ring-amber-500'
                                                    }`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="completed">Completed</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-current opacity-60">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className={`badge h-8 px-3 gap-2 font-semibold border-0 text-xs uppercase tracking-wide rounded-lg ${app.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/20' : 'bg-rose-50 text-rose-600 ring-1 ring-rose-600/20'}`}>
                                            {app.paymentStatus}
                                        </div>
                                    </td>
                                    <td className="pr-6 py-4">
                                        <div className="flex gap-2 justify-end">
                                            <button
                                                onClick={() => { setSelectedApp(app); setShowDetailsModal(true); }}
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors"
                                                title="Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => { setSelectedApp(app); setFeedback(app.feedback || ''); setShowFeedbackModal(true); }}
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-secondary/10 hover:text-secondary transition-colors"
                                                title="Add Feedback"
                                            >
                                                <MessageSquare size={18} />
                                            </button>
                                            {app.applicationStatus !== 'rejected' && (
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to reject this application?')) {
                                                            handleStatusChange(app._id, 'rejected');
                                                        }
                                                    }}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-error transition-colors"
                                                    title="Cancel/Reject"
                                                >
                                                    <X size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Global Save Button */}
            {Object.keys(changedStatuses).length > 0 && (
                <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <button
                        onClick={handleSaveAll}
                        className="btn btn-primary h-14 px-8 text-lg font-bold rounded-full shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-1 transition-all flex items-center gap-3 border-2 border-white/20 backdrop-blur-md"
                    >
                        <span>Save {Object.keys(changedStatuses).length} Changes</span>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                    </button>
                </div>
            )}

            {/* Details Modal */}
            {showDetailsModal && selectedApp && (
                <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm transition-opacity" onClick={() => setShowDetailsModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200 border border-white/20" onClick={(e) => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-6 border-b border-border flex justify-between items-center z-10">
                            <h2 className="text-xl font-bold text-text-main">Application Details</h2>
                            <button onClick={() => setShowDetailsModal(false)} className="btn btn-ghost btn-sm btn-circle text-text-muted hover:bg-gray-100">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1">
                                    <div className="text-text-muted font-medium">Applicant Name</div>
                                    <div className="font-semibold text-text-main text-base">{selectedApp.userName}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-text-muted font-medium">Email</div>
                                    <div className="font-semibold text-text-main text-base break-all">{selectedApp.userEmail}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-text-muted font-medium">University</div>
                                    <div className="font-semibold text-text-main text-base">{selectedApp.universityName}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-text-muted font-medium">Subject</div>
                                    <div className="font-semibold text-text-main text-base">{selectedApp.scholarshipCategory}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-text-muted font-medium">Degree</div>
                                    <div className="font-semibold text-text-main text-base">{selectedApp.degree}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-text-muted font-medium">Applied Date</div>
                                    <div className="font-semibold text-text-main text-base">{new Date(selectedApp.applicationDate).toLocaleDateString()}</div>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg sm:col-span-2 flex justify-between">
                                    <div>
                                        <div className="text-text-muted text-xs uppercase tracking-wide font-bold mb-1">Fees Paid</div>
                                        <div className="font-bold text-text-main">${selectedApp.applicationFees} <span className="text-text-muted font-normal">+</span> ${selectedApp.serviceCharge} <span className="text-xs text-text-muted">(Service)</span></div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-text-muted text-xs uppercase tracking-wide font-bold mb-1">Payment Status</div>
                                        <div className={`font-bold ${selectedApp.paymentStatus === 'paid' ? 'text-success' : 'text-error'} capitalize`}>{selectedApp.paymentStatus}</div>
                                    </div>
                                </div>
                                <div className="sm:col-span-2 space-y-2 pt-2 border-t border-border">
                                    <div className="text-text-muted font-medium">Feedback</div>
                                    <div className="p-4 bg-gray-50 rounded-xl text-text-main italic border border-gray-100">
                                        {selectedApp.feedback || <span className="text-text-muted not-italic">No feedback has been added yet.</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Feedback Modal */}
            {showFeedbackModal && selectedApp && (
                <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm transition-opacity" onClick={() => setShowFeedbackModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200 border border-white/20" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <h2 className="text-xl font-bold text-text-main">Add Feedback</h2>
                            <button onClick={() => setShowFeedbackModal(false)} className="btn btn-ghost btn-sm btn-circle text-text-muted hover:bg-gray-100">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="mb-4 bg-blue-50 text-blue-800 p-4 rounded-xl text-sm border border-blue-100">
                                Giving feedback for application by <strong>{selectedApp.userName}</strong> to <strong>{selectedApp.universityName}</strong>.
                            </div>
                            <div className="space-y-4">
                                <label className="block font-semibold text-text-main">Feedback Message</label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    rows="5"
                                    className="textarea textarea-bordered w-full text-base focus:border-primary focus:outline-none"
                                    placeholder="Enter constructive feedback for the applicant..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <button onClick={() => setShowFeedbackModal(false)} className="btn btn-ghost bg-gray-100 hover:bg-gray-200 text-text-main">Cancel</button>
                                <button onClick={handleSubmitFeedback} className="btn btn-primary text-white">Submit Feedback</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageApplicationsMod;
