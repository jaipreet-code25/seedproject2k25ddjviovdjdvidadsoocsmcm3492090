import TeamMember from "./TeamMember";
import teamGroup from "@/assets/team-group.jpg";
import jaipreetImg from "@/assets/jaipreet.jpg";
import samarohaImg from "@/assets/samaroha.jpg";
import sharanyoImg from "@/assets/sharanyo.jpg";
import abhinavaImg from "@/assets/abhinava.jpg";
import tejasImg from "@/assets/tejas.jpg";
import ayushmanImg from "@/assets/ayushman.jpg";

const teamMembers = [
  {
    name: "Jaipreet Purkayastha",
    role: "Robotics Head",
    expertise: "Expert in microcontroller programming and hardware integration, specializing in Arduino and ESP32 platforms. Skilled in designing and implementing embedded systems for disaster response robotics and autonomous vehicles.",
    image: jaipreetImg
  },
  {
    name: "Samaroha Bhattacharyya",
    role: "Lead Developer",
    expertise: "Full-stack developer specializing in mobile and web development. Proficient in React Native, React, TypeScript, JavaScript, and Node.js. Builds scalable applications for disaster management and emergency response systems.",
    image: tejasImg
  },
  {
    name: "Sharanyo Chakraborty",
    role: "Marketing Head",
    expertise: "Leads strategic marketing initiatives and community outreach programs. Develops campaigns to increase awareness about disaster preparedness and promotes innovative solutions in emergency management.",
    image: abhinavaImg
  },
  {
    name: "Abhinava Bandopadhyay",
    role: "Electronics Engineer",
    expertise: "Specializes in circuit design and electronic system integration. Expert in creating robust circuitry solutions for disaster response equipment, focusing on reliability and efficiency in critical situations.",
    image: sharanyoImg
  },
  {
    name: "Tejas Singh",
    role: "Electronics Specialist",
    expertise: "Skilled in electronics design and implementation, with a focus on power systems and signal processing. Develops electronic components for emergency communication devices and sensor networks.",
    image: samarohaImg
  },
  {
    name: "Ayushman Singh",
    role: "3D Printing Specialist",
    expertise: "Expert in additive manufacturing and rapid prototyping. Creates custom 3D-printed components for disaster response tools and equipment, enabling quick iteration and deployment of innovative solutions.",
    image: "https://via.placeholder.com/400x500/1a1a1a/666666?text=A.S."
  }
];

const TeamSection = () => {
  return (
    <section className="min-h-screen py-20 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate innovators dedicated to revolutionizing disaster management through technology
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto mb-16">
          <img 
            src={teamGroup} 
            alt="Team Photo" 
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={member.name}
              name={member.name}
              role={member.role}
              expertise={member.expertise}
              image={member.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;