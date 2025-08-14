import { Card } from "@/components/ui/card";
import { Bot, FileText, Mail, Star, Users, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI-Powered CV Creation",
      description: "Advanced AI algorithms craft personalized CVs that highlight your unique strengths and achievements.",
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Professional Templates",
      description: "Industry-standard templates designed specifically for Ghanaian job market requirements.",
      gradient: "from-secondary to-yellow-500"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Direct Email Delivery",
      description: "Receive your polished CV directly in your inbox, ready for job applications.",
      gradient: "from-accent to-green-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Expert Review",
      description: "Every CV is reviewed by career experts to ensure maximum impact and effectiveness.",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Student-Focused",
      description: "Tailored specifically for university students and recent graduates in Ghana.",
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Quick Turnaround",
      description: "Get your professional CV within 24-48 hours of submitting your information.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Why Choose Career Craft?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We combine cutting-edge AI technology with deep understanding of the Ghanaian job market 
            to create CVs that get you noticed by employers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative p-8 hover:shadow-card transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-0">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-6 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;