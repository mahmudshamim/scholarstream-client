import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiSecure, scholarshipsAPI } from '../../../services/api';

const UpdateScholarship = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [formData, setFormData] = useState({
        scholarshipName: '',
        universityName: '',
        universityImage: '',
        universityCountry: '',
        universityCity: '',
        universityWorldRank: '',
        subjectCategory: 'Engineering',
        scholarshipCategory: 'Full Funding',
        degree: 'Bachelor',
        tuitionFees: '',
        applicationFees: '',
        serviceCharge: '',
        applicationDeadline: ''
    });

    useEffect(() => {
        const fetchScholarship = async () => {
            try {
                const res = await scholarshipsAPI.getById(id);
                const data = res.data;
                setFormData({
                    scholarshipName: data.scholarshipName || '',
                    universityName: data.universityName || '',
                    universityImage: data.universityImage || '',
                    universityCountry: data.universityCountry || '',
                    universityCity: data.universityCity || '',
                    universityWorldRank: data.universityWorldRank || '',
                    subjectCategory: data.subjectCategory || 'Engineering',
                    scholarshipCategory: data.scholarshipCategory || 'Full Funding',
                    degree: data.degree || 'Bachelor',
                    tuitionFees: data.tuitionFees || '',
                    applicationFees: data.applicationFees || '',
                    serviceCharge: data.serviceCharge || '',
                    applicationDeadline: data.applicationDeadline ? data.applicationDeadline.split('T')[0] : ''
                });
                setFetching(false);
            } catch (error) {
                console.error('Failed to fetch scholarship', error);
                alert('Failed to load scholarship');
                navigate('/dashboard/admin/scholarships');
            }
        };
        fetchScholarship();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const scholarshipData = {
                ...formData,
                tuitionFees: parseFloat(formData.tuitionFees) || 0,
                applicationFees: parseFloat(formData.applicationFees) || 0,
                serviceCharge: parseFloat(formData.serviceCharge) || 0,
                universityWorldRank: parseInt(formData.universityWorldRank) || 0
            };

            await apiSecure.put(`/scholarships/${id}`, scholarshipData);
            alert('Scholarship updated successfully!');
            navigate('/dashboard/admin/scholarships');
        } catch (error) {
            console.error('Failed to update scholarship', error);
            alert('Failed to update scholarship');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = { width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' };
    const labelStyle = { display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' };

    if (fetching) {
        return (
            <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '2rem', textAlign: 'center' }}>
                Loading scholarship data...
            </div>
        );
    }

    return (
        <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>Update Scholarship</h1>

            <form onSubmit={handleSubmit}>
                {/* Scholarship Name */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>Scholarship Name *</label>
                    <input
                        type="text"
                        name="scholarshipName"
                        value={formData.scholarshipName}
                        onChange={handleChange}
                        placeholder="e.g. Global Excellence Scholarship"
                        style={inputStyle}
                        required
                    />
                </div>

                {/* University Info Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>University Name *</label>
                        <input
                            type="text"
                            name="universityName"
                            value={formData.universityName}
                            onChange={handleChange}
                            placeholder="e.g. Stanford University"
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>University Image URL</label>
                        <input
                            type="text"
                            name="universityImage"
                            value={formData.universityImage}
                            onChange={handleChange}
                            placeholder="https://example.com/university.jpg"
                            style={inputStyle}
                        />
                    </div>
                </div>

                {/* Location Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>Country *</label>
                        <input
                            type="text"
                            name="universityCountry"
                            value={formData.universityCountry}
                            onChange={handleChange}
                            placeholder="e.g. USA"
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>City</label>
                        <input
                            type="text"
                            name="universityCity"
                            value={formData.universityCity}
                            onChange={handleChange}
                            placeholder="e.g. Stanford"
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>World Rank</label>
                        <input
                            type="number"
                            name="universityWorldRank"
                            value={formData.universityWorldRank}
                            onChange={handleChange}
                            placeholder="e.g. 3"
                            style={inputStyle}
                        />
                    </div>
                </div>

                {/* Categories Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>Subject Category *</label>
                        <select
                            name="subjectCategory"
                            value={formData.subjectCategory}
                            onChange={handleChange}
                            style={{ ...inputStyle, background: 'white' }}
                        >
                            <option>Engineering</option>
                            <option>Business</option>
                            <option>Arts</option>
                            <option>Medicine</option>
                            <option>Law</option>
                            <option>Agriculture</option>
                            <option>Science</option>
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}>Scholarship Category *</label>
                        <select
                            name="scholarshipCategory"
                            value={formData.scholarshipCategory}
                            onChange={handleChange}
                            style={{ ...inputStyle, background: 'white' }}
                        >
                            <option>Full Funding</option>
                            <option>Partial Funding</option>
                            <option>Self-funded</option>
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}>Degree *</label>
                        <select
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            style={{ ...inputStyle, background: 'white' }}
                        >
                            <option>Diploma</option>
                            <option>Bachelor</option>
                            <option>Masters</option>
                        </select>
                    </div>
                </div>

                {/* Fees Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>Tuition Fees ($)</label>
                        <input
                            type="number"
                            name="tuitionFees"
                            value={formData.tuitionFees}
                            onChange={handleChange}
                            placeholder="0"
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Application Fees ($) *</label>
                        <input
                            type="number"
                            name="applicationFees"
                            value={formData.applicationFees}
                            onChange={handleChange}
                            placeholder="50"
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Service Charge ($)</label>
                        <input
                            type="number"
                            name="serviceCharge"
                            value={formData.serviceCharge}
                            onChange={handleChange}
                            placeholder="10"
                            style={inputStyle}
                        />
                    </div>
                </div>

                {/* Deadline */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={labelStyle}>Application Deadline *</label>
                    <input
                        type="date"
                        name="applicationDeadline"
                        value={formData.applicationDeadline}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                    />
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        <Save size={18} /> {loading ? 'Updating...' : 'Update Scholarship'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateScholarship;
