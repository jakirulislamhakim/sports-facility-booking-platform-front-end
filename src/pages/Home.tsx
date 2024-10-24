import FAQSection from '../components/Home/FAQSection';
import FeaturedFacilities from '../components/Home/FeaturedFacilities';
import HeroSection from '../components/Home/HeroSections';
import HowItWorksSection from '../components/Home/HowItWorksSection ';
import TestimonialsSection from '../components/Home/TestimonialsSection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturedFacilities />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection/>
    </>
  );
};

export default Home;
