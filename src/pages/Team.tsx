import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users } from "lucide-react";

import jaipreetImg from "@/assets/jaipreet.jpg";
import samarohaImg from "@/assets/samaroha.jpg";
import sharanyoImg from "@/assets/sharanyo.jpg";
import abhinavaImg from "@/assets/abhinava.jpg";
import tejasImg from "@/assets/tejas.jpg";
import ayushmanImg from "@/assets/ayushman.jpg";
import ayushman1Img from "@/assets/ayushman1.jpg";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const team: TeamMember[] = [
  { name: "Jaipreet Singh", role: "Product Design", image: jaipreetImg },
  { name: "Samaroha Rout", role: "Operations", image: samarohaImg },
  { name: "Sharanyo Bose", role: "Engineering", image: sharanyoImg },
  { name: "Abhinava Narayan", role: "Research", image: abhinavaImg },
  { name: "Tejas H A", role: "Manufacturing", image: tejasImg },
  { name: "Ayushman Narayan", role: "Prototyping", image: ayushmanImg },
  { name: "Ayushman Narayan", role: "Testing", image: ayushman1Img },
];

const Team = () => {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 md:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="w-14 h-14 mx-auto mb-4 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Meet the <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The people building and testing the Happy Drain device.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name + index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="card-glass p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover shadow-md"
              />
              <h3 className="text-lg font-bold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Team;
