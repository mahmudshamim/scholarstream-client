import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '4rem 0 2rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

                    {/* Brand */}
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                            Scholar<span className="gradient-text">Stream</span>
                        </h3>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>
                            Empowering students worldwide to achieve their academic dreams through accessible scholarship opportunities.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Platform</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
                            <li><a href="#">Browse Scholarships</a></li>
                            <li><a href="#">Universities</a></li>
                            <li><a href="#">Success Stories</a></li>
                            <li><a href="#">Pricing</a></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Resources</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Scholarship Guide</a></li>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Contact Support</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 style={{ fontWeight: '600', marginBottom: '1rem' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid var(--border)',
                    paddingTop: '2rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem'
                }}>
                    <p>© 2025 ScholarStream. All rights reserved.</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>Made with</span>
                        <Heart size={16} fill="var(--error)" color="var(--error)" />
                        <span>for students.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
