import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight, GraduationCap } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { usersAPI } from '../../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signIn, googleSignIn } = useAuth();

    const redirectBasedOnRole = async (userEmail) => {
        try {
            const res = await usersAPI.getUserByEmail(userEmail);
            const role = res.data.role;

            if (role === 'Admin') {
                navigate('/dashboard/admin');
            } else if (role === 'Moderator') {
                navigate('/dashboard/moderator');
            } else {
                navigate('/dashboard/student');
            }
        } catch (err) {
            console.error('Role fetch failed', err);
            navigate('/dashboard/student'); // Default fallback
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await signIn(email, password);
            await redirectBasedOnRole(email);
        } catch (err) {
            setError('Failed to login: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const result = await googleSignIn();
            await redirectBasedOnRole(result.user.email);
        } catch (err) {
            setError('Google sign-in failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex' }}>
            {/* Left Side - Illustration */}
            <div className="auth-illustration" style={{
                flex: 1,
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                padding: '3rem', color: 'white', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'url("https://www.transparenttextures.com/patterns/cubes.png")', opacity: '0.1' }}></div>
                <div style={{ zIndex: 1, textAlign: 'center', maxWidth: '400px' }}>
                    <div style={{ width: '80px', height: '80px', background: 'white', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                        <GraduationCap size={40} color="var(--primary)" />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Welcome Back!</h1>
                    <p style={{ fontSize: '1.2rem', opacity: '0.9', lineHeight: '1.6' }}>
                        Continue your journey to finding the perfect scholarship. Your future awaits.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'white' }}>
                <div style={{ width: '100%', maxWidth: '450px' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Log In</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign up</Link></p>
                    </div>

                    {error && (
                        <div style={{ background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                            <AlertCircle size={18} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '16px' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 3rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Password</label>
                                <a href="#" style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>Forgot password?</a>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Lock size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '16px' }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 3rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                            {loading ? 'Logging in...' : 'Log In'} <ArrowRight size={18} />
                        </button>
                    </form>

                    <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0', color: 'var(--text-muted)' }}>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                        <span style={{ padding: '0 1rem', fontSize: '0.9rem' }}>OR</span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                    </div>

                    <button onClick={handleGoogleLogin} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', gap: '0.75rem' }}>
                        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" width="20" />
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
