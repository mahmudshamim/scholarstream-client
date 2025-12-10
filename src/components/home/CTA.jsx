import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section style={{
            padding: '4rem 1rem',
            position: 'relative',
            margin: '2rem 1rem',
            borderRadius: '32px',
            overflow: 'hidden'
        }}>
            {/* Background with Gradient */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(120deg, #4f46e5 0%, #7c3aed 100%)',
                zIndex: -1
            }}></div>

            {/* Abstract Shapes */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: -1 }}>
                <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
            </div>

            <div className="container" style={{ textAlign: 'center', color: 'white', position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
                <h2 className="cta-title" style={{
                    fontSize: '3rem',
                    fontWeight: '800',
                    marginBottom: '1.5rem',
                    lineHeight: '1.2'
                }}>
                    Find Your Dream Scholarship <br className="desktop-br" /> in Minutes, Not Months
                </h2>
                <p className="cta-description" style={{
                    fontSize: '1.25rem',
                    opacity: '0.9',
                    marginBottom: '3rem',
                    maxWidth: '600px',
                    margin: '0 auto 3rem',
                    lineHeight: '1.6'
                }}>
                    Join over 50,000 students who have found funding for their education.
                    Safe, secure, and verified opportunities.
                </p>

                <div className="cta-buttons" style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Link to="/register" className="btn cta-btn-primary" style={{
                        background: 'white',
                        color: 'var(--primary)',
                        padding: '1rem 2rem',
                        fontSize: '1.1rem',
                        borderRadius: '50px',
                        fontWeight: '700',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        whiteSpace: 'nowrap'
                    }}>
                        Get Started Free
                    </Link>
                    <Link to="/scholarships" className="btn cta-btn-secondary" style={{
                        background: 'transparent',
                        color: 'white',
                        border: '2px solid rgba(255,255,255,0.3)',
                        padding: '1rem 2rem',
                        fontSize: '1.1rem',
                        borderRadius: '50px',
                        backdropFilter: 'blur(4px)',
                        whiteSpace: 'nowrap'
                    }}>
                        Browse Scholarships
                    </Link>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .cta-title {
                        font-size: 2rem !important;
                    }
                    .cta-description {
                        font-size: 1rem !important;
                        margin-bottom: 2rem !important;
                    }
                    .cta-buttons {
                        flex-direction: column !important;
                        align-items: stretch !important;
                    }
                    .cta-btn-primary,
                    .cta-btn-secondary {
                        width: 100% !important;
                        justify-content: center !important;
                    }
                    .desktop-br {
                        display: none;
                    }
                }
                @media (max-width: 480px) {
                    .cta-title {
                        font-size: 1.75rem !important;
                    }
                    .cta-btn-primary,
                    .cta-btn-secondary {
                        padding: 0.875rem 1.5rem !important;
                        font-size: 1rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default CTA;
