import { Divider } from 'antd';
import SectionTitle from '../components/UI/SectionTitle';
import ResponsiveContainer from '../utils/ResponsiveContainer';
import OurMissionSection from '../components/AboutUs/OurMissionSection';
import MeetOurTeamSection from '../components/AboutUs/MeetOurTeamSection';
import OurJourneyTimeLineSection from '../components/AboutUs/OurJourneyTimeLineSection';
import ContactSection from '../components/AboutUs/ContactSection';

const AboutUs = () => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <ResponsiveContainer isNeedPadding>
        <SectionTitle
          title="About Us"
          description="Connecting Sports Enthusiasts with Premium Facilities"
        />
        <Divider />

        {/* Mission Statement */}
        <OurMissionSection />
        <Divider />

        {/* Meet our team */}
        <MeetOurTeamSection />
        <Divider />

        {/* Our Journey Timeline */}
        <OurJourneyTimeLineSection />
        <Divider />

        <ContactSection />
      </ResponsiveContainer>
    </div>
  );
};

export default AboutUs;
