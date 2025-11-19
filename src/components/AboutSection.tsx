import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen pt-20 pb-16 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary">Happy Drains Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are a dedicated team of drainage declogging solution designers. Happy Drains Solutions represents excellence in 
            drainage and plumbing services with a smile. Our innovative approach tackles urban waterlogging at its root, 
            providing reliable solutions for cities and communities across India.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
