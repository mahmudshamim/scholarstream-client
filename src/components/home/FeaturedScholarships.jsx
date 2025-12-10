import React, { useEffect, useState } from 'react';
import ScholarshipCard from '../scholarship/ScholarshipCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scholarshipsAPI } from '../../services/api';

const FeaturedScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const res = await scholarshipsAPI.getTop();
                setScholarships(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch scholarships", error);
                setLoading(false);
            }
        };
        fetchScholarships();
    }, []);

    if (loading) {
        return <div className="text-center py-16">Loading opportunities...</div>;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
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
        <section className="py-16 bg-bg-card">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8"
                >
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Opportunities</h2>
                        <p className="text-text-muted text-sm md:text-base">Top picked scholarships for you this week.</p>
                    </div>
                    <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
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
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {scholarships.map((sch) => (
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
                    className="text-center mt-12"
                >
                    <Link to="/scholarships" className="btn btn-primary px-10 py-4">
                        Load More Scholarships
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedScholarships;
