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
        <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '1.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>My Reviews</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {loading ? (
                    <div>Loading...</div>
                ) : reviews.length === 0 ? (
                    <div style={{ color: 'var(--text-muted)' }}>No reviews found. Complete an application to leave reviews!</div>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1.5rem', position: 'relative' }}>
                            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                                {review.scholarshipName || 'Scholarship Review'}
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                {review.universityName}
                            </p>
                            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < review.rating ? "#f59e0b" : "none"} color={i < review.rating ? "#f59e0b" : "#cbd5e1"} />
                                ))}
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                                    {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : ''}
                                </span>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>"{review.comment}"</p>

                            {/* Actions */}
                            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => openEditModal(review)}
                                    className="btn btn-ghost"
                                    style={{ padding: '0.25rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                >
                                    <Edit size={16} /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="btn btn-ghost"
                                    style={{ padding: '0.25rem 0.5rem', color: 'red', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Edit Modal */}
            {editModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: 'white', borderRadius: 'var(--radius-md)', padding: '2rem',
                        maxWidth: '500px', width: '90%', position: 'relative'
                    }}>
                        <button
                            onClick={closeEditModal}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <X size={20} />
                        </button>

                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Edit Review</h2>

                        <form onSubmit={handleEditSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Rating</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setEditForm({ ...editForm, rating: star })}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                        >
                                            <Star
                                                size={28}
                                                fill={star <= editForm.rating ? "#f59e0b" : "none"}
                                                color={star <= editForm.rating ? "#f59e0b" : "#cbd5e1"}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Comment</label>
                                <textarea
                                    value={editForm.comment}
                                    onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                                    rows={4}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontFamily: 'inherit' }}
                                    placeholder="Write your review..."
                                    required
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" onClick={closeEditModal} className="btn btn-ghost">Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={saving}>
                                    {saving ? 'Saving...' : 'Save Changes'}
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
