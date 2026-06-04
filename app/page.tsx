import Hero from "@/components/Hero";
import VillasSection from "@/components/VillasSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <VillasSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
