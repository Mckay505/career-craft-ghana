import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import successStudent1 from "@/assets/success-student-1.jpg";
import successStudent2 from "@/assets/success-student-2.jpg";

const Success = () => {
  const testimonials = [
    {
      name: "Akosua Mensah",
      university: "University of Ghana",
      degree: "Business Administration",
      image: successStudent1,
      quote: "Career Craft transformed my simple CV into a professional masterpiece. I landed my dream job at a top financial firm within weeks of graduation!",
      company: "Standard Chartered Bank"
    },
    {
      name: "Kwame Asante",
      university: "KNUST",
      degree: "Computer Engineering",
      image: successStudent2,
      quote: "The AI-powered CV creation was incredible. It highlighted skills I didn't even know how to present properly. Now I'm working as a software engineer!",
      company: "MTN Ghana"
    }
  ];

  const stats = [
    { number: "95%", label: "Employment Success Rate" },
    { number: "1000+", label: "Students Helped" },
    { number: "24hrs", label: "Average Turnaround" },
    { number: "20+", label: "Partner Universities" }
  ];

  return (
    <section id="success" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Student Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real Ghanaian students who transformed their careers with Career Craft. 
            Your success story could be next.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 relative overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-xl transition-all duration-300">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/20">
                <Quote className="w-12 h-12" />
              </div>

              <div className="flex items-start gap-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-card-foreground mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.degree} • {testimonial.university}
                    </p>
                    <p className="text-sm text-accent font-semibold">
                      Now at {testimonial.company}
                    </p>
                  </div>
                  <blockquote className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="p-12 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-primary/20 shadow-card">
            <h3 className="text-3xl font-bold mb-4 text-card-foreground">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of Ghanaian students who have transformed their career prospects with Career Craft. 
              Your professional journey starts with a single click.
            </p>
            <div className="text-sm text-muted-foreground">
              <strong className="text-secondary">Special Offer:</strong> First 100 students get 50% off their first CV
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Success;