import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'your-button-library';
import { motion } from 'framer-motion';
import { ArrowRight, Droplets, Shield, Image, AlertCircle, Wrench, AlertTriangle, Waves } from 'lucide-react';

import SectionProgressDivider from './SectionProgressDivider';

const Index = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <SectionProgressDivider />
            <AboutPreviewSection />
            <SectionProgressDivider />
            <ProblemsFacedSection />
            <SectionProgressDivider />
            <ProductPreviewSection />
            <SectionProgressDivider />
            <GalleryPreviewSection />
            <SectionProgressDivider />
            <CTASection />
            <Footer />
        </div>
    );
};

const ProblemsFacedSection = () => {
    const problems = [
        'Drains can only be cleaned by skilled workers',
        'Drains are rarely cleaned as it is expensive',
        'Due to infrequent cleaning clogs develop',
        'Clogs lead to waterlogged streets during heavy rains',
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {problems.map((problem, index) => (
                <div key={index} className="border p-4 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold"><AlertTriangle /> {problem}</h3>
                </div>
            ))}
        </div>
    );
};

const Navbar = () => <nav>Your Navbar Here</nav>;
const HeroSection = () => <section>Your HeroSection Here</section>;
const AboutPreviewSection = () => <section>Your AboutPreviewSection Here</section>;
const ProductPreviewSection = () => <section>Your ProductPreviewSection Here</section>;
const GalleryPreviewSection = () => <section>Your GalleryPreviewSection Here</section>;
const CTASection = () => <section>Your CTASection Here</section>;
const Footer = () => <footer>Your Footer Here</footer>;

export default Index;