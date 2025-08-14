import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" }
  ];

  const quickLinks = [
    { label: "About Us", href: "#" },
    { label: "How It Works", href: "#process" },
    { label: "Success Stories", href: "#success" },
    { label: "Pricing", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Contact", href: "#contact" }
  ];

  const universities = [
    "University of Ghana",
    "KNUST",
    "University of Cape Coast", 
    "GIMPA",
    "Ashesi University",
    "University of Education"
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-secondary to-yellow-500 text-primary shadow-lg">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Career Craft</h3>
                <p className="text-sm text-primary-foreground/80">by McKay Group</p>
              </div>
            </div>
            <p className="text-primary-foreground/90 leading-relaxed mb-6">
              Empowering Ghanaian students with AI-powered CV creation to bridge the gap between education and employment.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-secondary hover:text-primary transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Universities */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Partner Universities</h4>
            <ul className="space-y-3">
              {universities.map((university, index) => (
                <li key={index} className="text-primary-foreground/80 text-sm">
                  {university}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <div className="text-primary-foreground/80 text-sm">
                  <p>Accra Digital Centre</p>
                  <p>Ring Road Central, Accra</p>
                  <p>Ghana</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">+233 24 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">hello@careercraft.gh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/80 text-sm text-center md:text-left">
              © 2024 Career Craft by McKay Group of Companies. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;