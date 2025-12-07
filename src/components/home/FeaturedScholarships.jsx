import React from 'react';
import ScholarshipCard from '../scholarship/ScholarshipCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// MOCK_SCHOLARSHIPS removed in favor of real data
import { useEffect, useState } from 'react';
import { scholarshipsAPI } from '../../services/api';

const FeaturedScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                // Fetch top 6 scholarships
                const res = await scholarshipsAPI.getTop();
                // Slice to get top 6 for display if backend returns all or just rely on backend limit
                setScholarships(res.data); // Backend should handle Limit=6 (getTop function)
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch scholarships", error);
                setLoading(false);
            }
        };
        fetchScholarships();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading opportunities...</div>;
    }
    return (
        <section style={{ padding: '4rem 0', background: 'var(--bg-card)' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Featured Opportunities</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Top picked scholarships for you this week.</p>
                    </div>
                    <Link to="/scholarships" className="btn btn-secondary" style={{ display: 'none' /* hidden on mobile, need flex show on desktop. Will fix in css or keep it simple */ }}>
                        View All
                    </Link>
                    <Link to="/scholarships" className="btn btn-ghost">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {scholarships.map(sch => (
                        <ScholarshipCard key={sch._id} scholarship={sch} />
                    ))}
                </div>

                {/* Load More Button */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                    <Link to="/scholarships" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                        Load More Scholarships
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedScholarships;
