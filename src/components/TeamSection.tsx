import TeamMember from "./TeamMember";
import teamGroup from "@/assets/team-group.jpg";
import jaipreetImg from "@/assets/jaipreet.jpg";
import samarohaImg from "@/assets/samaroha.jpg";
import sharanyoImg from "@/assets/sharanyo.jpg";
import abhinavaImg from "@/assets/abhinava.jpg";
import tejasImg from "@/assets/tejas.jpg";
import ayushmanImg from "@/assets/ayushman.jpg";
import a1 from "@/assets/ayushman1.jpg";
const teamMembers = [
  {
    name: "Jaipreet Purkayastha",
    role: "Co-Head of STEM (Technology)",
    expertise: "Expert in microcontroller programming and hardware integration, specializing in Arduino and ESP32 platforms. Skilled in designing and implementing embedded systems for robotics and autonomous vehicles.",
    image: jaipreetImg
  },
  {
    name: "Samaroha Bhattacharyya",
    role: "Chief Software Engineer",
    expertise: "Full-stack developer specializing in mobile and web development. Proficient in React Native, React, TypeScript, JavaScript, and Node.js. Builds scalable applications with cutting-edge technologies.",
    image: tejasImg
  },
  {
    name: "Sharanyo Chakraborty",
    role: "Chief Marketing Officer",
    expertise: "Leads strategic marketing initiatives and community outreach programs. Develops campaigns to increase awareness and promotes innovative solutions across various domains.",
    image: abhinavaImg
  },
  {
    name: "Abhinava Bandopadhyay",
    role: "Head Of Product Design",
    expertise: "Experienced in ideation workflows with thorough knowledge of real-world problems. Perfect project pitching skills and robust expertise in robotics.",
    image: sharanyoImg
  },
  {
    name: "Tejas Singh",
    role: "Co-head of STEM (Mechanics)",
    expertise: "Skilled in mechanical design and implementation, with a focus on power systems and engineering solutions. Develops innovative mechanical components and systems.",
    image: samarohaImg
  },
  {
    name: "Ayushman Singh",
    role: "Lead 3D Designer",
    expertise: "Expert in additive manufacturing and rapid prototyping. Creates custom 3D-printed components and designs, enabling quick iteration and deployment of innovative solutions.",
    image: ""
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
            Passionate innovators dedicated to revolutionizing innovation through technology
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
