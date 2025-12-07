import React from 'react';
import { Save } from 'lucide-react';

const AddScholarship = () => {
    return (
        <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>Add New Scholarship</h1>

            <form>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Scholarship Title</label>
                    <input type="text" placeholder="e.g. Global Excellence Scholarship" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>University</label>
                        <input type="text" placeholder="e.g. Stanford University" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Deadline</label>
                        <input type="date" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Value</label>
                        <input type="text" placeholder="$50,000" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Type</label>
                        <select style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'white' }}>
                            <option>Full Ride</option>
                            <option>Partial Funding</option>
                            <option>Tuition Only</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Category</label>
                        <select style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'white' }}>
                            <option>Engineering</option>
                            <option>Business</option>
                            <option>Arts</option>
                            <option>Medicine</option>
                        </select>
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '6.00', marginBottom: '0.5rem' }}>Description</label>
                    <textarea rows="5" placeholder="Enter scholarship details..." style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontFamily: 'inherit' }}></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button type="button" className="btn btn-ghost">Cancel</button>
                    <button type="button" className="btn btn-primary">
                        <Save size={18} /> Publish Scholarship
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddScholarship;
