import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-16 px-4 relative mx-4 my-8 rounded-3xl overflow-hidden">
            {/* Background with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-violet-600 -z-10"></div>

            {/* Abstract Shapes */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute -top-[10%] -left-[5%] w-96 h-96 bg-white/5 rounded-full"></div>
                <div className="absolute -bottom-[10%] -right-[5%] w-72 h-72 bg-white/5 rounded-full"></div>
            </div>

            <div className="container text-center text-white relative z-10 max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                    Find Your Dream Scholarship <br className="hidden md:block" />in Minutes, Not Months
                </h2>
                <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed">
                    Join over 50,000 students who have found funding for their education.
                    Safe, secure, and verified opportunities.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/register"
                        className="bg-white text-primary px-8 py-4 text-base md:text-lg rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all whitespace-nowrap inline-flex items-center justify-center"
                    >
                        Get Started Free
                    </Link>
                    <Link
                        to="/scholarships"
                        className="bg-transparent text-white border-2 border-white/30 px-8 py-4 text-base md:text-lg rounded-full backdrop-blur-sm hover:bg-white/10 transition-all whitespace-nowrap inline-flex items-center justify-center"
                    >
                        Browse Scholarships
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTA;
