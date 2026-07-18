import FAQ from "@/components/home/FAQ";
import FeaturedHouses from "@/components/home/FeaturedCourses";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import TrustedPartners from "@/components/home/TrustedPartners";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedHouses />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Statistics />
      <TrustedPartners />
      
    </main>
  );
}