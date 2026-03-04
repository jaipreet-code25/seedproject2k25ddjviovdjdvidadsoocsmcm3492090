import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Target, Heart, Lightbulb } from "lucide-react";
import SectionProgressDivider from "@/components/SectionProgressDivider";

const values = [
  {
    icon: Target,
    title: "Simple Solutions",
    description: "We provide simple solutions to the pressing problem of urban waterlogging."
  },
  {
    icon: Heart,
    title: "Affordable",
    description: "Quality drainage solutions that don't break the bank."
  },
  {
    icon: CheckCircle,
    title: "Durable",
    description: "Built to last inside of drains."
  },
  {
    icon: Lightbulb,
    title: "Eco-Friendly",
    description: "Sustainable materials and design that help the environment."
  }
];

const About = () => {
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
              About <span className="text-primary">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              HDS is dedicated to solving the problem of urban waterlogging. We have created HDS ClearFlow 
              to empower everyone to make their cities waterlogging-free.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionProgressDivider />

      {/* Mission Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Happy Drains Solutions has created HDS ClearFlow, a simple, effective drainage device 
                that anyone can use. HDS ClearFlow features a built-in mesh that collects refuse, leaves, 
                and debris preventing clogs from worsening and making cleaning of drains very easy.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe preventing drain clogs shouldn't require expensive professional help. 
                Our device is easy to install, easy to clean, and built to last. It can be used 
                even by a lay man.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-glass p-8 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To create a future where every street, every neighborhood, and every city 
                in India has access to HDS ClearFlow to prevent waterlogging and improve 
                urban living conditions. We hope for a future where cleaners do not have to 
                enter the extremely unhygienic and toxic environment inside drains. We hope to 
                empower the people to take the matter of efficient drainage into their own hands.
              </p>
            </motion.div>
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
            Our <span className="text-primary">Values</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-glass p-6 rounded-lg text-center"
              >
                <value.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
