import React from 'react';
import { XCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Failed = () => {
    return (
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #ef4444, #f87171)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)' }}>
                <XCircle size={50} color="white" />
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Payment Failed</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '500px', marginBottom: '3rem' }}>
                We couldn't process your payment. Please check your card details or try a different payment method.
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/scholarships" className="btn btn-primary"><RefreshCw size={18} /> Try Again</Link>
                <Link to="/support" className="btn btn-ghost">Contact Support</Link>
            </div>
        </div>
    );
};

export default Failed;
