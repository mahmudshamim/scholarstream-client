import React, { useState, useEffect } from 'react';
import { CreditCard, Loader } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { scholarshipsAPI } from '../../services/api';
import useAuth from '../../hooks/useAuth';

// Make sure to put your publishable key here
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [scholarship, setScholarship] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScholarship = async () => {
            try {
                const res = await scholarshipsAPI.getById(id);
                setScholarship(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch scholarship", error);
                setLoading(false);
            }
        };
        if (id) {
            fetchScholarship();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
                <Loader className="animate-spin" size={40} style={{ margin: '0 auto' }} />
                <p style={{ marginTop: '1rem' }}>Loading checkout...</p>
            </div>
        );
    }

    if (!scholarship) {
        return (
            <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
                <h2>Scholarship not found</h2>
                <p>The scholarship you're trying to apply for doesn't exist.</p>
            </div>
        );
    }

    const applicationFee = scholarship.applicationFees || 0;
    const serviceCharge = scholarship.serviceCharge || 0;
    const totalPrice = applicationFee + serviceCharge;

    const scholarshipInfo = {
        scholarshipId: scholarship._id,
        scholarshipName: scholarship.scholarshipName,
        universityName: scholarship.universityName,
        universityCountry: scholarship.universityCountry,
        universityCity: scholarship.universityCity,
        degree: scholarship.degree,
        subjectCategory: scholarship.subjectCategory,
        applicantName: user?.displayName || 'Unknown',
        applicantEmail: user?.email,
        applicantImage: user?.photoURL || '',
        applicationFees: applicationFee,
        serviceCharge: serviceCharge
    };

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '1000px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>Complete Your Application</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                {/* Left: Summary */}
                <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Order Summary</h3>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '8px', background: 'var(--bg-body)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--primary)' }}>
                            {scholarship.universityName?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <div style={{ fontWeight: '600' }}>{scholarship.universityName}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{scholarship.scholarshipName}</div>
                        </div>
                    </div>

                    <div style={{ background: 'var(--bg-body)', borderRadius: 'var(--radius-sm)', padding: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <div><strong>Degree:</strong> {scholarship.degree}</div>
                            <div><strong>Category:</strong> {scholarship.subjectCategory}</div>
                            <div><strong>Location:</strong> {scholarship.universityCity}, {scholarship.universityCountry}</div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1rem 0', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Application Fee</span>
                            <span>${applicationFee.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <span>Service Charge</span>
                            <span>${serviceCharge.toFixed(2)}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700' }}>
                        <span>Total</span>
                        <span style={{ color: 'var(--primary)' }}>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>

                {/* Right: Payment */}
                <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CreditCard size={20} /> Payment Details
                    </h3>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm price={totalPrice} scholarshipInfo={scholarshipInfo} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
