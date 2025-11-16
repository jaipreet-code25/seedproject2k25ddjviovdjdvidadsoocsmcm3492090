import { motion } from "framer-motion";
import { Rocket, Users, Lightbulb, Target } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Fast Response",
    description: "Quick emergency service available when you need us most.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Skilled professionals with years of drainage experience.",
  },
  {
    icon: Lightbulb,
    title: "Smart Solutions",
    description: "Modern techniques and equipment for lasting results.",
  },
  {
    icon: Target,
    title: "Customer Focus",
    description: "Your satisfaction is our priority, every time.",
  },
];

const stats = [
  { value: "1000+", label: "Happy Customers" },
  { value: "24/7", label: "Emergency Service" },
  { value: "15+", label: "Years Experience" },
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
            About <span className="text-primary">Happy Drains Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are a dedicated team of drainage professionals committed to providing reliable, 
            efficient, and friendly service. Happy Drains Solutions represents excellence in 
            drainage and plumbing services with a smile.
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
              <div className="text-4xl md:text-5xl font-bold mb-2 text-primary">
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
              <feature.icon className="w-12 h-12 mb-4 text-primary" />
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
