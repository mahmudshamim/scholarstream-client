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

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            await applicationsAPI.updateStatus(id, status);
            fetchApplications();
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

    return (
        <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '1.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Manage Applications</h1>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <th style={{ padding: '1rem' }}>Applicant</th>
                            <th style={{ padding: '1rem' }}>University</th>
                            <th style={{ padding: '1rem' }}>Date</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Payment</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</td></tr>
                        ) : applications.length === 0 ? (
                            <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>No applications found.</td></tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '600' }}>{app.userName || 'N/A'}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{app.userEmail}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>{app.universityName}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                                        {app.applicationDate ? new Date(app.applicationDate).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <select
                                            value={app.applicationStatus}
                                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                            style={{
                                                padding: '0.5rem',
                                                borderRadius: 'var(--radius-sm)',
                                                border: '1px solid var(--border)',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                textTransform: 'capitalize'
                                            }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="completed">Completed</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            background: app.paymentStatus === 'paid' ? '#dcfce7' : '#fee2e2',
                                            color: app.paymentStatus === 'paid' ? '#166534' : '#991b1b'
                                        }}>
                                            {app.paymentStatus}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => { setSelectedApp(app); setShowDetailsModal(true); }}
                                                className="btn btn-ghost"
                                                style={{ padding: '0.5rem' }}
                                                title="Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => { setSelectedApp(app); setFeedback(app.feedback || ''); setShowFeedbackModal(true); }}
                                                className="btn btn-ghost"
                                                style={{ padding: '0.5rem' }}
                                                title="Add Feedback"
                                            >
                                                <MessageSquare size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Details Modal */}
            {showDetailsModal && selectedApp && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowDetailsModal(false)}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '2rem', maxWidth: '500px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Application Details</h2>
                            <button onClick={() => setShowDetailsModal(false)} style={{ color: 'var(--text-muted)' }}>
                                <X size={24} />
                            </button>
                        </div>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div><strong>Applicant Name:</strong> {selectedApp.userName}</div>
                            <div><strong>Email:</strong> {selectedApp.userEmail}</div>
                            <div><strong>University:</strong> {selectedApp.universityName}</div>
                            <div><strong>Subject:</strong> {selectedApp.scholarshipCategory}</div>
                            <div><strong>Degree:</strong> {selectedApp.degree}</div>
                            <div><strong>Application Fees:</strong> ${selectedApp.applicationFees}</div>
                            <div><strong>Service Charge:</strong> ${selectedApp.serviceCharge}</div>
                            <div><strong>Status:</strong> <span style={{ textTransform: 'capitalize' }}>{selectedApp.applicationStatus}</span></div>
                            <div><strong>Payment Status:</strong> <span style={{ textTransform: 'capitalize' }}>{selectedApp.paymentStatus}</span></div>
                            <div><strong>Applied Date:</strong> {new Date(selectedApp.applicationDate).toLocaleDateString()}</div>
                            <div><strong>Feedback:</strong> {selectedApp.feedback || 'No feedback yet'}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Feedback Modal */}
            {showFeedbackModal && selectedApp && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowFeedbackModal(false)}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '2rem', maxWidth: '500px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Add Feedback</h2>
                            <button onClick={() => setShowFeedbackModal(false)} style={{ color: 'var(--text-muted)' }}>
                                <X size={24} />
                            </button>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <p style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                                <strong>Applicant:</strong> {selectedApp.userName} ({selectedApp.userEmail})
                            </p>
                            <p style={{ color: 'var(--text-muted)' }}>
                                <strong>University:</strong> {selectedApp.universityName}
                            </p>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Feedback Message</label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                rows="5"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--border)',
                                    resize: 'vertical'
                                }}
                                placeholder="Enter feedback for the applicant..."
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={() => setShowFeedbackModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                            <button onClick={handleSubmitFeedback} className="btn btn-primary" style={{ flex: 1 }}>Submit Feedback</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageApplicationsMod;
