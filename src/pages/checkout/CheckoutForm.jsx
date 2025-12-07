import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { ShieldCheck } from 'lucide-react';

const CheckoutForm = ({ price, scholarshipInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const axioSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (price > 0) {
            axioSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axioSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError('');
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'anonymous'
                    }
                }
            }
        );

        if (confirmError) {
            setCardError(confirmError.message);
            setProcessing(false);
            navigate('/failed'); // Optional: better to show error on same page
        } else {
            if (paymentIntent.status === 'succeeded') {
                // Save payment info to database
                const paymentInfo = {
                    ...scholarshipInfo,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'pending' // application status
                }

                try {
                    await axioSecure.post('/applications', paymentInfo);
                    setProcessing(false);
                    navigate('/success');
                } catch (err) {
                    console.log(err);
                    setProcessing(false);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem', border: '1px solid var(--border)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            {cardError && <p style={{ color: 'red', marginBottom: '1rem' }}>{cardError}</p>}
            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem' }}
            >
                {processing ? 'Processing...' : `Pay $${price}`}
            </button>
            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={14} /> Secure SSL Encryption
            </div>
        </form>
    );
};

export default CheckoutForm;
