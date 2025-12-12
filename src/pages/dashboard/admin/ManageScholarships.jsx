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
        <div className="bg-white rounded-xl border border-border p-6 shadow-sm min-h-[400px]">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-text-main">Manage Scholarships</h1>
                <Link to="/dashboard/admin/add-scholarship" className="btn btn-primary gap-2 w-full sm:w-auto">
                    <Plus size={18} /> Add New Scholarship
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg border border-border">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr className="border-b border-border text-text-muted text-sm">
                            <th className="py-4 pl-6">University Name</th>
                            <th className="py-4">Scholarship Name</th>
                            <th className="py-4">Category</th>
                            <th className="py-4">Country</th>
                            <th className="py-4">City</th>
                            <th className="py-4">Deadline</th>
                            <th className="py-4 pr-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" className="text-center py-12 text-text-muted">Loading...</td></tr>
                        ) : scholarships.map((item) => (
                            <tr key={item._id} className="border-b border-border last:border-0 hover:bg-slate-50 transition-colors">
                                <td className="pl-6 py-4">{item.universityName}</td>
                                <td className="py-4 font-semibold text-text-main">{item.scholarshipName}</td>
                                <td className="py-4"><span className="badge badge-ghost badge-sm">{item.subjectCategory}</span></td>
                                <td className="py-4">{item.universityCountry}</td>
                                <td className="py-4">{item.universityCity}</td>
                                <td className="py-4 text-text-muted font-mono text-sm">{item.applicationDeadline}</td>
                                <td className="pr-6 py-4">
                                    <div className="flex gap-2 justify-end">
                                        <Link to={`/dashboard/admin/update-scholarship/${item._id}`} className="btn btn-ghost btn-sm btn-square hover:bg-blue-50 hover:text-primary transition-colors" title="Edit">
                                            <Edit2 size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-sm btn-square hover:bg-red-50 hover:text-error transition-colors" title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
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
