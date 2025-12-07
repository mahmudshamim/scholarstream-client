import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { apiSecure } from '../../../services/api';

const ManageReviewsMod = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const res = await apiSecure.get('/all-reviews');
            setReviews(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch reviews", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Delete this review?")) {
            try {
                await apiSecure.delete(`/reviews/${id}`);
                fetchReviews();
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    };
    return (
        <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '1.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Moderate Reviews</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : reviews.map((item) => (
                        <div key={item._id} style={{ border: '1px solid var(--border)', padding: '1rem', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {item.userName || item.userEmail}
                                    {/* Assuming we don't have 'flag' data yet, or mock it */}
                                </div>
                                <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>{item.scholarshipName} (Rating: {item.rating})</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0.5rem 0' }}>"{item.comment}"</p>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.reviewDate ? new Date(item.reviewDate).toLocaleDateString() : ''}</span>
                            </div>
                            <button onClick={() => handleDelete(item._id)} className="btn btn-secondary" style={{ color: 'var(--error)', borderColor: 'var(--error)' }}>
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageReviewsMod;
