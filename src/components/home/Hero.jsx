import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, TrendingUp } from 'lucide-react';
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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
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
        <div
            className="relative overflow-hidden py-24 pb-16"
            style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.12) 0%, rgba(79, 70, 229, 0.05) 30%, rgba(255,255,255,0) 60%)'
            }}
        >
            {/* Abstract Blur Elements */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full -z-10"
                style={{ background: 'rgba(139, 92, 246, 0.15)', filter: 'blur(100px)' }}
            />

            <motion.div
                className="container text-center max-w-4xl mx-auto px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Badge */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border shadow-sm text-primary mb-6 text-sm font-semibold"
                >
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="block w-2 h-2 bg-primary rounded-full"
                    />
                    The #1 Scholarship Platform
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-5xl lg:text-6xl leading-tight font-extrabold mb-6 tracking-tight text-[#1e1b4b]"
                >
                    Find Your Dream <br className="hidden sm:block" />
                    <span className="gradient-text">Scholarship Today</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-base md:text-lg text-text-muted mb-10 leading-relaxed max-w-xl mx-auto"
                >
                    Discover thousands of fully funded opportunities at top universities worldwide.
                    Search by category, country, or degree level.
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -10px rgba(0,0,0,0.15)' }}
                    className="bg-white p-2 rounded-full shadow-xl flex items-center max-w-2xl w-full mx-auto mb-8 border border-border flex-wrap sm:flex-nowrap"
                >
                    <div className="pl-4 sm:pl-6 flex items-center text-text-muted shrink-0">
                        <Search size={22} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search scholarships..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        className="flex-1 border-none p-3 sm:p-4 text-base outline-none bg-transparent min-w-0"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary rounded-full px-6 sm:px-8 py-3 shrink-0"
                        onClick={handleSearch}
                    >
                        Search
                    </motion.button>
                </motion.div>

                {/* Trending Tags */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center gap-2 sm:gap-4 flex-wrap mb-16 text-sm text-text-muted"
                >
                    <span className="font-semibold text-text-main">Trending:</span>
                    {['Engineering', 'MBA', 'Masters', 'UK', 'Full Ride'].map((tag, idx) => (
                        <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + (idx * 0.1), duration: 0.3 }}
                            whileHover={{ scale: 1.1, borderColor: '#4f46e5', color: '#4f46e5' }}
                            className="bg-white border border-border px-3 py-1 rounded-full cursor-pointer transition-all hover:border-primary hover:text-primary"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center gap-6 sm:gap-12 lg:gap-16 flex-wrap border-t border-border pt-12 max-w-3xl mx-auto"
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
                            className="flex flex-col items-center cursor-default flex-1 min-w-[80px]"
                        >
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1e1b4b] leading-none">{stat.value}</div>
                            <div className="text-text-muted text-xs sm:text-sm mt-2 flex items-center gap-1">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;
