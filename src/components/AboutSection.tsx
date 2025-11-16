import { motion } from "framer-motion";
import { Rocket, Users, Lightbulb, Target } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Innovation First",
    description: "Pioneering cutting-edge solutions that push the boundaries of technology.",
  },
  {
    icon: Users,
    title: "Collaborative Spirit",
    description: "A diverse team working together to create extraordinary outcomes.",
  },
  {
    icon: Lightbulb,
    title: "Creative Excellence",
    description: "Transforming bold ideas into tangible, impactful products.",
  },
  {
    icon: Target,
    title: "Mission Driven",
    description: "Focused on solving real-world problems with elegant technical solutions.",
  },
];

const stats = [
  { value: "6+", label: "Team Members" },
  { value: "100+", label: "Hours Dedicated" },
  { value: "∞", label: "Innovation" },
];

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span style={{ color: "#ff6600" }}>AeturnumX</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are a passionate team of innovators, designers, and engineers dedicated to 
            revolutionizing technology through creativity and collaboration. AeturnumX represents 
            the intersection of cutting-edge design, robust engineering, and visionary thinking.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: "#ff6600" }}>
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-glass p-8 rounded-lg hover:border-primary/50 transition-all"
            >
              <feature.icon className="w-12 h-12 mb-4" style={{ color: "#ff6600" }} />
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
