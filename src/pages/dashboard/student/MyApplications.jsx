import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit, DollarSign, Trash2, Star, X } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import { applicationsAPI, reviewsAPI } from '../../../services/api';

const MyApplications = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);
    const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
    const [editFormData, setEditFormData] = useState({ userName: '', userEmail: '' });

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
        setSelectedApp(app);
        setEditFormData({
            userName: app.userName || '',
            userEmail: app.userEmail || ''
        });
        setShowEditModal(true);
    };

    const handleUpdateApplication = async (e) => {
        e.preventDefault();
        try {
            await applicationsAPI.updateApplication(selectedApp._id, editFormData);
            setShowEditModal(false);
            alert('Application updated successfully!');
            fetchApplications();
        } catch (err) {
            console.error('Update failed', err);
            alert('Failed to update application');
        }
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
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm min-h-[400px]">
            <h1 className="text-2xl font-bold text-text-main mb-6">My Applications</h1>
            <div className="overflow-x-auto rounded-lg border border-border">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr className="border-b border-border text-text-muted text-sm">
                            <th className="py-4 pl-6">University Name</th>
                            <th className="py-4">University Address</th>
                            <th className="py-4">Feedback</th>
                            <th className="py-4">Subject Category</th>
                            <th className="py-4">Application Fees</th>
                            <th className="py-4">Application Status</th>
                            <th className="py-4 pr-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" className="text-center py-12 text-text-muted">Loading...</td></tr>
                        ) : applications.length === 0 ? (
                            <tr><td colSpan="7" className="text-center py-12 text-text-muted">No applications found.</td></tr>
                        ) : (
                            applications.map((app) => (
                                <tr key={app._id} className="border-b border-border last:border-0 hover:bg-slate-50 transition-colors">
                                    <td className="pl-6 py-4 font-semibold text-text-main">{app.universityName || 'N/A'}</td>
                                    <td className="py-4 text-text-muted text-sm">
                                        {app.universityCity && app.universityCountry
                                            ? `${app.universityCity}, ${app.universityCountry}`
                                            : 'N/A'}
                                    </td>
                                    <td className="py-4 text-text-muted text-sm max-w-[150px] truncate" title={app.feedback}>{app.feedback || '-'}</td>
                                    <td className="py-4 text-sm">{app.scholarshipCategory || 'N/A'}</td>
                                    <td className="py-4 font-mono font-medium">${app.applicationFees || 0}</td>
                                    <td className="py-4">
                                        <div className={`badge h-8 px-3 gap-2 font-semibold border-0 text-xs uppercase tracking-wide capitalize ${app.applicationStatus === 'completed' ? 'bg-success/10 text-success' :
                                                app.applicationStatus === 'rejected' ? 'bg-error/10 text-error' :
                                                    'bg-warning/10 text-warning'
                                            }`}>
                                            {app.applicationStatus}
                                        </div>
                                    </td>
                                    <td className="pr-6 py-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => { setSelectedApp(app); setShowDetailsModal(true); }} className="btn btn-ghost btn-sm btn-square hover:bg-gray-100" title="Details">
                                                <Eye size={16} className="text-text-muted" />
                                            </button>
                                            {app.applicationStatus === 'pending' && (
                                                <>
                                                    <button onClick={() => handleEdit(app)} className="btn btn-ghost btn-sm btn-square hover:bg-blue-50 hover:text-primary" title="Edit">
                                                        <Edit size={16} />
                                                    </button>
                                                    {app.paymentStatus === 'unpaid' && (
                                                        <button onClick={() => handlePay(app)} className="btn btn-ghost btn-sm btn-square hover:bg-green-50 hover:text-success" title="Pay">
                                                            <DollarSign size={16} />
                                                        </button>
                                                    )}
                                                    <button onClick={() => handleDelete(app._id)} className="btn btn-ghost btn-sm btn-square hover:bg-red-50 hover:text-error" title="Delete">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </>
                                            )}
                                            {app.applicationStatus === 'completed' && (
                                                <button onClick={() => { setSelectedApp(app); setShowReviewModal(true); }} className="btn btn-ghost btn-sm btn-square hover:bg-yellow-50 hover:text-warning" title="Add Review">
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
                <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm transition-opacity" onClick={() => setShowDetailsModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 border border-white/20" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-gray-50/50 p-6 border-b border-border flex justify-between items-center">
                            <h2 className="text-xl font-bold text-text-main">Application Details</h2>
                            <button onClick={() => setShowDetailsModal(false)} className="btn btn-ghost btn-sm btn-circle text-text-muted hover:bg-gray-100">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 text-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    <div className="text-text-muted font-medium">Status</div>
                                    <div className={`font-bold capitalize ${selectedApp.applicationStatus === 'completed' ? 'text-success' : selectedApp.applicationStatus === 'rejected' ? 'text-error' : 'text-warning'}`}>{selectedApp.applicationStatus}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-text-muted font-medium">Applied Date</div>
                                    <div className="font-semibold text-text-main text-base">{new Date(selectedApp.applicationDate).toLocaleDateString()}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-text-muted font-medium">Payment</div>
                                    <div className={`font-bold capitalize ${selectedApp.paymentStatus === 'paid' ? 'text-success' : 'text-error'}`}>{selectedApp.paymentStatus}</div>
                                </div>
                                <div className="col-span-1 sm:col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <span className="text-text-muted font-medium">Application Fees</span>
                                        <span className="font-bold text-text-main">${selectedApp.applicationFees}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-text-muted font-medium">Service Charge</span>
                                        <span className="font-bold text-text-main">${selectedApp.serviceCharge}</span>
                                    </div>
                                </div>
                                <div className="col-span-1 sm:col-span-2 space-y-1">
                                    <div className="text-text-muted font-medium">Feedback</div>
                                    <div className="p-3 bg-blue-50/50 rounded-lg text-text-main text-sm italic border border-blue-100/50">
                                        {selectedApp.feedback || 'No feedback yet'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-border pt-4">
                            <button onClick={() => setShowDetailsModal(false)} className="btn btn-primary w-full">Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Review Modal */}
            {showReviewModal && selectedApp && (
                <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm transition-opacity" onClick={() => setShowReviewModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200 border border-white/20" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <h2 className="text-xl font-bold text-text-main">Add Review</h2>
                            <button onClick={() => setShowReviewModal(false)} className="btn btn-ghost btn-sm btn-circle text-text-muted hover:bg-gray-100">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-text-main mb-2">Rating</label>
                                <div className="rating rating-lg gap-1">
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <input
                                            key={num}
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-warning"
                                            checked={reviewData.rating === num}
                                            onChange={() => setReviewData({ ...reviewData, rating: num })}
                                        />
                                    ))}
                                </div>
                                <div className="text-xs text-text-muted mt-1 ml-1">{reviewData.rating} out of 5 stars</div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text-main mb-2">Comment</label>
                                <textarea
                                    value={reviewData.comment}
                                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                                    rows="4"
                                    className="textarea textarea-bordered w-full focus:border-primary focus:outline-none text-base"
                                    placeholder="Share your experience..."
                                />
                            </div>
                        </div>
                        <div className="p-6 border-t border-border flex gap-3">
                            <button onClick={() => setShowReviewModal(false)} className="btn btn-ghost bg-gray-100 hover:bg-gray-200 flex-1">Cancel</button>
                            <button onClick={handleAddReview} className="btn btn-primary flex-1">Submit Review</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Application Modal */}
            {showEditModal && selectedApp && (
                <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm transition-opacity" onClick={() => setShowEditModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200 border border-white/20" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <h2 className="text-xl font-bold text-text-main">Edit Application</h2>
                            <button onClick={() => setShowEditModal(false)} className="btn btn-ghost btn-sm btn-circle text-text-muted hover:bg-gray-100">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateApplication} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-text-main mb-2">University</label>
                                <input type="text" value={selectedApp.universityName} disabled className="input input-bordered w-full bg-gray-50 text-text-muted" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text-main mb-2">Applicant Name</label>
                                <input
                                    type="text"
                                    value={editFormData.userName}
                                    onChange={(e) => setEditFormData({ ...editFormData, userName: e.target.value })}
                                    className="input input-bordered w-full focus:border-primary focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text-main mb-2">Applicant Email</label>
                                <input
                                    type="email"
                                    value={editFormData.userEmail}
                                    onChange={(e) => setEditFormData({ ...editFormData, userEmail: e.target.value })}
                                    className="input input-bordered w-full focus:border-primary focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="pt-4 flex gap-3 mt-2">
                                <button type="button" onClick={() => setShowEditModal(false)} className="btn btn-ghost bg-gray-100 hover:bg-gray-200 flex-1">Cancel</button>
                                <button type="submit" className="btn btn-primary flex-1">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyApplications;
