import ScrollToTop from 'react-scroll-to-top';
import FAQSection from '../components/Home/FAQSection';
import FeaturedFacilities from '../components/Home/FeaturedFacilities';
import HeroSection from '../components/Home/HeroSections';
import HowItWorksSection from '../components/Home/HowItWorksSection ';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import PageTitle from '../components/Shared/PageTitle';
import { useMobileResponsive } from '../hooks/useMobileResponsive';

const Home = () => {
  const isMobile = useMobileResponsive();

  return (
    <>
      <PageTitle title="HOME" />
      <HeroSection />
      <FeaturedFacilities />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      {/* scroll to top btn */}
      <ScrollToTop
        smooth={true}
        top={50}
        width={isMobile ? '16' : '24'}
        height={isMobile ? '16' : '24'}
      />
    </>
  );
};

export default Home;
