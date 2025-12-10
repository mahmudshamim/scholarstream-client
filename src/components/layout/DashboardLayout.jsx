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
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setSidebarOpen(!mobile);
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
        { name: 'Scholarships', path: '/dashboard/admin/scholarships', icon: FileText },
        { name: 'Users', path: '/dashboard/admin/users', icon: Users },
        { name: 'Add New', path: '/dashboard/admin/add', icon: PlusCircle },
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
        <div className="flex min-h-screen bg-bg-body">
            {/* Mobile Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                />
            )}

            {/* Sidebar */}
            <aside className={`
                ${isMobile ? 'fixed z-50' : 'sticky'} 
                ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
                ${isSidebarOpen ? 'w-64' : 'w-20'}
                top-0 h-screen bg-white border-r border-border
                flex flex-col transition-all duration-300
                ${isMobile && isSidebarOpen ? 'shadow-2xl' : ''}
            `}>
                {/* Sidebar Header */}
                <div className={`h-[70px] flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} px-6 border-b border-border`}>
                    {isSidebarOpen && (
                        <Link to="/" className="text-xl font-extrabold tracking-tight">
                            Scholar<span className="gradient-text">Stream</span>
                        </Link>
                    )}
                    <button
                        onClick={() => isMobile ? setSidebarOpen(false) : setSidebarOpen(!isSidebarOpen)}
                        className="text-text-muted hover:text-primary p-2 transition-colors"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 flex flex-col gap-1">
                    {links.map(link => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === `/dashboard/${role}`}
                            className={({ isActive }) => `
                                flex items-center gap-4 px-4 py-3 rounded-lg transition-all
                                ${isActive
                                    ? 'text-primary bg-primary/5 font-semibold'
                                    : 'text-text-muted hover:text-primary hover:bg-primary/5'
                                }
                                ${isSidebarOpen ? 'justify-start' : 'justify-center'}
                            `}
                        >
                            <link.icon size={20} />
                            {isSidebarOpen && <span>{link.name}</span>}
                        </NavLink>
                    ))}
                </nav>

                {/* User Profile in Sidebar Bottom */}
                <div className="p-4 border-t border-border">
                    <div className={`flex items-center gap-3 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white shrink-0 overflow-hidden">
                            {user?.photoURL
                                ? <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                : user?.displayName?.charAt(0) || 'U'
                            }
                        </div>
                        {isSidebarOpen && (
                            <div className="flex-1 overflow-hidden">
                                <div className="font-semibold text-sm truncate">{user?.displayName || 'User'}</div>
                                <div className="text-xs text-text-muted capitalize">{role}</div>
                            </div>
                        )}
                        {isSidebarOpen && (
                            <button onClick={handleLogOut} className="text-text-muted hover:text-error transition-colors p-2">
                                <LogOut size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-[70px] bg-white border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        {isMobile && (
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="text-text-main hover:text-primary p-2 transition-colors"
                            >
                                <Menu size={24} />
                            </button>
                        )}
                        <h2 className="text-base md:text-xl font-bold capitalize">
                            {location.pathname.split('/').pop().replace('-', ' ') || 'Overview'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        {/* Search - hidden on mobile */}
                        <div className="hidden md:block relative">
                            <Search size={18} className="absolute top-2.5 left-3 text-text-muted" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 rounded-full border border-border text-sm w-52 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                        <button className="relative text-text-muted hover:text-primary p-2 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
                        </button>
                        <button className="text-text-muted hover:text-primary p-2 transition-colors">
                            <Settings size={20} />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
