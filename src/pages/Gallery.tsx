import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import productViews from "@/assets/Screenshot 2025-12-28 164951_o1.jpg";
import logo from "@/assets/logo1.jpg";

// Model Design images
import modelDesign1 from "@/assets/model-design-1.png";
import modelDesign2 from "@/assets/model-design-2.png";
import modelDesign3 from "@/assets/model-design-3.png";
import modelDesign4 from "@/assets/model-design-4.png";
import modelDesign5 from "@/assets/model-design-5.png";
import modelDesign6 from "@/assets/model-design-6.png";

// Prototype images
import prototype1 from "@/assets/prototype-1.png";
import prototype2 from "@/assets/prototype-2.png";
import prototype3 from "@/assets/prototype-3.png";
import prototype4 from "@/assets/prototype-4.png";
import prototype5 from "@/assets/prototype-5.png";
import prototype6 from "@/assets/prototype-6.png";
import prototype7 from "@/assets/prototype-7.png";

// Blueprint images
import blueprint1 from "@/assets/blueprint-1.png";
import blueprint2 from "@/assets/blueprint-2.png";
import blueprint3 from "@/assets/blueprint-3.png";
import blueprint4 from "@/assets/blueprint-4.png";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  // Model Design
  { src: modelDesign1, alt: "Model Design View 1", category: "Model Design" },
  { src: modelDesign2, alt: "Model Design View 2", category: "Model Design" },
  { src: modelDesign3, alt: "Model Design View 3", category: "Model Design" },
  { src: modelDesign4, alt: "Model Design View 4", category: "Model Design" },
  { src: modelDesign5, alt: "Model Design View 5", category: "Model Design" },
  { src: modelDesign6, alt: "Model Design View 6", category: "Model Design" },
  // Prototype
  { src: prototype1, alt: "Prototype View 1", category: "Prototype" },
  { src: prototype2, alt: "Prototype View 2", category: "Prototype" },
  { src: prototype3, alt: "Prototype View 3", category: "Prototype" },
  { src: prototype4, alt: "Prototype View 4", category: "Prototype" },
  { src: prototype5, alt: "Prototype View 5", category: "Prototype" },
  { src: prototype6, alt: "Prototype View 6", category: "Prototype" },
  { src: prototype7, alt: "Prototype View 7", category: "Prototype" },
  // Blueprints
  { src: blueprint1, alt: "Blueprint Design 1", category: "Blueprints" },
  { src: blueprint2, alt: "Blueprint Design 2", category: "Blueprints" },
  { src: blueprint3, alt: "Blueprint Design 3", category: "Blueprints" },
  { src: blueprint4, alt: "Blueprint Design 4", category: "Blueprints" },
  // Product & Brand
  { src: productViews, alt: "Happy Drain Product Design", category: "Product" },
  { src: logo, alt: "Happy Drains Solutions Logo", category: "Brand" },
];

const categories = ["All", "Model Design", "Prototype", "Blueprints", "Product", "Brand"];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Photo <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our model designs, prototypes, and blueprints of the Happy Drain device.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.alt}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-sm font-medium truncate">{image.alt}</p>
                    <span className="text-white/70 text-xs">{image.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 text-white hover:text-primary transition-colors z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 text-white hover:text-primary transition-colors z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-white text-lg font-medium">{filteredImages[selectedImage].alt}</p>
              <p className="text-white/70 text-sm">{selectedImage + 1} / {filteredImages.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default Gallery;
