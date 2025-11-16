import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Robotics Innovation",
    description: "Advanced robotics systems integrating embedded systems, mechanical design, and intelligent automation for real-world applications.",
    tags: ["Arduino", "ESP32", "Mechanical Design"],
  },
  {
    title: "Web Solutions",
    description: "Full-stack web applications built with modern frameworks, delivering scalable and responsive user experiences.",
    tags: ["React", "TypeScript", "Node.js"],
  },
  {
    title: "3D Design & Prototyping",
    description: "Custom 3D-printed components and designs for rapid prototyping, additive production, and innovative mechanical solutions.",
    tags: ["3D Printing", "CAD", "Prototyping"],
  },
  {
    title: "Marketing Campaigns",
    description: "Strategic marketing initiatives leveraging graphic design, video editing, and social media management to amplify brand presence.",
    tags: ["Design", "Social Media", "Branding"],
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
            Our <span style={{ color: "#ff6600" }}>Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of innovative solutions across technology, design, and engineering
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
