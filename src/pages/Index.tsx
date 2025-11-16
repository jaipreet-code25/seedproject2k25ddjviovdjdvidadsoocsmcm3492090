import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div id="home">
        <HeroSection />
      </div>
      <AboutSection />
      <ProjectsSection />
      <div id="team">
        <TeamSection />
      </div>
      <ContactSection />
    </main>
  );
};

export default Index;