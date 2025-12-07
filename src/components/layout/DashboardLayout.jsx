import React, { useState } from 'react';
import { Outlet, NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, User, Star, LogOut, Bell, Settings, Search, Menu, X, PlusCircle, Users, BarChart2 } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const DashboardLayout = ({ role = 'student' }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

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
    ];

    const moderatorLinks = [
        { name: 'Overview', path: '/dashboard/moderator', icon: LayoutDashboard },
        { name: 'Applications', path: '/dashboard/moderator/applications', icon: FileText },
        { name: 'Reviews', path: '/dashboard/moderator/reviews', icon: Star },
    ];

    const links = role === 'admin' ? adminLinks : role === 'moderator' ? moderatorLinks : studentLinks;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-body)' }}>
            {/* Sidebar */}
            <aside style={{
                width: isSidebarOpen ? '260px' : '80px',
                background: 'white',
                borderRight: '1px solid var(--border)',
                transition: 'all 0.3s ease',
                display: 'flex', flexDirection: 'column',
                position: 'sticky', top: 0, height: '100vh', zIndex: 50
            }}>
                {/* Sidebar Header */}
                <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: isSidebarOpen ? 'space-between' : 'center', padding: '0 1.5rem', borderBottom: '1px solid var(--border)' }}>
                    {isSidebarOpen && (
                        <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
                            Scholar<span className="gradient-text">Stream</span>
                        </span>
                    )}
                    <button onClick={() => setSidebarOpen(!isSidebarOpen)} style={{ color: 'var(--text-muted)' }}>
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {links.map(link => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === `/dashboard/${role}`} // Exact match for root dashboard path
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-sm)',
                                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                background: isActive ? 'rgba(79, 70, 229, 0.05)' : 'transparent',
                                fontWeight: isActive ? '600' : '500',
                                justifyContent: isSidebarOpen ? 'flex-start' : 'center'
                            })}
                        >
                            <link.icon size={20} />
                            {isSidebarOpen && <span>{link.name}</span>}
                        </NavLink>
                    ))}
                </nav>

                {/* User Profile Snippet in Sidebar Bottom */}
                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: isSidebarOpen ? 'flex-start' : 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                            {user?.photoURL ? <img src={user.photoURL} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : user?.displayName?.charAt(0) || 'U'}
                        </div>
                        {isSidebarOpen && (
                            <div style={{ overflow: 'hidden' }}>
                                <div style={{ fontWeight: '600', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{user?.displayName || 'User'}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{role}</div>
                            </div>
                        )}
                        {isSidebarOpen && (
                            <button onClick={handleLogOut} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}><LogOut size={18} /></button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {/* Topbar */}
                <header style={{ height: '70px', background: 'white', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 40 }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', textTransform: 'capitalize' }}>
                        {location.pathname.split('/').pop().replace('-', ' ') || 'Overview'}
                    </h2>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', top: '10px', left: '12px' }} />
                            <input type="text" placeholder="Search..." style={{ padding: '0.5rem 0.5rem 0.5rem 2.5rem', borderRadius: '20px', border: '1px solid var(--border)', fontSize: '0.9rem', width: '200px' }} />
                        </div>
                        <button style={{ position: 'relative', color: 'var(--text-muted)' }}>
                            <Bell size={20} />
                            <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--error)', borderRadius: '50%' }}></span>
                        </button>
                        <button style={{ color: 'var(--text-muted)' }}>
                            <Settings size={20} />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
