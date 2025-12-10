import React from 'react';
import ScholarshipCard from '../scholarship/ScholarshipCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section style={{ padding: '4rem 0', background: 'var(--bg-card)' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="featured-header"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}
                >
                    <div>
                        <h2 className="featured-title" style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Featured Opportunities</h2>
                        <p className="featured-subtitle" style={{ color: 'var(--text-muted)' }}>Top picked scholarships for you this week.</p>
                    </div>
                    <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="view-all-btn">
                        <Link to="/scholarships" className="btn btn-ghost">
                            View All <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}
                >
                    {scholarships.map((sch, index) => (
                        <motion.div
                            key={sch._id}
                            variants={cardVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        >
                            <ScholarshipCard scholarship={sch} />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ textAlign: 'center', marginTop: '3rem' }}
                >
                    <Link to="/scholarships" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>
                        Load More Scholarships
                    </Link>
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .featured-header {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 1rem;
                    }
                    .featured-title {
                        font-size: 1.75rem !important;
                    }
                    .featured-subtitle {
                        font-size: 0.95rem !important;
                    }
                    .view-all-btn {
                        align-self: flex-end;
                    }
                }
                @media (max-width: 480px) {
                    .featured-title {
                        font-size: 1.5rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default FeaturedScholarships;
