import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section style={{ padding: '6rem 0', position: 'relative', margin: '2rem 1rem', borderRadius: '32px', overflow: 'hidden' }}>
            {/* Background with Gradient */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(120deg, #4f46e5 0%, #7c3aed 100%)', // Indigo to Violet
                zIndex: -1
            }}></div>

            {/* Abstract Shapes */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: -1 }}>
                <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
            </div>

            <div className="container" style={{ textAlign: 'center', color: 'white', position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                    Find Your Dream Scholarship <br /> in Minutes, Not Months
                </h2>
                <p style={{ fontSize: '1.25rem', opacity: '0.9', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                    Join over 50,000 students who have found funding for their education.
                    Safe, secure, and verifed opportunities.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/register" className="btn" style={{
                        background: 'white', color: 'var(--primary)',
                        padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '50px', fontWeight: '700',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}>
                        Get Started Free
                    </Link>
                    <Link to="/scholarships" className="btn" style={{
                        background: 'transparent', color: 'white',
                        border: '2px solid rgba(255,255,255,0.3)',
                        padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '50px',
                        backdropFilter: 'blur(4px)'
                    }}>
                        Browse Scholarships
                    </Link>
                </div>

            </div>

            {/* Newsletter Section Overlap (Visual only as per screenshot vibe) */}
            <div className="container" style={{ marginTop: '6rem', maxWidth: '800px' }}>
                <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.3)', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>Stay Updated on New Scholarships</h3>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '0.5rem', borderRadius: '100px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
                        <Mail size={20} color="#94a3b8" style={{ marginLeft: '1rem', flexShrink: 0 }} />
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            style={{
                                flex: 1,
                                width: '100%',
                                border: 'none',
                                padding: '1rem',
                                outline: 'none',
                                fontSize: '1rem',
                                color: '#1e293b',
                                background: 'transparent',
                                minWidth: 0
                            }}
                        />
                        <button className="btn btn-primary" style={{ borderRadius: '50px', padding: '0.75rem 2rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
