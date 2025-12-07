import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Book, Globe, ShieldCheck, Share2, Heart } from 'lucide-react';
import { scholarshipsAPI, reviewsAPI } from '../../services/api';

const ScholarshipDetails = () => {
    const { id } = useParams();
    const [scholarship, setScholarship] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const schRes = await scholarshipsAPI.getById(id);
                setScholarship(schRes.data);

                try {
                    const reviewRes = await reviewsAPI.getScholarshipReviews(id);
                    setReviews(reviewRes.data);
                } catch (e) {
                    console.log("No reviews or error fetching reviews");
                    setReviews([]);
                }

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch scholarship details", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading details...</div>;
    if (!scholarship) return <div style={{ padding: '4rem', textAlign: 'center' }}>Scholarship not found.</div>;

    const display = {
        title: scholarship.scholarshipName,
        university: scholarship.universityName,
        location: `${scholarship.universityCity}, ${scholarship.universityCountry}`,
        value: `$${scholarship.applicationFees} Fees / ${scholarship.degree}`,
        deadline: scholarship.applicationDeadline,
        image: scholarship.image,
        description: scholarship.description || "A prestigious scholarship opportunity.",
        eligibility: scholarship.eligibility || ["International students", "High GPA"],
        documents: scholarship.documents || ["Transcripts", "CV"],
    };

    return (
        <div>
            {/* Banner */}
            <div style={{
                height: '300px',
                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${display.image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                paddingBottom: '2rem'
            }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end' }}>
                        <div style={{
                            width: '100px', height: '100px',
                            background: 'white', borderRadius: 'var(--radius-md)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '2.5rem', fontWeight: 'bold',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            {display.university.charAt(0)}
                        </div>
                        <div style={{ color: 'white' }}>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{display.title}</h1>
                            <div style={{ display: 'flex', gap: '1.5rem', opacity: '0.9' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} /> {display.location}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Globe size={18} /> International</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '3rem 1.5rem', display: 'flex', gap: '3rem', flexDirection: 'row' }}>
                {/* Main Content */}
                <div style={{ flex: 2 }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '2rem', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>Description</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>
                            {display.description}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ShieldCheck size={20} color="var(--primary)" /> Eligibility
                                </h3>
                                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                    {display.eligibility.map((item, idx) => <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Book size={20} color="var(--primary)" /> Documents
                                </h3>
                                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                    {display.documents.map((item, idx) => <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem' }}>Student Reviews</h2>

                        {reviews.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No reviews yet. Be the first to review this scholarship!</p>
                        ) : (
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {reviews.map((review) => (
                                    <div key={review._id} style={{ padding: '1.5rem', background: 'var(--bg-body)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                                                {review.userImage ? (
                                                    <img src={review.userImage} alt={review.userName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: '600' }}>
                                                        {review.userName?.charAt(0) || 'U'}
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                                    <div>
                                                        <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{review.userName}</h4>
                                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                                            {new Date(review.reviewDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                        </p>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                        {[...Array(5)].map((_, i) => (
                                                            <span key={i} style={{ color: i < review.ratingPoint ? '#fbbf24' : '#d1d5db', fontSize: '1.25rem' }}>★</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>{review.reviewComment}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ flex: 1, position: 'sticky', top: '100px', alignSelf: 'flex-start' }}>
                    <div style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', padding: '2rem' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Scholarship Value</div>
                            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>{display.value}</div>
                        </div>

                        <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                <Calendar size={20} color="var(--primary)" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Application Deadline</div>
                                    <div style={{ fontWeight: '600' }}>{new Date(display.deadline).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                <DollarSign size={20} color="var(--primary)" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Application Fee</div>
                                    <div style={{ fontWeight: '600' }}>${scholarship.applicationFees}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                <Book size={20} color="var(--primary)" style={{ marginTop: '2px' }} />
                                <div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Degree Level</div>
                                    <div style={{ fontWeight: '600' }}>{scholarship.degree}</div>
                                </div>
                            </div>
                        </div>

                        <Link to={`/checkout/${id}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem' }}>
                            Apply for Scholarship
                        </Link>

                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                                <Heart size={18} /> Save
                            </button>
                            <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                                <Share2 size={18} /> Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipDetails;
