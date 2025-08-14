import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus, FileText, Bot, Mail } from "lucide-react";

const Process = () => {
  const steps = [
    {
      step: "01",
      icon: <UserPlus className="w-8 h-8" />,
      title: "Sign Up & Fill Profile",
      description: "Create your account and complete your student profile with academic details, skills, and achievements.",
      color: "primary"
    },
    {
      step: "02", 
      icon: <FileText className="w-8 h-8" />,
      title: "Submit Information",
      description: "Provide your educational background, certifications, projects, and career aspirations through our guided form.",
      color: "secondary"
    },
    {
      step: "03",
      icon: <Bot className="w-8 h-8" />,
      title: "AI Crafting Magic",
      description: "Our advanced AI analyzes your information and crafts a professional CV tailored to Ghanaian job market standards.",
      color: "accent"
    },
    {
      step: "04",
      icon: <Mail className="w-8 h-8" />,
      title: "Receive Your CV",
      description: "Get your polished, professional CV delivered directly to your email within 24-48 hours, ready for applications.",
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "from-primary to-primary-glow";
      case "secondary":
        return "from-secondary to-yellow-500";
      case "accent":
        return "from-accent to-green-500";
      case "purple":
        return "from-purple-600 to-pink-600";
      default:
        return "from-primary to-primary-glow";
    }
  };

  return (
    <section id="process" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            How Career Craft Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined process makes it easy for any Ghanaian student to get a professional CV. 
            From signup to success in just 4 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-8 text-center h-full bg-gradient-card border-0 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Step Number */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${getColorClasses(step.color)} text-white font-bold text-xl mb-6 shadow-lg`}>
                  {step.step}
                </div>

                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${getColorClasses(step.color)} text-white mb-6 shadow-lg`}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-card-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>

              {/* Arrow for larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/20 shadow-card">
            <h3 className="text-3xl font-bold mb-4 text-card-foreground">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the growing community of successful Ghanaian graduates. 
              Your career transformation is just one click away.
            </p>
            <Button variant="hero" size="lg" className="text-lg px-12 py-4">
              Begin Your Career Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Process;