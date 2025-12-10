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
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            <nav className={`
                fixed top-0 left-0 right-0 z-50 flex items-center transition-all duration-300
                ${isScrolled
                    ? 'h-[70px] bg-white/85 backdrop-blur-xl border-b border-white/30 shadow-sm'
                    : 'h-20 bg-white'
                }
            `}>
                <div className="container flex justify-between items-center w-full">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 z-50">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white">
                            <GraduationCap size={24} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">
                            Scholar<span className="gradient-text">Stream</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`transition-colors ${isActive(link.path)
                                            ? 'text-primary font-semibold'
                                            : 'text-text-main hover:text-primary font-medium'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex gap-4 items-center">
                            {user ? (
                                <>
                                    <button onClick={handleDashboardClick} className="btn btn-ghost px-4 py-2">
                                        Dashboard
                                    </button>
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary cursor-pointer bg-transparent p-0"
                                        >
                                            {user.photoURL ? (
                                                <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={24} className="text-primary m-auto" />
                                            )}
                                        </button>
                                        {showProfileMenu && (
                                            <div className="absolute top-12 right-0 bg-white rounded-2xl shadow-lg p-2 min-w-[180px] z-50">
                                                <div className="p-3 border-b border-border">
                                                    <p className="font-semibold mb-1">{user.displayName || 'User'}</p>
                                                    <p className="text-sm text-text-muted">{user.email}</p>
                                                </div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full p-3 text-left text-error font-medium hover:bg-error/5 rounded-lg transition-colors"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn btn-ghost px-4 py-2">Log In</Link>
                                    <Link to="/register" className="btn btn-primary px-5 py-2 rounded-2xl">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Toggle Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-text-main z-50"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    style={{ top: 'var(--nav-height)' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Panel */}
            <div className={`
                fixed left-0 right-0 bg-white shadow-lg z-50 transition-all duration-300 overflow-hidden md:hidden
                ${isMobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}
            `} style={{ top: 'var(--nav-height)' }}>
                <div className="p-6">
                    {/* Mobile Nav Links */}
                    <div className="flex flex-col gap-2 mb-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`p-3 rounded-lg transition-colors ${isActive(link.path)
                                        ? 'text-primary font-semibold bg-primary/5'
                                        : 'text-text-main hover:bg-bg-body'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Auth Section */}
                    <div className="border-t border-border pt-6">
                        {user ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 p-3 bg-bg-card rounded-lg">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary shrink-0">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-primary flex items-center justify-center text-white font-semibold">
                                                {user.displayName?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{user.displayName || 'User'}</p>
                                        <p className="text-sm text-text-muted">{user.email}</p>
                                    </div>
                                </div>
                                <button onClick={handleDashboardClick} className="btn btn-primary w-full justify-center">
                                    Dashboard
                                </button>
                                <button onClick={handleLogout} className="btn btn-ghost w-full justify-center text-error">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <Link to="/login" className="btn btn-ghost w-full justify-center">Log In</Link>
                                <Link to="/register" className="btn btn-primary w-full justify-center">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
