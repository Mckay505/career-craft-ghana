import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Process from "@/components/sections/Process";
import Success from "@/components/sections/Success";
import Footer from "@/components/sections/Footer";
import Watermark from "@/components/layout/Watermark";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Process />
      <Success />
      <Footer />
      <Watermark />
    </div>
  );
};

export default Index;
