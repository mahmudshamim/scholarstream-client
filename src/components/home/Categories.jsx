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
        <section className="py-24 bg-bg-body">
            <div className="container">
                <div className="text-center mb-12">
                    <span className="text-primary font-semibold text-sm tracking-widest uppercase">Browse by Field</span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mt-2">
                        Explore by Category
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {CATEGORIES.map((cat, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 md:p-8 rounded-3xl text-left cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div
                                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6"
                                style={{ background: `${cat.color}15`, color: cat.color }}
                            >
                                <cat.icon size={24} className="md:w-7 md:h-7" />
                            </div>
                            <h3 className="text-sm md:text-base font-bold mb-1 text-[#1e1b4b]">{cat.label}</h3>
                            <p className="text-text-muted text-xs md:text-sm flex items-center justify-between">
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
