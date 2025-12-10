import React from 'react';

const TrustedBy = () => {
    const universities = [
        { name: 'Oxford', logo: 'https://logo.clearbit.com/ox.ac.uk' },
        { name: 'Stanford', logo: 'https://logo.clearbit.com/stanford.edu' },
        { name: 'MIT', logo: 'https://logo.clearbit.com/mit.edu' },
        { name: 'Cambridge', logo: 'https://logo.clearbit.com/cam.ac.uk' },
        { name: 'Yale', logo: 'https://logo.clearbit.com/yale.edu' },
        { name: 'Harvard', logo: 'https://logo.clearbit.com/harvard.edu' },
        { name: 'Princeton', logo: 'https://logo.clearbit.com/princeton.edu' },
        { name: 'Columbia', logo: 'https://logo.clearbit.com/columbia.edu' },
    ];

    const marqueeItems = [...universities, ...universities];

    return (
        <section className="py-20 bg-bg-body border-b border-border">
            <div className="container overflow-hidden">
                <p className="text-center text-text-muted mb-14 font-medium text-base md:text-lg tracking-wide">
                    Trusted by students admitted to world's top universities
                </p>

                <div className="marquee-container">
                    <div className="marquee-content pl-4">
                        {marqueeItems.map((uni, idx) => (
                            <div
                                key={idx}
                                className="bg-white px-8 py-4 rounded-full border border-border/80 inline-flex items-center gap-5 shadow-md min-w-[220px] h-20 justify-center select-none hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                            >
                                <img
                                    src={uni.logo}
                                    alt={`${uni.name} Logo`}
                                    className="h-9 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                                />
                                <span className="font-bold text-slate-700 text-lg tracking-tight">{uni.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
