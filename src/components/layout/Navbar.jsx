import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, User } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logOut } = useAuth();

    const handleLogout = () => {
        logOut()
            .then(() => {
                setShowProfileMenu(false);
                navigate('/');
            })
            .catch(err => console.error('Logout error:', err));
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'All Scholarships', path: '/scholarships' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`transition-all duration-300 ${isScrolled ? 'glass-panel' : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                height: isScrolled ? '70px' : 'var(--nav-height)',
                display: 'flex',
                alignItems: 'center',
                background: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'white',
                backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.3)' : 'none',
                boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <GraduationCap size={24} />
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
                        Scholar<span className="gradient-text">Stream</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex" style={{ display: 'none', gap: '2rem', alignItems: 'center' }}>
                    {/* Using media query in CSS or simple inline style fallback -> Using CSS classes assuming basic responsiveness or I should write simple inline media query logic or styles in index.css. 
             Since I'm sticking to Vanilla CSS as primary, I'll rely on the global CSS or simple logic. 
             Let's use a simple className and ensure index.css handles 'hidden md:flex' or just standard flex. 
             Actually, strict vanilla means I should probably add a class 'desktop-nav'.
          */}
                </div>

                {/* Re-doing the layout structure properly with CSS classes I will add to index.css or inline flex for now */}
                <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    color: isActive(link.path) ? 'var(--primary)' : 'var(--text-main)',
                                    fontWeight: isActive(link.path) ? '600' : '500',
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="auth-section" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {user ? (
                            <>
                                <Link to="/dashboard/student" className="btn btn-ghost" style={{ padding: '0.5rem 1rem' }}>
                                    Dashboard
                                </Link>
                                <div style={{ position: 'relative' }}>
                                    <button
                                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: '2px solid var(--primary)',
                                            cursor: 'pointer',
                                            background: 'transparent',
                                            padding: 0
                                        }}
                                    >
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt={user.displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <User size={24} color="var(--primary)" />
                                        )}
                                    </button>
                                    {showProfileMenu && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '50px',
                                            right: 0,
                                            background: 'white',
                                            borderRadius: 'var(--radius-md)',
                                            boxShadow: 'var(--shadow-lg)',
                                            padding: '0.5rem',
                                            minWidth: '180px',
                                            zIndex: 1000
                                        }}>
                                            <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                                                <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{user.displayName || 'User'}</p>
                                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{user.email}</p>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    textAlign: 'left',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: 'var(--error)',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-ghost" style={{ padding: '0.5rem 1rem' }}>Log In</Link>
                                <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-md)' }}>
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{ display: 'none' }} // Hidden on desktop, need media query
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay - To be improved with CSS classes */}
        </nav>
    );
};

export default Navbar;
