import React from 'react';

const TrustedBy = () => {
    // Matching the screenshot order: Oxford, Stanford, MIT, Cambridge, Yale, Harvard
    const universities = [
        { name: 'Oxford', logo: 'https://logo.clearbit.com/ox.ac.uk' },
        { name: 'Stanford', logo: 'https://logo.clearbit.com/stanford.edu' },
        { name: 'MIT', logo: 'https://logo.clearbit.com/mit.edu' },
        { name: 'Cambridge', logo: 'https://logo.clearbit.com/cam.ac.uk' },
        { name: 'Yale', logo: 'https://logo.clearbit.com/yale.edu' },
        { name: 'Harvard', logo: 'https://logo.clearbit.com/harvard.edu' },
        // Extras to fill the carousel
        { name: 'Princeton', logo: 'https://logo.clearbit.com/princeton.edu' },
        { name: 'Columbia', logo: 'https://logo.clearbit.com/columbia.edu' },
    ];

    const marqueeItems = [...universities, ...universities];

    return (
        <section style={{ padding: '5rem 0', background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
            <div className="container" style={{ overflow: 'hidden' }}>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3.5rem', fontWeight: '500', fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                    Trusted by students admitted to world's top universities
                </p>

                <div className="marquee-container">
                    <div className="marquee-content" style={{ paddingLeft: '1rem' }}>
                        {marqueeItems.map((uni, idx) => (
                            <div key={idx} style={{
                                background: 'white',
                                padding: '1rem 2.5rem',
                                borderRadius: '100px',
                                border: '1px solid rgba(226, 232, 240, 0.8)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1.25rem',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 5px 10px -5px rgba(0, 0, 0, 0.02)', // Softer, deeper shadow like screenshot
                                minWidth: '220px',
                                height: '80px',
                                justifyContent: 'center',
                                userSelect: 'none',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 20px 30px -10px rgba(0, 0, 0, 0.08)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 5px 10px -5px rgba(0, 0, 0, 0.02)';
                                }}
                            >
                                <img
                                    src={uni.logo}
                                    alt={`${uni.name} Logo`}
                                    style={{ height: '36px', width: 'auto', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.6, transition: 'all 0.3s' }}
                                    onMouseOver={(e) => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.opacity = 1; }}
                                    onMouseOut={(e) => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = 0.6; }}
                                />
                                <span style={{ fontWeight: '700', color: '#334155', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>{uni.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
