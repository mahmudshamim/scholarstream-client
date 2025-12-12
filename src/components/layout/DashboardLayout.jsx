import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, User, Star, LogOut, Bell, Settings, Search, Menu, X, PlusCircle, Users, BarChart2 } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const DashboardLayout = ({ role = 'student' }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024; // lg breakpoint
            setIsMobile(mobile);
            if (mobile) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar on route change (mobile only)
    useEffect(() => {
        if (isMobile) setSidebarOpen(false);
    }, [location.pathname, isMobile]);

    const handleLogOut = async () => {
        await logOut();
        navigate('/login');
    };

    const studentLinks = [
        { name: 'Overview', path: '/dashboard/student', icon: LayoutDashboard },
        { name: 'My Applications', path: '/dashboard/student/applications', icon: FileText },
        { name: 'My Reviews', path: '/dashboard/student/reviews', icon: Star },
        { name: 'My Profile', path: '/dashboard/student/profile', icon: User },
    ];

    const adminLinks = [
        { name: 'Overview', path: '/dashboard/admin', icon: BarChart2 },
        { name: 'Applications', path: '/dashboard/admin/applications', icon: FileText },
        { name: 'Scholarships', path: '/dashboard/admin/scholarships', icon: FileText },
        { name: 'Users', path: '/dashboard/admin/users', icon: Users },
        { name: 'Add New', path: '/dashboard/admin/add-scholarship', icon: PlusCircle },
        { name: 'My Profile', path: '/dashboard/admin/profile', icon: User },
    ];

    const moderatorLinks = [
        { name: 'Overview', path: '/dashboard/moderator', icon: LayoutDashboard },
        { name: 'Applications', path: '/dashboard/moderator/applications', icon: FileText },
        { name: 'Reviews', path: '/dashboard/moderator/reviews', icon: Star },
        { name: 'My Profile', path: '/dashboard/moderator/profile', icon: User },
    ];

    const links = role === 'admin' ? adminLinks : role === 'moderator' ? moderatorLinks : studentLinks;

    return (
        <div className="flex min-h-screen bg-bg-body font-sans text-text-main">
            {/* Mobile Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity backdrop-blur-sm"
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 z-50 h-screen bg-white border-r border-border
                flex flex-col transition-all duration-300 ease-in-out
                ${isMobile
                    ? (isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64')
                    : (isSidebarOpen ? 'w-64' : 'w-20')
                }
                ${isMobile && isSidebarOpen ? 'shadow-2xl' : ''}
            `}>
                {/* Sidebar Header */}
                <div className={`h-[70px] flex items-center ${!isMobile && !isSidebarOpen ? 'justify-center' : 'justify-between px-6'} border-b border-border`}>
                    {(!isMobile && !isSidebarOpen) ? (
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">S</div>
                    ) : (
                        <Link to="/" className="text-xl font-extrabold tracking-tight truncate">
                            Scholar<span className="text-primary">Stream</span>
                        </Link>
                    )}

                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className={`text-text-muted hover:text-primary p-2 transition-colors rounded-lg hover:bg-gray-100 ${isMobile ? 'block' : 'hidden lg:block'}`}
                    >
                        {isMobile ? <X size={20} /> : (isSidebarOpen ? <Menu size={20} /> : <Menu size={20} />)}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
                    {links.map(link => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === `/dashboard/${role}`}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                                ${isActive
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'text-text-muted hover:bg-gray-100 hover:text-text-main'
                                }
                                ${!isMobile && !isSidebarOpen ? 'justify-center' : ''}
                            `}
                            title={!isMobile && !isSidebarOpen ? link.name : ''}
                        >
                            <link.icon size={20} className="shrink-0" />
                            {(!isMobile && !isSidebarOpen) ? null : <span className="font-medium truncate">{link.name}</span>}
                        </NavLink>
                    ))}
                </nav>

                {/* User Profile in Sidebar Bottom */}
                <div className="p-4 border-t border-border">
                    <div className={`flex items-center gap-3 ${!isMobile && !isSidebarOpen ? 'justify-center' : ''}`}>
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 overflow-hidden border border-border">
                            {user?.photoURL
                                ? <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                : <User size={20} />
                            }
                        </div>
                        {(!isMobile && !isSidebarOpen) ? null : (
                            <div className="flex-1 overflow-hidden">
                                <div className="font-semibold text-sm truncate text-text-main">{user?.displayName || 'User'}</div>
                                <div className="text-xs text-text-muted capitalize truncate">{role}</div>
                            </div>
                        )}
                        {(!isMobile && !isSidebarOpen) ? null : (
                            <button onClick={handleLogOut} className="text-text-muted hover:text-error transition-colors p-2 rounded-lg hover:bg-red-50" title="Logout">
                                <LogOut size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                {/* Topbar */}
                <header className="h-[70px] bg-white border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-4">
                        {isMobile && (
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="text-text-main hover:text-primary p-2 transition-colors rounded-lg hover:bg-gray-100"
                            >
                                <Menu size={24} />
                            </button>
                        )}
                        <h2 className="text-lg md:text-xl font-bold capitalize text-text-main truncate">
                            {location.pathname.split('/').pop().replace(/-/g, ' ') || 'Overview'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Search - hidden on mobile */}
                        <div className="hidden md:block relative">
                            <Search size={18} className="absolute top-2.5 left-3 text-text-muted" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 rounded-full border border-border text-sm w-48 lg:w-64 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all bg-gray-50 focus:bg-white"
                            />
                        </div>
                        <button className="relative text-text-muted hover:text-primary p-2 transition-colors rounded-full hover:bg-gray-100">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-white"></span>
                        </button>
                        <button className="text-text-muted hover:text-primary p-2 transition-colors rounded-full hover:bg-gray-100">
                            <Settings size={20} />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto bg-gray-50/50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
