import React from 'react';
import { Code, Briefcase, Palette, Stethoscope, Globe, BookOpen, ChevronRight } from 'lucide-react';

const CATEGORIES = [
    { icon: Code, label: 'Engineering', count: '450+', color: '#3b82f6' },
    { icon: Briefcase, label: 'Business', count: '320+', color: '#f59e0b' },
    { icon: Palette, label: 'Arts & Design', count: '180+', color: '#ec4899' },
    { icon: Stethoscope, label: 'Medicine', count: '210+', color: '#10b981' },
    { icon: Globe, label: 'Social Sciences', count: '150+', color: '#8b5cf6' },
    { icon: BookOpen, label: 'Humanities', count: '190+', color: '#ef4444' },
];

const Categories = () => {
    return (
        <section style={{ padding: '6rem 0', background: '#f8fafc' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Browse by Field</span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0.5rem 0' }}>
                        Explore by Category
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                    {CATEGORIES.map((cat, idx) => (
                        <div key={idx}
                            style={{
                                background: 'white',
                                padding: '2rem 1.5rem',
                                borderRadius: '24px',
                                border: '1px solid transparent',
                                textAlign: 'left',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                boxShadow: 'var(--shadow-sm)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                            }}
                        >
                            <div style={{
                                background: `${cat.color}15`,
                                color: cat.color,
                                width: '56px', height: '56px',
                                borderRadius: '16px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                <cat.icon size={28} />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem', color: '#1e1b4b' }}>{cat.label}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                {cat.count} openings
                                <ChevronRight size={16} />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
