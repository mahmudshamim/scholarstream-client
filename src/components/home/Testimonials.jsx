import React, { useState } from 'react';
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
    const [activeIndex, setActiveIndex] = useState(0);

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
    };

    const activeData = TESTIMONIALS_DATA[activeIndex];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container">
                <div className="text-center mb-16">
                    <span className="text-primary font-semibold text-sm tracking-widest uppercase">Success Stories</span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mt-2 mb-2 leading-tight">Students Love ScholarStream</h2>
                    <p className="text-text-muted">See how we've helped students achieve their dreams.</p>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-border shadow-lg p-8 md:p-16 relative flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                    <div className="absolute top-8 left-8 text-primary/10">
                        <Quote size={80} fill="currentColor" />
                    </div>

                    {/* Avatar */}
                    <div className="shrink-0 relative z-10">
                        <img
                            src={activeData.image}
                            alt={activeData.name}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-xl"
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1">
                        <div className="flex gap-1 mb-4 justify-center md:justify-start">
                            {[...Array(5)].map((_, i) => <span key={i} className="text-warning text-xl">★</span>)}
                        </div>

                        <div className="min-h-[100px] md:min-h-[120px]">
                            <h3 className="text-lg md:text-xl leading-relaxed font-medium mb-6 text-[#1e1b4b] italic">
                                "{activeData.quote}"
                            </h3>
                        </div>

                        <div>
                            <h4 className="font-extrabold text-lg">{activeData.name}</h4>
                            <p className="text-text-muted text-sm">{activeData.role}</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-4 md:absolute md:bottom-8 md:right-8">
                        <button
                            onClick={prevTestimonial}
                            className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-white hover:bg-bg-body transition-colors"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-shadow"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
