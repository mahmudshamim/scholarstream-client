import React from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedScholarships from '../components/home/FeaturedScholarships';
import Testimonials from '../components/home/Testimonials';
import TrustedBy from '../components/home/TrustedBy';
import CTA from '../components/home/CTA';

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedScholarships />
            <Categories />
            <Testimonials />
            <TrustedBy />
            <CTA />
        </>
    );
};

export default Home;
