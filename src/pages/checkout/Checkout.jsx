import React from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Make sure to put your publishable key here
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
    const navigate = useNavigate();

    const handlePayment = (e) => {
        e.preventDefault();
        // Simulate payment
        const success = Math.random() > 0.2; // 80% success rate mock
        if (success) {
            navigate('/success');
        } else {
            navigate('/failed');
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '1000px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>Complete Your Application</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                {/* Left: Summary */}
                <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Order Summary</h3>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '8px', background: 'var(--bg-body)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>S</div>
                        <div>
                            <div style={{ fontWeight: '600' }}>Stanford University</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Global Excellence Scholarship</div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1rem 0', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Application Fee</span>
                            <span>$50.00</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <span>Processing Fee</span>
                            <span>$2.50</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700' }}>
                        <span>Total</span>
                        <span>$52.50</span>
                    </div>
                </div>

                {/* Right: Payment */}
                <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CreditCard size={20} /> Payment Details
                    </h3>

                    <Elements stripe={stripePromise}>
                        {/* Passing mock data for now, actual data should come from location state or params */}
                        <CheckoutForm price={52.50} scholarshipInfo={{ scholarshipId: '123', universityName: 'Stanford University' }} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
