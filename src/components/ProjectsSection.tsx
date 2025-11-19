import { motion } from "framer-motion";
import { Droplets, Shield, Wrench } from "lucide-react";
import productViews from "@/assets/product-views.png";
import logo from "@/assets/logo1.jpg";

const ProjectsSection = () => {
  return (
    <section id="projects" className="min-h-screen py-20 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-primary">Solution</span>
          </h2>
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card-glass p-8 md:p-12 rounded-lg mb-12"
        >
          <div className="flex items-start gap-6 mb-6">
            <img src={logo} alt="Happy Drains" className="h-20 w-auto rounded-lg" />
            <div>
              <h3 className="text-3xl font-bold mb-4 text-primary">The Problem</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This year, cities across the nation have suffered from a major problem— <strong>urban waterlogging</strong>. 
                Be it a bustling metropolis, or a small town, this is caused by a fundamental issue in the absolute root of 
                drainage— the drains themselves. Falling prey to all sorts of clogging due to a range of reasons, solving 
                this problem would greatly improve the ease of life of millions of Indians all across the country.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Solution Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-glass p-8 md:p-12 rounded-lg mb-12"
        >
          <h3 className="text-3xl font-bold mb-6 text-primary">The Happy Drain Solution</h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            The Happy Drain solves this problem, making it a fail-safe system for conventional clogs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center text-center p-6 bg-background/50 rounded-lg">
              <Droplets className="w-12 h-12 mb-4 text-primary" />
              <h4 className="text-xl font-bold mb-2">Water Flows Free</h4>
              <p className="text-muted-foreground">
                The drain remains open for water, which can pass right through, but traps all debris from small particles to large pebbles
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-background/50 rounded-lg">
              <Shield className="w-12 h-12 mb-4 text-primary" />
              <h4 className="text-xl font-bold mb-2">Easy Collection</h4>
              <p className="text-muted-foreground">
                The debris and refuse will be collected in a separate compartment which can be easily taken out and cleaned
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-background/50 rounded-lg">
              <Wrench className="w-12 h-12 mb-4 text-primary" />
              <h4 className="text-xl font-bold mb-2">Streamlined Work</h4>
              <p className="text-muted-foreground">
                The drain will streamline the work of cleaners, all the while also preventing waterlogging
              </p>
            </div>
          </div>

          {/* Product Views */}
          <div className="mt-12">
            <h4 className="text-2xl font-bold mb-6 text-center">Product Design</h4>
            <img 
              src={productViews} 
              alt="Happy Drain product views - Main, Top, and Bottom angles" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
