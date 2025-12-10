import React, { useEffect, useState } from 'react';
import { Trash2, UserCheck, Shield, GraduationCap } from 'lucide-react';
import { usersAPI } from '../../../services/api';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [roleFilter, setRoleFilter] = useState('all');

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

    const handleRoleChange = async (id, newRole) => {
        try {
            await usersAPI.updateUserRole(id, newRole);
            fetchUsers(); // Refresh
            alert(`User role updated to ${newRole}`);
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
        <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Manage Users</h1>

                {/* Role Filter Dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Filter by Role:</label>
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'white' }}
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                        <option value="student">Student</option>
                    </select>
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <th style={{ padding: '1rem' }}>User</th>
                            <th style={{ padding: '1rem' }}>Role</th>
                            <th style={{ padding: '1rem' }}>Change Role</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" style={{ padding: '1rem', textAlign: 'center' }}>Loading...</td></tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr><td colSpan="4" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No users found</td></tr>
                        ) : filteredUsers.map((user) => {
                            const badgeColor = getRoleBadgeColor(user.role);
                            return (
                                <tr key={user._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-body)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                                {user.photoURL ? (
                                                    <img src={user.photoURL} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{user.name?.charAt(0) || 'U'}</span>
                                                )}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600' }}>{user.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            background: badgeColor.bg,
                                            color: badgeColor.color,
                                            textTransform: 'capitalize'
                                        }}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {user.role !== 'admin' && (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, 'admin')}
                                                    className="btn btn-ghost"
                                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                    title="Make Admin"
                                                >
                                                    <Shield size={14} /> Admin
                                                </button>
                                            )}
                                            {user.role !== 'moderator' && (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, 'moderator')}
                                                    className="btn btn-ghost"
                                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                    title="Make Moderator"
                                                >
                                                    <UserCheck size={14} /> Mod
                                                </button>
                                            )}
                                            {user.role !== 'student' && (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, 'student')}
                                                    className="btn btn-ghost"
                                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                                    title="Make Student"
                                                >
                                                    <GraduationCap size={14} /> Student
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <button
                                            onClick={() => handleDelete(user._id, user.email)}
                                            className="btn btn-ghost"
                                            style={{ padding: '0.5rem', color: 'var(--error)' }}
                                            title="Delete User"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
