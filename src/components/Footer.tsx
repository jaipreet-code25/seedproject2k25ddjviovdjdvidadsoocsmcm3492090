import { Link } from "react-router-dom";
import { Instagram, Twitter, Mail, MapPin, Heart } from "lucide-react";
import logo from "@/assets/WhatsApp Image 2026-02-25 at 8.42.03 AM.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/happy.drain.solutions/", icon: Instagram },
    { label: "Twitter", href: "https://x.com/happy_drain", icon: Twitter },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Happy Drains Solutions" className="h-12 w-auto rounded-lg" />
              <span className="text-xl font-bold">Happy Drains</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Innovative drainage solutions for a flood-free future. Keeping water flowing, keeping cities happy.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-border bg-background/50 hover:bg-primary/20 hover:text-primary hover:border-primary transition-all flex items-center justify-center text-muted-foreground"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Happy Drain Device</li>
              <li>Debris Collection Mesh</li>
              <li>Easy DIY Installation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:happydrainsolutionsstfe@gmail.com" className="hover:text-primary transition-colors">
                  happydrainsolutionsstfe@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-primary" />
                <a href="https://www.instagram.com/happy.drain.solutions/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  @happy.drain.solutions
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Happy Drains Solutions. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by the Happy Drains Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
