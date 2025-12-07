import React, { useEffect, useState } from 'react';
import { MoreVertical, Trash2, UserCheck } from 'lucide-react';
import { apiSecure } from '../../../services/api';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await apiSecure.get('/users');
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch users", error);
            setLoading(false);
        }
    };

    const handleMakeAdmin = async (id) => {
        try {
            await apiSecure.patch(`/users/admin/${id}`);
            fetchUsers(); // Refresh
        } catch (error) {
            console.error("Failed to update role", error);
        }
    }

    const handleMakeModerator = async (id) => {
        try {
            await apiSecure.patch(`/users/moderator/${id}`);
            fetchUsers(); // Refresh
        } catch (error) {
            console.error("Failed to update role", error);
        }
    }
    return (
        <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '1.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Manage Users</h1>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <th style={{ padding: '1rem' }}>User</th>
                            <th style={{ padding: '1rem' }}>Role</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Joined</th>
                            <th style={{ padding: '1rem' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" style={{ padding: '1rem', textAlign: 'center' }}>Loading...</td></tr>
                        ) : users.map((user) => (
                            <tr key={user._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: '600' }}>{user.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user.email}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>{user.role}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600',
                                        background: '#dcfce7', // Assuming active for all seeded users for now
                                        color: '#166534'
                                    }}>
                                        Active
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>N/A</td>
                                <td style={{ padding: '1rem', display: "flex", gap: "0.5rem" }}>
                                    {user.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className="btn btn-xs btn-primary" title="Make Admin"><UserCheck size={16} /></button>}
                                    {user.role !== 'moderator' && <button onClick={() => handleMakeModerator(user._id)} className="btn btn-xs btn-secondary" title="Make Moderator"><UserCheck size={16} /></button>}
                                    <button className="btn-ghost" style={{ padding: '0.5rem', color: 'red' }}><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
