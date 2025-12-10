import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, DollarSign, Trash2, Star } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import { applicationsAPI, reviewsAPI } from '../../../services/api';

const MyApplications = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);
    const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

    useEffect(() => {
        fetchApplications();
    }, [user]);

    const fetchApplications = () => {
        if (user?.email) {
            applicationsAPI.getUserApplications(user.email)
                .then(res => {
                    setApplications(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch applications", err);
                    setLoading(false);
                });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                await applicationsAPI.deleteApplication(id);
                fetchApplications();
            } catch (err) {
                console.error('Delete failed', err);
                alert('Failed to delete application');
            }
        }
    };

    const handlePay = (app) => {
        navigate(`/checkout/${app.scholarshipId}`);
    };

    const handleEdit = (app) => {
        navigate(`/checkout/${app.scholarshipId}`);
    };

    const handleAddReview = async () => {
        try {
            await reviewsAPI.addReview({
                scholarshipId: selectedApp.scholarshipId,
                universityName: selectedApp.universityName,
                userName: user.displayName,
                userEmail: user.email,
                userImage: user.photoURL || '',
                ratingPoint: reviewData.rating,
                reviewComment: reviewData.comment,
                reviewDate: new Date().toISOString()
            });
            setShowReviewModal(false);
            setReviewData({ rating: 5, comment: '' });
            alert('Review added successfully!');
        } catch (err) {
            console.error('Add review failed', err);
            alert('Failed to add review');
        }
    };

    return (
        <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '1.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>My Applications</h1>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <th style={{ padding: '1rem' }}>University</th>
                            <th style={{ padding: '1rem' }}>Subject</th>
                            <th style={{ padding: '1rem' }}>Fees</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Payment</th>
                            <th style={{ padding: '1rem' }}>Feedback</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</td></tr>
                        ) : applications.length === 0 ? (
                            <tr><td colSpan="7" style={{ padding: '2rem', textAlign: 'center' }}>No applications found.</td></tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>{app.universityName || 'N/A'}</td>
                                    <td style={{ padding: '1rem' }}>{app.scholarshipCategory || 'N/A'}</td>
                                    <td style={{ padding: '1rem' }}>${app.applicationFees || 0}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600',
                                            textTransform: 'capitalize',
                                            background: app.applicationStatus === 'completed' ? '#dcfce7' : app.applicationStatus === 'rejected' ? '#fee2e2' : '#fef3c7',
                                            color: app.applicationStatus === 'completed' ? '#166534' : app.applicationStatus === 'rejected' ? '#991b1b' : '#92400e'
                                        }}>
                                            {app.applicationStatus}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600',
                                            background: app.paymentStatus === 'paid' ? '#dcfce7' : '#fee2e2',
                                            color: app.paymentStatus === 'paid' ? '#166534' : '#991b1b'
                                        }}>
                                            {app.paymentStatus}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{app.feedback || '-'}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => { setSelectedApp(app); setShowDetailsModal(true); }} className="btn btn-ghost" style={{ padding: '0.5rem' }} title="Details">
                                                <Eye size={16} />
                                            </button>
                                            {app.applicationStatus === 'pending' && (
                                                <>
                                                    <button onClick={() => handleEdit(app)} className="btn btn-ghost" style={{ padding: '0.5rem' }} title="Edit">
                                                        <Edit size={16} />
                                                    </button>
                                                    {app.paymentStatus === 'unpaid' && (
                                                        <button onClick={() => handlePay(app)} className="btn btn-primary" style={{ padding: '0.5rem' }} title="Pay">
                                                            <DollarSign size={16} />
                                                        </button>
                                                    )}
                                                    <button onClick={() => handleDelete(app._id)} className="btn btn-ghost" style={{ padding: '0.5rem', color: 'var(--error)' }} title="Delete">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </>
                                            )}
                                            {app.applicationStatus === 'completed' && (
                                                <button onClick={() => { setSelectedApp(app); setShowReviewModal(true); }} className="btn btn-primary" style={{ padding: '0.5rem' }} title="Add Review">
                                                    <Star size={16} />
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

            {/* Details Modal */}
            {showDetailsModal && selectedApp && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowDetailsModal(false)}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '2rem', maxWidth: '500px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Application Details</h2>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div><strong>University:</strong> {selectedApp.universityName}</div>
                            <div><strong>Subject:</strong> {selectedApp.scholarshipCategory}</div>
                            <div><strong>Degree:</strong> {selectedApp.degree}</div>
                            <div><strong>Application Fees:</strong> ${selectedApp.applicationFees}</div>
                            <div><strong>Service Charge:</strong> ${selectedApp.serviceCharge}</div>
                            <div><strong>Status:</strong> {selectedApp.applicationStatus}</div>
                            <div><strong>Payment:</strong> {selectedApp.paymentStatus}</div>
                            <div><strong>Feedback:</strong> {selectedApp.feedback || 'No feedback yet'}</div>
                            <div><strong>Applied Date:</strong> {new Date(selectedApp.applicationDate).toLocaleDateString()}</div>
                        </div>
                        <button onClick={() => setShowDetailsModal(false)} className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>Close</button>
                    </div>
                </div>
            )}

            {/* Add Review Modal */}
            {showReviewModal && selectedApp && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowReviewModal(false)}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '2rem', maxWidth: '500px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Add Review</h2>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Rating (1-5)</label>
                            <select value={reviewData.rating} onChange={(e) => setReviewData({ ...reviewData, rating: parseInt(e.target.value) })} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                                {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>)}
                            </select>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Comment</label>
                            <textarea value={reviewData.comment} onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })} rows="4" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', resize: 'vertical' }} placeholder="Share your experience..." />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={() => setShowReviewModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                            <button onClick={handleAddReview} className="btn btn-primary" style={{ flex: 1 }}>Submit Review</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyApplications;
