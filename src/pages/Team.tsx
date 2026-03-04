import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users } from "lucide-react";

import team1Img from "@/assets/team1.jpeg";
import team2Img from "@/assets/team2.jpeg";
import team3Img from "@/assets/team3.jpeg";
import team4Img from "@/assets/team4.jpeg";
import team5Img from "@/assets/team5.jpeg";
import team6Img from "@/assets/team6.jpeg";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const team: TeamMember[] = [
  { name: "Tejas Singh", role: "Operations", image: team5Img },
  { name: "Jaipreet Purkayastha", role: "Product Design", image: team6Img },
  { name: "Abhinava Bandopadhyay", role: "Product Development", image: team3Img },
  { name: "Sharanyo Chakraborty", role: "Marketing", image: team4Img },
  { name: "Ayushman Singh", role: "Graphic Design", image: team2Img },
  { name: "Samaroha Bhattacharyya", role: "Web Development", image: team1Img },
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
              The people building and testing the ClearFlow device.
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
              <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded-lg shadow-md">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
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
