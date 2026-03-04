import React from 'react';
import './Index.css';
import AboutPreview from './components/AboutPreview';
import ProblemsFaced from './components/ProblemsFaced';
import ProductPreview from './components/ProductPreview';
import GalleryPreview from './components/GalleryPreview';
import CTASection from './components/CTASection';

const features = [
    { title: 'Feature 1', description: 'Description for feature 1' },
    { title: 'Feature 2', description: 'Description for feature 2' },
    { title: 'Feature 3', description: 'Description for feature 3' }
];

const Index = () => {
    return (
        <div className="index-container">
            <AboutPreview />
            <ProblemsFaced />
            <ProductPreview features={features} />
            <GalleryPreview />
            <CTASection />
        </div>
    );
};

export default Index;