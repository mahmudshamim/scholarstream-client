import React from 'react';
import { MapPin, Calendar, Clock, DollarSign, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ScholarshipCard = ({ scholarship }) => {
    // Diverse fallback images for variety
    const images = [
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1592280771800-bcf9de231baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1590579492906-41f05a677096?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ];

    // The common duplicate image URL from database - treat it as missing
    const duplicateImageUrl = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

    // Map MongoDB fields to component fields if necessary
    const {
        _id, id,
        scholarshipName, title,
        universityName, university,
        universityCountry, universityCity, location,
        scholarshipCategory, type,
        tuitionFees, value,
        applicationDeadline, deadline
    } = scholarship;

    const displayTitle = scholarshipName || title;
    const displayUniversity = universityName || university;
    const displayLocation = (universityCity && universityCountry) ? `${universityCity}, ${universityCountry}` : location;
    const displayType = scholarshipCategory || type;
    const displayValue = tuitionFees ? `$${tuitionFees}` : (value || 'N/A');
    const displayDeadline = applicationDeadline || deadline;
    const displayId = _id || id;

    // Generate a unique index based on scholarship properties for varied fallback
    const hashString = (displayId || '') + (displayTitle || '') + (displayUniversity || '');
    let hash = 0;
    for (let i = 0; i < hashString.length; i++) {
        hash = ((hash << 5) - hash) + hashString.charCodeAt(i);
        hash = hash & hash;
    }
    const imageIndex = Math.abs(hash) % images.length;

    // Check if image exists and is not the duplicate one
    const rawImage = scholarship.universityImage || scholarship.image;
    const hasValidImage = rawImage && rawImage !== duplicateImageUrl;
    const bgImage = hasValidImage ? rawImage : images[imageIndex];

    return (
        <div style={{
            background: 'white',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            height: '100%',
            boxShadow: 'var(--shadow-sm)'
        }}
            className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
            {/* Image Header */}
            <div style={{ height: '200px', position: 'relative', overflow: 'hidden', margin: '12px 12px 0', borderRadius: '20px' }}>
                <img src={bgImage} alt={displayUniversity} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                {/* Overlay Gradient (Subtle) */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent, rgba(0,0,0,0.1))' }}></div>

                {/* Top Badges */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ background: '#f59e0b', color: 'white', fontSize: '0.75rem', fontWeight: '700', padding: '0.35rem 1rem', borderRadius: '50px', letterSpacing: '0.5px' }}>
                        Featured
                    </span>
                    <span style={{ background: 'rgba(255, 255, 255, 0.95)', color: '#334155', fontSize: '0.75rem', fontWeight: '600', padding: '0.35rem 1rem', borderRadius: '50px' }}>
                        {displayType}
                    </span>
                </div>

                {/* Bookmark Button */}
                <button style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: 'white', padding: '0.5rem', borderRadius: '50%',
                    color: '#64748b', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>

                {/* Rating Badge */}
                <div style={{
                    position: 'absolute', bottom: '1rem', left: '1rem',
                    background: 'white', padding: '0.35rem 0.85rem', borderRadius: '50px',
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                    fontSize: '0.8rem', fontWeight: '700', color: '#334155',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <span style={{ color: '#f59e0b', fontSize: '1rem' }}>★</span> 4.9
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: '1.3', color: '#0f172a' }}>
                    {displayTitle}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '1.5rem' }}>
                    {displayUniversity}
                </p>

                {/* Details List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#64748b' }}>
                        <MapPin size={18} color="#94a3b8" />
                        <span>{displayLocation}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#10b981', fontWeight: '600' }}>
                        <DollarSign size={18} />
                        <span>{displayValue}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#64748b' }}>
                        <Calendar size={18} color="#94a3b8" />
                        <span>Deadline: {displayDeadline}</span>
                    </div>
                </div>

                <Link to={`/scholarships/${displayId}`} style={{
                    marginTop: 'auto',
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '50px',
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: '#334155',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                }} className="hover:bg-slate-50 hover:border-slate-300">
                    View Details <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
};

export default ScholarshipCard;
