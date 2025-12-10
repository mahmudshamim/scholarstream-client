import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, ArrowRight, GraduationCap } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', photoURL: '', password: '' });
    const [error, setError] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const navigate = useNavigate();
    const { createUser, updateUserProfile, googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 6) errors.push('At least 6 characters');
        if (!/[A-Z]/.test(password)) errors.push('At least one capital letter');
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('At least one special character');
        return errors;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setPasswordErrors([]);

        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        // Validate password
        const errors = validatePassword(formData.password);
        if (errors.length > 0) {
            setPasswordErrors(errors);
            return;
        }

        try {
            // Create user in Firebase
            const result = await createUser(formData.email, formData.password);

            // Update profile with name and photo
            await updateUserProfile(formData.name, formData.photoURL || '');

            // Save user to database with default role 'Student'
            const userInfo = {
                name: formData.name,
                email: formData.email,
                photoURL: formData.photoURL || '',
                role: 'Student',
                createdAt: new Date().toISOString()
            };

            await axiosPublic.post('/users', userInfo);

            // Redirect to home page instead of dashboard
            navigate('/');
        } catch (err) {
            setError('Failed to register: ' + err.message);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            const result = await googleSignIn();

            // Save Google user to database with default role 'Student'
            const userInfo = {
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL || '',
                role: 'Student',
                createdAt: new Date().toISOString()
            };

            await axiosPublic.post('/users', userInfo);

            // Redirect to home page instead of dashboard
            navigate('/');
        } catch (err) {
            setError('Google sign-up failed: ' + err.message);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex' }}>
            {/* Left Side - Illustration */}
            <div className="auth-illustration" style={{
                flex: 1,
                background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                padding: '3rem', color: 'white', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'url("https://www.transparenttextures.com/patterns/cubes.png")', opacity: '0.1' }}></div>
                <div style={{ zIndex: 1, textAlign: 'center', maxWidth: '400px' }}>
                    <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                        <GraduationCap size={40} color="var(--primary)" />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Join ScholarStream</h1>
                    <p style={{ fontSize: '1.2rem', opacity: '0.9', lineHeight: '1.6' }}>
                        Create an account to start applying for scholarships and tracking your applications.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'white' }}>
                <div style={{ width: '100%', maxWidth: '450px' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Create Account</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Log in</Link></p>
                    </div>

                    {error && (
                        <div style={{ background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                            <AlertCircle size={18} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '16px' }} />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 3rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '16px' }} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="name@example.com"
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 3rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Photo URL (Optional)</label>
                            <div style={{ position: 'relative' }}>
                                <User size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '16px' }} />
                                <input
                                    type="url"
                                    value={formData.photoURL}
                                    onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                                    placeholder="https://example.com/photo.jpg"
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 3rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '16px' }} />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Create a password"
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 3rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                            {passwordErrors.length > 0 && (
                                <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#ef4444' }}>
                                    <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Password must have:</p>
                                    <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                                        {passwordErrors.map((err, idx) => <li key={idx}>{err}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                            Create Account <ArrowRight size={18} />
                        </button>
                    </form>

                    <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0', color: 'var(--text-muted)' }}>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                        <span style={{ padding: '0 1rem', fontSize: '0.9rem' }}>OR</span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                    </div>

                    <button onClick={handleGoogleRegister} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', gap: '0.75rem' }}>
                        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" width="20" />
                        Sign up with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
