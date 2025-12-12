import React, { useEffect, useState } from 'react';
import { Trash2, UserCheck, Shield, GraduationCap } from 'lucide-react';
import { usersAPI } from '../../../services/api';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roleFilter, setRoleFilter] = useState('all');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [roleToChange, setRoleToChange] = useState(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setActiveDropdown(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await usersAPI.getAllUsers();
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch users", error);
            setLoading(false);
        }
    };

    const handleRoleChange = (user, newRole) => {
        setSelectedUser(user);
        setRoleToChange(newRole);
        setShowRoleModal(true);
        setActiveDropdown(null); // Close dropdown
    };

    const confirmRoleChange = async () => {
        if (!selectedUser || !roleToChange) return;

        try {
            await usersAPI.updateUserRole(selectedUser._id, roleToChange);
            fetchUsers(); // Refresh
            alert(`User role updated to ${roleToChange}`);
            setShowRoleModal(false);
            setSelectedUser(null);
            setRoleToChange(null);
        } catch (error) {
            console.error("Failed to update role", error);
            alert("Failed to update user role");
        }
    };

    const handleDelete = async (id, email) => {
        if (window.confirm(`Are you sure you want to delete user: ${email}?`)) {
            try {
                await usersAPI.deleteUser(id);
                fetchUsers();
                alert('User deleted successfully');
            } catch (error) {
                console.error("Failed to delete user", error);
                alert("Failed to delete user");
            }
        }
    };

    const toggleDropdown = (e, userId) => {
        e.stopPropagation(); // Prevent closing immediately when clicking the button
        setActiveDropdown(activeDropdown === userId ? null : userId);
    };

    // Filter users based on role
    const filteredUsers = roleFilter === 'all'
        ? users
        : users.filter(user => user.role === roleFilter);

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin': return { bg: '#fee2e2', color: '#991b1b' };
            case 'moderator': return { bg: '#fef9c3', color: '#854d0e' };
            default: return { bg: '#dcfce7', color: '#166534' };
        }
    };

    return (
        <div>
            <div className="bg-white rounded-xl border border-border p-6 shadow-sm min-h-[400px]">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-2xl font-bold text-text-main">Manage Users</h1>

                    {/* Role Filter Dropdown */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-text-muted">Filter by Role:</label>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="select select-bordered select-sm w-full max-w-xs focus:border-primary focus:outline-none"
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-gray-50">
                            <tr className="text-text-muted text-sm border-b border-border">
                                <th className="py-4 pl-6">User</th>
                                <th className="py-4">Role</th>
                                <th className="py-4 pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="3" className="text-center py-12 text-text-muted">Loading users...</td></tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr><td colSpan="3" className="text-center py-12 text-text-muted">No users found</td></tr>
                            ) : filteredUsers.map((user) => {
                                const badgeColor = getRoleBadgeColor(user.role);
                                return (
                                    <tr key={user._id} className="border-b border-border last:border-0 hover:bg-slate-50 transition-colors">
                                        <td className="pl-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="avatar placeholder">
                                                    <div className="bg-primary/10 text-primary rounded-xl w-12 h-12 flex items-center justify-center font-bold text-xl border border-primary/20 relative overflow-hidden">
                                                        <span className="absolute inset-0 flex items-center justify-center z-0">
                                                            {user.name?.charAt(0) || 'U'}
                                                        </span>
                                                        {user.photoURL && (
                                                            <img
                                                                src={user.photoURL}
                                                                alt={user.name}
                                                                className="relative z-10 w-full h-full object-cover transition-opacity duration-300"
                                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-text-main text-base">{user.name}</div>
                                                    <div className="text-sm text-text-muted">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span
                                                className="badge h-8 px-3 gap-2 font-semibold border-0 text-xs uppercase tracking-wide"
                                                style={{ backgroundColor: badgeColor.bg, color: badgeColor.color }}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="pr-6 py-4 text-right relative">
                                            {/* Custom Dropdown */}
                                            <div className="relative inline-block text-left">
                                                <button
                                                    onClick={(e) => toggleDropdown(e, user._id)}
                                                    className={`btn btn-ghost btn-circle btn-sm transition-colors ${activeDropdown === user._id ? 'bg-gray-100 text-text-main' : 'text-text-muted hover:bg-gray-100'}`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                                                </button>

                                                {/* Menu Content */}
                                                {activeDropdown === user._id && (
                                                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-border z-[50] animate-in fade-in zoom-in-95 duration-200 origin-top-right ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <div className="py-2">
                                                            <div className="px-3 py-2 uppercase text-[10px] font-bold text-text-muted tracking-widest border-b border-gray-50 mb-1">Change Role</div>

                                                            {user.role !== 'admin' && (
                                                                <button onClick={() => handleRoleChange(user, 'admin')} className="w-full text-left px-4 py-2 text-sm text-text-main hover:bg-gray-50 hover:text-primary flex items-center gap-2 font-medium transition-colors">
                                                                    <Shield size={16} /> Make Admin
                                                                </button>
                                                            )}
                                                            {user.role !== 'moderator' && (
                                                                <button onClick={() => handleRoleChange(user, 'moderator')} className="w-full text-left px-4 py-2 text-sm text-text-main hover:bg-gray-50 hover:text-primary flex items-center gap-2 font-medium transition-colors">
                                                                    <UserCheck size={16} /> Make Moderator
                                                                </button>
                                                            )}
                                                            {user.role !== 'student' && (
                                                                <button onClick={() => handleRoleChange(user, 'student')} className="w-full text-left px-4 py-2 text-sm text-text-main hover:bg-gray-50 hover:text-primary flex items-center gap-2 font-medium transition-colors">
                                                                    <GraduationCap size={16} /> Make Student
                                                                </button>
                                                            )}

                                                            <div className="h-px bg-gray-100 my-1 mx-2"></div>

                                                            <button onClick={() => handleDelete(user._id, user.email)} className="w-full text-left px-4 py-2 text-sm text-error hover:bg-red-50 flex items-center gap-2 font-medium transition-colors">
                                                                <Trash2 size={16} /> Delete User
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showRoleModal && selectedUser && (
                <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm transition-all" onClick={() => setShowRoleModal(false)}>
                    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full animate-in fade-in zoom-in duration-200 border border-white/20" onClick={(e) => e.stopPropagation()}>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserCheck size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-2">Confirm Role Change</h3>
                            <p className="text-text-muted">
                                Are you sure you want to change <strong className="text-text-main">{selectedUser.name}</strong>'s role to <strong className="capitalize text-primary">{roleToChange}</strong>?
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowRoleModal(false)}
                                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-text-main rounded-xl font-semibold transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmRoleChange}
                                className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity font-semibold shadow-lg shadow-primary/25"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
