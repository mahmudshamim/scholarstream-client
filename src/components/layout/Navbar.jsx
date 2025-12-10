import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, User } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { getDashboardRoute } from '../../utils/dashboardHelper';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logOut } = useAuth();

    const handleDashboardClick = async (e) => {
        e.preventDefault();
        if (user?.email) {
            const dashboardRoute = await getDashboardRoute(user.email);
            navigate(dashboardRoute);
            setIsMobileMenuOpen(false);
        }
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                setShowProfileMenu(false);
                setIsMobileMenuOpen(false);
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

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'All Scholarships', path: '/scholarships' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
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
                    <Link to="/" className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 1001 }}>
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

                    {/* Desktop Navigation */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
                        <div style={{ display: 'flex', gap: '2rem' }}>
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

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            {user ? (
                                <>
                                    <button onClick={handleDashboardClick} className="btn btn-ghost" style={{ padding: '0.5rem 1rem' }}>
                                        Dashboard
                                    </button>
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

                    {/* Mobile Toggle Button */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{
                            display: 'none',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            color: 'var(--text-main)',
                            zIndex: 1001
                        }}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 'var(--nav-height)',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999,
                        animation: 'fadeIn 0.3s ease'
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Panel */}
            <div
                className="mobile-menu"
                style={{
                    position: 'fixed',
                    top: 'var(--nav-height)',
                    left: 0,
                    right: 0,
                    background: 'white',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 1000,
                    maxHeight: isMobileMenuOpen ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                    display: 'none'
                }}
            >
                <div style={{ padding: '1.5rem' }}>
                    {/* Mobile Nav Links */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    color: isActive(link.path) ? 'var(--primary)' : 'var(--text-main)',
                                    fontWeight: isActive(link.path) ? '600' : '500',
                                    background: isActive(link.path) ? 'rgba(79, 70, 229, 0.05)' : 'transparent'
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Auth Section */}
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        {user ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)', flexShrink: 0 }}>
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt={user.displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600' }}>
                                                {user.displayName?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{user.displayName || 'User'}</p>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{user.email}</p>
                                    </div>
                                </div>
                                <button onClick={handleDashboardClick} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                    Dashboard
                                </button>
                                <button onClick={handleLogout} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', color: 'var(--error)' }}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <Link to="/login" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Log In</Link>
                                <Link to="/register" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    .mobile-toggle {
                        display: block !important;
                    }
                    .mobile-menu {
                        display: block !important;
                    }
                }
                @media (min-width: 769px) {
                    .desktop-nav {
                        display: flex !important;
                    }
                    .mobile-toggle {
                        display: none !important;
                    }
                    .mobile-menu {
                        display: none !important;
                    }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </>
    );
};

export default Navbar;
