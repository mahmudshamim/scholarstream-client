import React, { useState } from 'react';
import { Search, MapPin, CheckCircle, ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/scholarships?q=${encodeURIComponent(searchQuery)}`);
        }
    };
    return (
        <div style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0 4rem', background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, rgba(255,255,255,0) 70%)' }}>

            {/* Abstract Blur Elements */}
            <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'rgba(79, 70, 229, 0.08)', filter: 'blur(80px)', borderRadius: '50%', zIndex: -1 }}></div>

            <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>

                {/* Badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '50px', background: 'white', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '0.85rem', fontWeight: '600' }}>
                    <span style={{ display: 'block', width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}></span>
                    The #1 Scholarship Platform
                </div>

                {/* Headline */}
                <h1 style={{ fontSize: '4rem', lineHeight: '1.1', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-1px', color: '#1e1b4b' }}>
                    Find Your Dream <br />
                    <span className="gradient-text">Scholarship Today</span>
                </h1>

                <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                    Discover thousands of fully funded opportunities at top universities worldwide.
                    Search by category, country, or degree level.
                </p>

                {/* Search Bar - Pill Shape */}
                <div style={{
                    background: 'white',
                    padding: '0.5rem',
                    borderRadius: '50px',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '650px',
                    width: '100%', // Ensure it takes full width on smaller screens
                    margin: '0 auto 2rem',
                    border: '1px solid var(--border)',
                    flexWrap: 'wrap', // Allow wrapping on very small screens if needed
                }}>
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
                    <button
                        className="btn btn-primary"
                        onClick={handleSearch}
                        style={{ borderRadius: '40px', padding: '0.75rem 2rem', flexShrink: 0 }}
                    >
                        Search
                    </button>
                </div>

                {/* Trending Tags */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>Trending:</span>
                    {['Engineering', 'MBA', 'Masters', 'UK', 'Full Ride'].map((tag, idx) => (
                        <span key={idx} style={{
                            background: 'white', border: '1px solid var(--border)', padding: '0.25rem 0.75rem', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.2s'
                        }} className="hover:border-primary hover:text-primary">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Stats Row */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: '3rem', maxWidth: '800px', margin: '0 auto' }}>
                    {[
                        { label: 'Scholarships', value: '10,000+', icon: CheckCircle },
                        { label: 'Countries', value: '150+', icon: MapPin },
                        { label: 'Funded', value: '$2B+', icon: TrendingUp }
                    ].map((stat, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e1b4b', lineHeight: 1 }}>{stat.value}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
