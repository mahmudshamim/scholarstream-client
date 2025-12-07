import React from 'react';
import { CheckCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #34d399)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)' }}>
                <CheckCircle size={50} color="white" />
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Application Submitted!</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '500px', marginBottom: '3rem' }}>
                Good luck! Your application for the Global Excellence Scholarship has been successfully received.
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/dashboard/student" className="btn btn-primary">Go to Dashboard</Link>
                <Link to="/" className="btn btn-ghost"><Home size={18} /> Back Home</Link>
            </div>
        </div>
    );
};

export default Success;
