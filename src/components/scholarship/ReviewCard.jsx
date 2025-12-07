import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';

const ReviewCard = ({ review }) => {
    return (
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ fontWeight: '600' }}>{review.user}</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{review.date}</span>
            </div>

            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem' }}>
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? "#f59e0b" : "none"} color={i < review.rating ? "#f59e0b" : "#cbd5e1"} />
                ))}
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1rem' }}>
                {review.comment}
            </p>

            <button className="btn-ghost" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <ThumbsUp size={14} /> Helpful ({review.helpful})
            </button>
        </div>
    );
};

export default ReviewCard;
