import React from 'react';
import { Quote, ArrowRight, ArrowLeft } from 'lucide-react';

const TESTIMONIALS_DATA = [
    {
        id: 1,
        name: "Maya Patel",
        role: "Stanford University, Class of 2026",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        quote: "As a first-generation college student, navigating scholarships felt overwhelming. ScholarStream simplified everything and helped me secure full funding for my engineering degree."
    },
    {
        id: 2,
        name: "James Carter",
        role: "Oxford University, MSc Physics",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        quote: "I found a scholarship I didn't even know existed! The search filters are incredible, and the application tracking feature kept me organized throughout the process."
    },
    {
        id: 3,
        name: "Sarah Chen",
        role: "MIT, Computer Science",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        quote: "Visualizing the requirements and deadlines made applying stress-free. I applied to 5 universities and got fully funded offers from 3 of them. Highly recommended!"
    }
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
    };

    const activeData = TESTIMONIALS_DATA[activeIndex];

    return (
        <section style={{ padding: '6rem 0', background: 'white', position: 'relative', overflow: 'hidden' }}>
            <div className="container">

                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Success Stories</span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0.5rem 0', lineHeight: 1.2 }}>Students Love ScholarStream</h2>
                    <p style={{ color: 'var(--text-muted)' }}>See how we've helped students achieve their dreams.</p>
                </div>

                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '3rem',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column', // Mobile-first default
                    alignItems: 'center',
                    gap: '2rem',
                    textAlign: 'center' // Mobile-first default
                }}
                    // Inline media query styles aren't possible directly in React inline styles without a library or window hook, 
                    // so we will use aclassName and add responsive css in index.css or use a workaround.
                    // For simplicity in this environment, I'll rely on the flex wrap behavior or general layout.
                    // Better approach: Use a wrapping div with CSS classes or media query styles injected.
                    className="testimonial-card"
                >
                    {/* Injecting responsive styles via scoped style block for this specific component tweak if needed, or rely on flex */}
                    <style>{`
                        @media (min-width: 768px) {
                            .testimonial-card {
                                flex-direction: row !important;
                                text-align: left !important;
                                padding: 4rem !important;
                                gap: 3rem !important;
                            }
                            .testimonial-controls {
                                position: absolute;
                                bottom: 2rem;
                                right: 3rem;
                                justify-content: flex-end;
                                width: auto !important;
                            }
                        }
                        .testimonial-controls {
                            position: static;
                            display: flex;
                            gap: 1rem;
                            width: 100%;
                            justify-content: center;
                            margin-top: 1rem;
                        }
                    `}</style>

                    <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: 'rgba(79, 70, 229, 0.1)' }}>
                        <Quote size={80} fill="currentColor" />
                    </div>

                    {/* Avatar */}
                    <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
                        <img
                            src={activeData.image}
                            alt={activeData.name}
                            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid white', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
                        />
                    </div>

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
                        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', justifyContent: 'inherit' }}>
                            {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#f59e0b', fontSize: '1.2rem' }}>★</span>)}
                        </div>

                        <div style={{ minHeight: '120px' }}> {/* Prevent height jump */}
                            <h3 style={{ fontSize: '1.25rem', lineHeight: '1.5', fontWeight: '500', marginBottom: '1.5rem', color: '#1e1b4b', fontStyle: 'italic' }}>
                                "{activeData.quote}"
                            </h3>
                        </div>

                        <div>
                            <h4 style={{ fontWeight: '800', fontSize: '1.1rem' }}>{activeData.name}</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{activeData.role}</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="testimonial-controls">
                        <button onClick={prevTestimonial} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'white' }}><ArrowLeft size={18} /></button>
                        <button onClick={nextTestimonial} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)' }}><ArrowRight size={18} /></button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
