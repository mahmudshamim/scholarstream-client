import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { scholarshipsAPI, apiSecure } from '../../../services/api';
import { Link } from 'react-router-dom';

const ManageScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchScholarships = async () => {
        try {
            // Fetch all (pagination logic might limit this, but let's ask for page 1 limit 50 for admin view)
            const res = await scholarshipsAPI.getAll(1, 50);
            setScholarships(res.data.scholarships);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch scholarships", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScholarships();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this scholarship?")) {
            try {
                await apiSecure.delete(`/scholarships/${id}`);
                fetchScholarships();
            } catch (error) {
                console.error("Failed to delete", error);
                alert("Failed to delete scholarship");
            }
        }
    };
    return (
        <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Manage Scholarships</h1>
                <Link to="/dashboard/admin/add-scholarship" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={18} /> Add New Scholarship
                </Link>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <th style={{ padding: '1rem' }}>Title</th>
                            <th style={{ padding: '1rem' }}>University</th>
                            <th style={{ padding: '1rem' }}>Deadline</th>
                            <th style={{ padding: '1rem' }}>Applications</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" style={{ padding: '1rem', textAlign: 'center' }}>Loading...</td></tr>
                        ) : scholarships.map((item) => (
                            <tr key={item._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem', fontWeight: '600' }}>{item.scholarshipName}</td>
                                <td style={{ padding: '1rem' }}>{item.universityName}</td>
                                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{item.applicationDeadline}</td>
                                <td style={{ padding: '1rem' }}>-</td> {/* App count not in standard get response, skipping */}
                                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <Link to={`/dashboard/admin/update-scholarship/${item._id}`} className="btn-ghost" style={{ padding: '0.5rem', display: 'inline-block' }}><Edit2 size={16} /></Link>
                                    <button onClick={() => handleDelete(item._id)} className="btn-ghost" style={{ padding: '0.5rem', color: 'var(--error)' }}><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageScholarships;
