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
        <div className="min-h-screen flex">
            {/* Left Side - Illustration (Hidden on mobile) */}
            <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-12 relative overflow-hidden text-white bg-gradient-to-br from-secondary to-primary">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="z-10 text-center max-w-md">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <GraduationCap size={40} className="text-primary" />
                    </div>
                    <h1 className="text-4xl font-extrabold mb-4">Join ScholarStream</h1>
                    <p className="text-lg opacity-90 leading-relaxed">
                        Create an account to start applying for scholarships and tracking your applications.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-extrabold text-text-main mb-2">Create Account</h2>
                        <p className="text-text-muted">Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link></p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-error p-4 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircle size={18} /> {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-2">Full Name</label>
                            <div className="relative">
                                <User size={20} className="absolute top-3.5 left-4 text-text-muted" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                    className="input input-bordered w-full pl-12 h-12 text-base focus:border-primary focus:ring-1 focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-2">Email Address</label>
                            <div className="relative">
                                <Mail size={20} className="absolute top-3.5 left-4 text-text-muted" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="name@example.com"
                                    className="input input-bordered w-full pl-12 h-12 text-base focus:border-primary focus:ring-1 focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-2">Photo URL (Optional)</label>
                            <div className="relative">
                                <User size={20} className="absolute top-3.5 left-4 text-text-muted" />
                                <input
                                    type="url"
                                    value={formData.photoURL}
                                    onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                                    placeholder="https://example.com/photo.jpg"
                                    className="input input-bordered w-full pl-12 h-12 text-base focus:border-primary focus:ring-1 focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-text-main mb-2">Password</label>
                            <div className="relative">
                                <Lock size={20} className="absolute top-3.5 left-4 text-text-muted" />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Create a password"
                                    className="input input-bordered w-full pl-12 h-12 text-base focus:border-primary focus:ring-1 focus:ring-primary/20"
                                />
                            </div>
                            {passwordErrors.length > 0 && (
                                <div className="mt-3 text-sm text-error bg-red-50 p-3 rounded-lg">
                                    <p className="font-bold mb-1">Password must have:</p>
                                    <ul className="list-disc pl-5 space-y-0.5">
                                        {passwordErrors.map((err, idx) => <li key={idx}>{err}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary w-full h-12 text-base font-bold flex items-center justify-center gap-2">
                            Create Account <ArrowRight size={20} />
                        </button>
                    </form>

                    <div className="flex items-center gap-4 my-6">
                        <div className="h-px bg-border flex-1"></div>
                        <span className="text-text-muted text-sm font-medium">OR</span>
                        <div className="h-px bg-border flex-1"></div>
                    </div>

                    <button
                        onClick={handleGoogleRegister}
                        className="btn bg-white text-black border border-gray-200 w-full h-12 flex items-center justify-center gap-2 hover:bg-gray-50"
                    >
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Sign up with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
