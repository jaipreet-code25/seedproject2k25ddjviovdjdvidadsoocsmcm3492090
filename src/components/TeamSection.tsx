import TeamMember from "./TeamMember";
import teamGroup from "@/assets/team-group.jpg";
import jaipreetImg from "@/assets/jaipreet.jpg";
import samarohaImg from "@/assets/samaroha.jpg";
import sharanyoImg from "@/assets/sharanyo.jpg";
import abhinavaImg from "@/assets/abhinava.jpg";
import tejasImg from "@/assets/tejas.jpg";
import ayushmanImg from "@/assets/ahun.jpg";
import ai from "@/assets/ayushman1.jpg";
const teamMembers = [
  {
    name: "Jaipreet Purkayastha",
    role: "Joint Head of STEM (Technology)",
    expertise: "Proficient in Arduino, ESP32, and embedded systems; strong in Python, Java, and C. Web app developer experienced with diverse modules and integrations.",
    image: jaipreetImg
  },
  {
    name: "Samaroha Bhattacharyya",
    role: "Head of Web Design",
    expertise: "Full-stack developer specializing in mobile and web development. Proficient in React Native, React, TypeScript, JavaScript, and Node.js. Builds scalable applications with cutting-edge technologies.",
    image: tejasImg
  },
  {
    name: "Sharanyo Chakraborty",
    role: "Head of Marketing",
    expertise: "Expert in Mass Communication. Graphic Designer and Video Editor. Master of advertising and social media advertisement and management.",
    image: abhinavaImg
  },
  {
    name: "Abhinava Bandopadhyay",
    role: "Joint Head of 3D Design",
    expertise: "Experienced in ideation workflows with thorough knowledge of real-world problems. Perfect project pitching skills and robust expertise in robotics.",
    image: sharanyoImg
  },
  {
    name: "Tejas Singh",
    role: "Joint Head of STEM (Mechanics)",
    expertise: "Skilled in mechanical design and implementation, with a focus on power systems and engineering solutions. Develops innovative mechanical components and systems.",
    image: samarohaImg
  },
  {
    name: "Ayushman Singh",
    role: "Joint Head of 3D Design",
    expertise: "Thorough experience in 3D design and 3D printing with extensive knowledge of additive production and mechanical linkages. Creates custom 3D-printed components and designs for rapid prototyping and innovative solutions.",
    image: ai
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
            Professional drainage experts dedicated to keeping your property flowing
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
