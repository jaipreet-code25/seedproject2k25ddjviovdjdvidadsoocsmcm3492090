import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TeamMemberProps {
  name: string;
  role: string;
  expertise: string;
  image: string;
  index: number;
}

const TeamMember = ({ name, role, expertise, image, index }: TeamMemberProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ perspective: "1000px" }}
      >
        <Card className="card-glass hover:border-primary/50 transition-all duration-300 h-full group overflow-hidden">
          <div className="relative h-64 md:h-80 overflow-hidden">
            <motion.img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover object-top"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <CardHeader className="space-y-2">
            <div className="text-center">
              <CardTitle className="text-2xl mb-2">{name}</CardTitle>
              <CardDescription className="text-primary font-semibold">
                {role}
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {expertise}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TeamMember;
