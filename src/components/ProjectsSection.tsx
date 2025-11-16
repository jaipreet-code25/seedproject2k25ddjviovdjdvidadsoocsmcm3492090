import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Drain Unblocking",
    description: "Professional drain clearing services using advanced equipment to quickly resolve blockages and restore flow.",
    tags: ["Emergency Service", "Professional", "Quick Response"],
  },
  {
    title: "CCTV Inspections",
    description: "State-of-the-art camera surveys to identify drainage issues and provide detailed reports for informed solutions.",
    tags: ["Camera Survey", "Diagnostics", "Detailed Reports"],
  },
  {
    title: "Drain Repairs",
    description: "Expert repair services for damaged drains, including patch repairs, relining, and full replacements when needed.",
    tags: ["Repairs", "Relining", "Maintenance"],
  },
  {
    title: "Preventive Maintenance",
    description: "Regular maintenance programs to keep your drainage system flowing smoothly and prevent costly emergencies.",
    tags: ["Maintenance", "Prevention", "Long-term Care"],
  },
];

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
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive drainage solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-glass p-8 rounded-lg hover:border-primary/50 transition-all group"
            >
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 text-sm rounded-full bg-muted text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink size={16} />
                  View
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Github size={16} />
                  Code
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
