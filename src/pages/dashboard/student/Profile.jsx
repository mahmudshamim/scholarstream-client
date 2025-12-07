import React from 'react';
import { Save, User } from 'lucide-react';

const Profile = () => {
    return (
        <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '2rem', maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--bg-body)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <User size={50} color="var(--text-muted)" />
                    <button style={{ position: 'absolute', bottom: 0, right: 0, width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '50%', border: '2px solid white', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                </div>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>John Doe</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Student • Computer Science</p>
                </div>
            </div>

            <form>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Full Name</label>
                        <input type="text" defaultValue="John Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Email</label>
                        <input type="email" defaultValue="john@example.com" disabled style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-body)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>University</label>
                        <input type="text" defaultValue="MIT" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>GPA</label>
                        <input type="text" defaultValue="3.9" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Bio</label>
                    <textarea rows="4" defaultValue="Passionate computer science student..." style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontFamily: 'inherit' }}></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn btn-primary">
                        <Save size={18} /> Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
