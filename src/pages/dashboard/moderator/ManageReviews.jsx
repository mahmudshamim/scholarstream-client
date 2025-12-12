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
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm min-h-[400px]">
            <h1 className="text-2xl font-bold text-text-main mb-6">Moderate Reviews</h1>

            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-12 text-text-muted">Loading reviews...</div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-12 text-text-muted">No reviews to moderate.</div>
                ) : (
                    reviews.map((item) => (
                        <div key={item._id} className="border border-border rounded-lg p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-sm transition-shadow bg-white">
                            <div className="space-y-2 flex-grow">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-semibold text-text-main">{item.userName || item.userEmail}</span>
                                    <span className="text-xs text-text-muted hidden sm:inline">•</span>
                                    <span className="text-xs text-text-muted">{item.reviewDate ? new Date(item.reviewDate).toLocaleDateString() : 'Unknown Date'}</span>
                                </div>
                                <h4 className="text-primary font-medium text-lg">
                                    {item.scholarshipName}
                                    <span className="ml-2 text-sm text-text-muted font-normal">(Rating: {item.rating}/5)</span>
                                </h4>
                                <p className="text-text-muted text-sm italic border-l-2 border-gray-200 pl-3">"{item.comment}"</p>
                            </div>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="btn btn-sm btn-outline border-error text-error hover:bg-error hover:text-white hover:border-error gap-2 min-w-[100px]"
                            >
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageReviewsMod;
