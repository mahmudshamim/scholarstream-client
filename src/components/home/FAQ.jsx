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
        <section className="py-20 bg-gradient-to-b from-bg-card to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-[20%] -right-[5%] w-96 h-96 bg-secondary/5 rounded-full blur-[60px] z-0"></div>

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-4">
                        <HelpCircle size={20} className="text-primary" />
                        <span className="text-primary font-semibold text-sm">FAQ</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 text-[#1e1b4b]">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto">
                        Got questions? We've got answers. Find everything you need to know about scholarships.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`mb-4 bg-white rounded-2xl border border-border overflow-hidden transition-shadow ${activeIndex === index ? 'shadow-md' : 'shadow-sm'
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full p-6 flex justify-between items-center text-left hover:bg-bg-body/50 transition-colors"
                            >
                                <span className={`text-base md:text-lg font-semibold pr-4 transition-colors ${activeIndex === index ? 'text-primary' : 'text-text-main'
                                    }`}>
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeIndex === index ? 'bg-primary' : 'bg-bg-card'
                                        }`}
                                >
                                    {activeIndex === index ? (
                                        <Minus size={18} className="text-white" />
                                    ) : (
                                        <Plus size={18} className="text-primary" />
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
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 text-text-muted leading-relaxed">
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
                    className="mt-12 text-center p-8 md:p-12 bg-gradient-to-br from-indigo-500 to-secondary rounded-3xl text-white max-w-4xl mx-auto"
                >
                    <h3 className="text-xl md:text-2xl font-bold mb-3">Still have questions?</h3>
                    <p className="mb-8 opacity-95 text-base md:text-lg max-w-xl mx-auto">
                        Can't find the answer you're looking for? Our support team is here to help.
                    </p>
                    <button className="bg-white text-indigo-500 px-10 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">
                        Contact Support
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
