import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <div style={{ marginBottom: '2rem' }}>
                <AlertTriangle size={80} color="var(--error)" style={{ opacity: 0.5 }} />
            </div>
            <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text)' }}>404</h1>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
            <p style={{ maxWidth: '500px', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Home size={18} /> Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
