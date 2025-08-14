import { Button } from "@/components/ui/button";
import heroImage from "@/assets/students-studying-hero.jpg";
import { ArrowRight, Star, Users, Trophy, BookOpen } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Ghanaian students studying together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8 animate-float">
            <Star className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Ghana's Premier Career Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Career</span>
            <span className="bg-gradient-to-r from-secondary via-white to-accent bg-clip-text text-transparent">
              Craft
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Transforming Ghanaian students into career-ready professionals with AI-powered CV and resume crafting. 
            Your gateway to employment success starts here.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-secondary" />
              <span className="font-semibold">1000+ Students Served</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="font-semibold">95% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              <span className="font-semibold">AI-Powered Crafting</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:text-primary">
              Learn More
            </Button>
          </div>

          {/* Trust Indicator */}
          <p className="mt-8 text-white/70 text-sm">
            Trusted by students from University of Ghana, KNUST, UCC, and 20+ institutions
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default Hero;