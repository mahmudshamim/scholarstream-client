import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I apply for scholarships?",
            answer: "Browse our scholarship listings, click 'View Details' on any scholarship that interests you, and follow the application instructions. Each scholarship has specific requirements and deadlines listed on its detail page."
        },
        {
            question: "Are these scholarships really free to apply?",
            answer: "Most scholarships on our platform are free to apply. However, some may have minimal application fees. We clearly display any fees on the scholarship detail page so you can make an informed decision."
        },
        {
            question: "How often are new scholarships added?",
            answer: "We add new scholarship opportunities daily! Our team works continuously to bring you the latest funding opportunities from universities and organizations worldwide."
        },
        {
            question: "Can international students apply?",
            answer: "Yes! Many scholarships on our platform are open to international students. Use our filters to find scholarships specifically available for your country or region."
        },
        {
            question: "What documents do I typically need?",
            answer: "Common requirements include academic transcripts, letters of recommendation, personal statements, proof of language proficiency (TOEFL/IELTS), and a valid passport. Specific requirements vary by scholarship."
        },
        {
            question: "How can I track my applications?",
            answer: "Once you're logged in, visit your dashboard to track all your scholarship applications, view deadlines, and monitor application statuses in one convenient place."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section style={{
            padding: '5rem 0',
            background: 'linear-gradient(180deg, var(--bg-card) 0%, white 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '-5%',
                width: '400px',
                height: '400px',
                background: 'rgba(139, 92, 246, 0.05)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                zIndex: 0
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(139, 92, 246, 0.1)',
                        borderRadius: '50px',
                        marginBottom: '1rem'
                    }}>
                        <HelpCircle size={20} color="var(--primary)" />
                        <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>
                            FAQ
                        </span>
                    </div>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        marginBottom: '1rem',
                        color: '#1e1b4b'
                    }}>
                        Frequently Asked Questions
                    </h2>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '1.1rem',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Got questions? We've got answers. Find everything you need to know about scholarships.
                    </p>
                </motion.div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            style={{
                                marginBottom: '1rem',
                                background: 'white',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border)',
                                overflow: 'hidden',
                                boxShadow: activeIndex === index ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                                transition: 'box-shadow 0.3s ease'
                            }}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                style={{
                                    width: '100%',
                                    padding: '1.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'background 0.2s ease'
                                }}
                            >
                                <span style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: activeIndex === index ? 'var(--primary)' : 'var(--text-main)',
                                    transition: 'color 0.2s ease',
                                    paddingRight: '1rem'
                                }}>
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: activeIndex === index ? 'var(--primary)' : 'var(--bg-card)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        transition: 'background 0.2s ease'
                                    }}
                                >
                                    {activeIndex === index ? (
                                        <Minus size={18} color="white" />
                                    ) : (
                                        <Plus size={18} color="var(--primary)" />
                                    )}
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{
                                            padding: '0 1.5rem 1.5rem 1.5rem',
                                            color: 'var(--text-muted)',
                                            lineHeight: '1.7',
                                            fontSize: '1rem'
                                        }}>
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Still have questions CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                        marginTop: '3rem',
                        textAlign: 'center',
                        padding: '3rem 2rem',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        borderRadius: '24px',
                        color: 'white',
                        maxWidth: '900px',
                        margin: '3rem auto 0'
                    }}
                >
                    <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                        Still have questions?
                    </h3>
                    <p style={{ marginBottom: '2rem', opacity: 0.95, fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Can't find the answer you're looking for? Our support team is here to help.
                    </p>
                    <button className="btn" style={{
                        background: 'white',
                        color: '#6366f1',
                        padding: '0.875rem 2.5rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '50px',
                        fontSize: '1rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s ease'
                    }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Contact Support
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
