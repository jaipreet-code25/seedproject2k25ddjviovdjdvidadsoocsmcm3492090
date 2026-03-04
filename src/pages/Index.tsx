import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { ArrowRight, Droplets, Shield, Image, Pickaxe, HandCoins, TriangleAlert, Waves, CopyX } from "lucide-react";
import { Button } from "@/components/ui/button";
import productViews from "@/assets/clearflow-blog-4.png";
import SectionProgressDivider from "@/components/SectionProgressDivider";

const values = [
  {
    icon: Pickaxe,
    title: "Skilled Workers Required to Clean",
    description: "Street drains can only be cleaned by skilled workers."
  },
  {
    icon: HandCoins,
    title: "Not Affordable to Clean",
    description: " Street drains are rarely cleaned as it is expensive."
  },
  {
    icon: TriangleAlert,
    title: "Clogging",
    description: "Due to infrequent cleaning, clogs develop."
  },
  {
    icon: Waves,
    title: "Waterlogging",
    description: "Clogs lead to waterlogged streets and neighbourhoods after heavy rains."
  },
  {
    icon: CopyX,
    title: "Varying Drain Designs",
    description: "Lack of uniformity in street drain sizes poses a significant challenge in making a single product to cater to all drain types."
  },
];

const features = [
  {
    icon: Droplets,
    title: "Mesh Debris Collection",
    description: "Built-in mesh catches leaves, refuse, and debris while letting water flow through freely."
  },
];

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />

      <SectionProgressDivider />

      {/* About Preview Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-primary">Happy Drains Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We have created HDS ClearFlow, a simple, effective anti-waterlogging drainage device.
                HDS ClearFlow uses a mesh to catch debris before it clogs street drains and leads to waterlogging.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 place-items-center gap-8 mb-12 max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-glass p-6 rounded-lg text-center"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/about">
              <Button size="lg" variant="outline" className="gap-2">
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <SectionProgressDivider />

      {/* Values Section */}
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            <span className="text-primary">Problems</span> faced in Drainage
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-glass p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <value.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionProgressDivider />

      {/* Product Preview Section */}
      <section className="py-20 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                The <span className="text-primary">ClearFlow</span> System
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                HDS ClearFlow features a mesh that catches the refuse, leaves, and debris 
                that would normally clog street drains. Water flows through freely, while everything else 
                gets collected in the mesh which you can easily empty yourself.
              </p>
              <Link to="/services">
                <Button size="lg" className="gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={productViews} 
                alt="ClearFlow product design" 
                className="w-full rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-4xl font-bold mb-6">
              Photo <span className="text-primary">Gallery</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore our product designs and behind-the-scenes moments in our gallery.
            </p>
            <Link to="/gallery">
              <Button size="lg" className="gap-2">
                View Gallery <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <SectionProgressDivider />

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-glass p-8 md:p-12 rounded-lg text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="text-primary">Get Started?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us today if you have any queries and discover how HDS ClearFlow can help 
              your community stay safe, clean and waterlogging-free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Contact Us <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
