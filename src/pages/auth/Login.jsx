import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight, GraduationCap } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signIn, googleSignIn } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await signIn(email, password);
            // Redirect to home page instead of dashboard
            navigate('/');
        } catch (err) {
            setError('Failed to login: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await googleSignIn();
            // Redirect to home page instead of dashboard
            navigate('/');
        } catch (err) {
            setError('Google sign-in failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Illustration (Hidden on mobile) */}
            <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-12 relative overflow-hidden text-white bg-gradient-to-br from-primary to-secondary">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="z-10 text-center max-w-md">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <GraduationCap size={40} className="text-primary" />
                    </div>
                    <h1 className="text-4xl font-extrabold mb-4">Welcome Back!</h1>
                    <p className="text-lg opacity-90 leading-relaxed">
                        Continue your journey to finding the perfect scholarship. Your future awaits.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-extrabold text-text-main mb-2">Log In</h2>
                        <p className="text-text-muted">Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Sign up</Link></p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-error p-4 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircle size={18} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-2">Email Address</label>
                            <div className="relative">
                                <Mail size={20} className="absolute top-3.5 left-4 text-text-muted" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="input input-bordered w-full pl-12 h-12 text-base focus:border-primary focus:ring-1 focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-semibold text-text-main">Password</label>
                                <a href="#" className="text-sm text-primary font-medium hover:underline">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock size={20} className="absolute top-3.5 left-4 text-text-muted" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input input-bordered w-full pl-12 h-12 text-base focus:border-primary focus:ring-1 focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full h-12 text-base font-bold flex items-center justify-center gap-2" disabled={loading}>
                            {loading ? 'Logging in...' : 'Log In'} <ArrowRight size={20} />
                        </button>
                    </form>

                    <div className="flex items-center gap-4 my-8">
                        <div className="h-px bg-border flex-1"></div>
                        <span className="text-text-muted text-sm font-medium">OR</span>
                        <div className="h-px bg-border flex-1"></div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="btn bg-white text-black border border-gray-200 w-full h-12 flex items-center justify-center gap-2 hover:bg-gray-50"
                    >
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
