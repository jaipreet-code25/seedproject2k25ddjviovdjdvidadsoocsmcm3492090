import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Droplets, Shield, CheckCircle, Instagram, Twitter, Wrench, Recycle, ChevronsLeftRight, Landmark, Link2Off } from "lucide-react";
import productViews from "@/assets/Screenshot 2025-12-28 164951_o1.jpg";
import partsViews from "@/assets/Screenshot 2025-12-28 164951_o1.jpg";
import SectionProgressDivider from "@/components/SectionProgressDivider";

const productFeatures = [
  {
    icon: ChevronsLeftRight,
    title: "Adjustable",
    description: "Made to cater to India's wide range of drain designs and sizes.",
    features: ["Adjustable Length", "Same device can fit any drain", "Perfect for India's drains"]
  },
  {
    icon: Landmark,
    title: "Affordable",
    description: "Available in low-cost material to cater to buyers on a budget.",
    features: ["3D-Printed", "Made of low-cost materials", "Low-cost solution"]
  },
  {
    icon: Link2Off,
    title: "Independant of Grate",
    description: "Grate can be removed without disturbing ClearFlow.",
    features: ["Hassle-free mesh extraction", "Easy cleaning", "Less effort required"]
  },
  {
    icon: Droplets,
    title: "Smart Water Flow",
    description: "Water passes through freely while the mesh catches all debris, dust, and particles.",
    features: ["Unobstructed water drainage", "No water pooling", "Works in heavy rain"]
  },
  {
    icon: Wrench,
    title: "Easy DIY Cleaning",
    description: "Simply remove the mesh, empty the debris, and put it back. No tools needed.",
    features: ["No professional help needed", "Quick 2-minute cleaning", "Reusable mesh"]
  },
  {
    icon: Recycle,
    title: "Sustainable Design",
    description: "Made with eco-friendly materials and designed to reduce urban flooding naturally.",
    features: ["Eco-friendly materials", "Recyclable components", "Lower environmental footprint"]
  }
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/happy.drain.solutions/", icon: Instagram },
  { label: "Twitter", href: "https://x.com/happy_drain", icon: Twitter },
];

const Services = () => {
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
              HDS <span className="text-primary">ClearFlow</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A simple, effective device that keeps street drains of all sizes clog-free using a debris collection mesh.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionProgressDivider />

      {/* Product Showcase */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass p-8 rounded-lg mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              What's in the <span className="text-primary">Box</span>?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  HDS ClearFlow ships with two identical units, which together form a single
                  anti-clogging and anti-waterlogging device. Each unit has 5 parts: 
                </p>
                <ul className="space-y-3">
                  {["Turn Buckle Housing: provides an enclosure for the Turn Buckle Shafts", "Turn Buckle Shafts (2): have opposite threadings and fit into the Turn Buckle Housing", "Terminal Hooks: slot onto the ends of the Turn Buckle Shafts"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <img 
                src={productViews} 
                alt="ClearFlow product design" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <SectionProgressDivider />

      {/* Product Showcase */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass p-8 rounded-lg mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              How It <span className="text-primary">Works</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  The ClearFlow features a clever mesh system that sits inside your drain. 
                  Water flows through easily, but dust, leaves, and debris get caught in the 
                  removable mesh compartment. When it's full, just lift it out, empty it, and pop it back in!
                </p>
                <ul className="space-y-3">
                  {["Built-in mesh catches all debris", "Removable compartment for easy cleaning", "No tools or professionals needed", "Prevents clogging and waterlogging"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <img 
                src={productViews} 
                alt="ClearFlow product design" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <SectionProgressDivider />

      {/* Product Showcase */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass p-8 rounded-lg mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              How It <span className="text-primary">Works</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  The ClearFlow features a clever mesh system that sits inside your drain. 
                  Water flows through easily, but dust, leaves, and debris get caught in the 
                  removable mesh compartment. When it's full, just lift it out, empty it, and pop it back in!
                </p>
                <ul className="space-y-3">
                  {["Built-in mesh catches all debris", "Removable compartment for easy cleaning", "No tools or professionals needed", "Prevents clogging and waterlogging"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <img 
                src={productViews} 
                alt="ClearFlow product design" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <SectionProgressDivider />

      {/* Services Grid */}
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Product <span className="text-primary">Features</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {productFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-glass p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <feature.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Social Media */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass p-8 md:p-12 rounded-lg text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Connect <span className="text-primary">With Us</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Follow us on social media to stay updated with our latest developments and news.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
