import React, { useEffect, useState } from 'react';
import { Star, Edit, Trash2, X } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import { reviewsAPI } from '../../../services/api';

const MyReviews = () => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Edit Modal State
    const [editModal, setEditModal] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [editForm, setEditForm] = useState({ rating: 5, comment: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, [user]);

    const fetchReviews = async () => {
        if (user?.email) {
            try {
                const res = await reviewsAPI.getUserReviews(user.email);
                setReviews(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch reviews", err);
                setLoading(false);
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await reviewsAPI.deleteReview(id);
                fetchReviews();
                alert('Review deleted successfully');
            } catch (err) {
                console.error("Delete failed", err);
                alert('Failed to delete review');
            }
        }
    };

    const openEditModal = (review) => {
        setEditingReview(review);
        setEditForm({ rating: review.rating, comment: review.comment });
        setEditModal(true);
    };

    const closeEditModal = () => {
        setEditModal(false);
        setEditingReview(null);
        setEditForm({ rating: 5, comment: '' });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await reviewsAPI.updateReview(editingReview._id, {
                rating: editForm.rating,
                comment: editForm.comment
            });
            closeEditModal();
            fetchReviews();
            alert('Review updated successfully');
        } catch (err) {
            console.error("Update failed", err);
            alert('Failed to update review');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm min-h-[400px]">
            <h1 className="text-2xl font-bold text-text-main mb-6">My Reviews</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-12 text-text-muted">Loading reviews...</div>
                ) : reviews.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-text-muted">No reviews found. Complete an application to leave reviews!</div>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="border border-border rounded-xl p-6 relative hover:shadow-md transition-shadow flex flex-col justify-between bg-white group">
                            <div>
                                <h3 className="font-bold text-lg text-text-main mb-1 line-clamp-1" title={review.scholarshipName}>
                                    {review.scholarshipName || 'Scholarship Review'}
                                </h3>
                                <p className="text-sm text-text-muted mb-3 line-clamp-1">
                                    {review.universityName}
                                </p>
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < review.rating ? "#f59e0b" : "none"} className={i < review.rating ? "text-warning" : "text-gray-300"} />
                                    ))}
                                    <span className="text-xs text-text-muted ml-2">
                                        {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : ''}
                                    </span>
                                </div>
                                <p className="text-text-muted text-sm leading-relaxed italic border-l-2 border-gray-100 pl-3 line-clamp-4">"{review.comment}"</p>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex justify-end gap-2 pt-4 border-t border-gray-50">
                                <button
                                    onClick={() => openEditModal(review)}
                                    className="btn btn-ghost btn-xs sm:btn-sm hover:bg-blue-50 hover:text-primary gap-1"
                                >
                                    <Edit size={14} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="btn btn-ghost btn-xs sm:btn-sm hover:bg-red-50 text-error hover:border-red-100 gap-1"
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Edit Modal */}
            {editModal && (
                <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm transition-opacity" onClick={closeEditModal}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200 border border-white/20" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6 border-b border-border flex justify-between items-center bg-gray-50/50 rounded-t-2xl">
                            <h2 className="text-xl font-bold text-text-main">Edit Review</h2>
                            <button
                                onClick={closeEditModal}
                                className="btn btn-ghost btn-sm btn-circle text-text-muted hover:bg-gray-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-text-main mb-3">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setEditForm({ ...editForm, rating: star })}
                                            className="focus:outline-none focus:scale-110 transition-transform"
                                        >
                                            <Star
                                                size={32}
                                                fill={star <= editForm.rating ? "#f59e0b" : "none"}
                                                className={star <= editForm.rating ? "text-warning drop-shadow-sm" : "text-gray-300"}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <div className="text-xs text-text-muted mt-2 ml-1 font-medium">{editForm.rating} out of 5 stars</div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-text-main mb-2">Comment</label>
                                <textarea
                                    value={editForm.comment}
                                    onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                                    rows={5}
                                    className="textarea textarea-bordered w-full text-base focus:border-primary focus:outline-none leading-relaxed"
                                    placeholder="Write your review..."
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={closeEditModal} className="btn btn-ghost bg-gray-100 hover:bg-gray-200 font-medium">Cancel</button>
                                <button type="submit" className="btn btn-primary text-white min-w-[120px]" disabled={saving}>
                                    {saving ? <span className="loading loading-spinner loading-xs"></span> : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
