import { AlertCircle, Wrench, AlertTriangle, Waves } from 'lucide-react';

const problems = [
  {
    icon: Wrench,
    title: "Drains can only be cleaned by skilled workers",
    description: "Professional expertise is required for proper drain maintenance and cleaning."
  },
  {
    icon: AlertCircle,
    title: "Drains are rarely cleaned as it is expensive",
    description: "High maintenance costs lead to neglected drainage systems."
  },
  {
    icon: AlertTriangle,
    title: "Due to infrequent cleaning, clogs develop",
    description: "Accumulated debris causes blockages in urban drainage networks."
  },
  {
    icon: Waves,
    title: "Clogs lead to waterlogged streets and neighbourhoods during heavy rains",
    description: "Blocked drains cause flooding and property damage during monsoons."
  }
];

<section className="py-20 px-4 md:px-8 bg-muted/30">
  <div className="max-w-7xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-center mb-12"
    >
      Problems Faced in <span className="text-primary">Urban Drainage</span>
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {problems.map((problem, index) => (
        <motion.div
          key={problem.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="card-glass p-6 rounded-lg text-center"
        >
          <problem.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
          <p className="text-muted-foreground text-sm">{problem.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>