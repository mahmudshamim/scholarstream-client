import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/scholarships?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const statsVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0 4rem', background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, rgba(255,255,255,0) 70%)' }}>

            {/* Abstract Blur Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.08, 0.12, 0.08]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'rgba(79, 70, 229, 0.08)', filter: 'blur(80px)', borderRadius: '50%', zIndex: -1 }}
            ></motion.div>

            <motion.div
                className="container"
                style={{ textAlign: 'center', maxWidth: '900px' }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Badge */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '50px', background: 'white', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '0.85rem', fontWeight: '600' }}
                >
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ display: 'block', width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}
                    ></motion.span>
                    The #1 Scholarship Platform
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={itemVariants}
                    className="hero-title"
                    style={{ fontSize: '4rem', lineHeight: '1.1', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-1px', color: '#1e1b4b' }}
                >
                    Find Your Dream <br />
                    <span className="gradient-text">Scholarship Today</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 2.5rem' }}
                >
                    Discover thousands of fully funded opportunities at top universities worldwide.
                    Search by category, country, or degree level.
                </motion.p>

                {/* Search Bar - Pill Shape */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -10px rgba(0,0,0,0.15)' }}
                    style={{
                        background: 'white',
                        padding: '0.5rem',
                        borderRadius: '50px',
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        maxWidth: '650px',
                        width: '100%',
                        margin: '0 auto 2rem',
                        border: '1px solid var(--border)',
                        flexWrap: 'wrap',
                    }}
                >
                    <div style={{ paddingLeft: '1.5rem', display: 'flex', alignItems: 'center', color: 'var(--text-muted)', flexShrink: 0 }}>
                        <Search size={22} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search scholarships..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        style={{
                            flex: 1,
                            border: 'none',
                            padding: '1rem',
                            fontSize: '1rem',
                            outline: 'none',
                            background: 'transparent',
                            minWidth: 0,
                        }}
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary"
                        onClick={handleSearch}
                        style={{ borderRadius: '40px', padding: '0.75rem 2rem', flexShrink: 0 }}
                    >
                        Search
                    </motion.button>
                </motion.div>

                {/* Trending Tags */}
                <motion.div
                    variants={itemVariants}
                    style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}
                >
                    <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>Trending:</span>
                    {['Engineering', 'MBA', 'Masters', 'UK', 'Full Ride'].map((tag, idx) => (
                        <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + (idx * 0.1), duration: 0.3 }}
                            whileHover={{ scale: 1.1, borderColor: 'var(--primary)', color: 'var(--primary)' }}
                            style={{
                                background: 'white',
                                border: '1px solid var(--border)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    variants={itemVariants}
                    className="hero-stats"
                    style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: '3rem', maxWidth: '800px', margin: '0 auto' }}
                >
                    {[
                        { label: 'Scholarships', value: '10,000+', icon: CheckCircle },
                        { label: 'Countries', value: '150+', icon: MapPin },
                        { label: 'Funded', value: '$2B+', icon: TrendingUp }
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            variants={statsVariants}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="stat-item"
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'default' }}
                        >
                            <div className="stat-value" style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e1b4b', lineHeight: 1 }}>{stat.value}</div>
                            <div className="stat-label" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            <style>{`
                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 2.5rem !important;
                    }
                    .hero-stats {
                        gap: 1.5rem !important;
                        padding-top: 2rem !important;
                        flex-wrap: nowrap !important;
                    }
                    .stat-item {
                        min-width: auto !important;
                        flex: 1;
                    }
                    .stat-value {
                        font-size: 1.5rem !important;
                    }
                    .stat-label {
                        font-size: 0.75rem !important;
                    }
                }
                @media (max-width: 480px) {
                    .hero-title {
                        font-size: 2rem !important;
                    }
                    .hero-stats {
                        gap: 1rem !important;
                    }
                    .stat-value {
                        font-size: 1.25rem !important;
                    }
                    .stat-label {
                        font-size: 0.7rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Hero;
