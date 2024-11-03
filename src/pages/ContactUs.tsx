import { Card, Col, Typography } from 'antd';
import ContactUsForm from '../components/ContactUs/ContactUsForm';
import SectionTitle from '../components/UI/SectionTitle';
import ResponsiveContainer from '../utils/ResponsiveContainer';
import ContactSection from '../components/AboutUs/ContactSection';
import { useMobileResponsive } from '../hooks/useMobileResponsive';

const { Title } = Typography;

const ContactUs = () => {
  const isMobile = useMobileResponsive();

  return (
    <ResponsiveContainer isNeedPadding>
      <SectionTitle
        title="Contact Us"
        description="We’d love to hear from you! Reach out with any questions, feedback, or inquiries."
      />
      <ContactUsForm />

      {/* Map Embed  */}
      <Col style={{ marginTop: '60px' }}>
        <Title
          level={isMobile ? 3 : 2}
          style={{ textAlign: 'center', marginBottom: '30px' }}
        >
          Our Location
        </Title>
        <Card>
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3003.305531915375!2d90.58578654630728!3d24.68951193276083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3756593327e4cb49%3A0xdf0e474d56fa821a!2zQ29tbWFuZGVyIEJhcmkgTW9zcXVlIC0g4KaV4Kau4Ka-4Kao4KeN4Kah4Ka-4KawIOCmrOCmvuCmoeCmvOCmvyDgpq7gprjgppzgpr_gpqY!5e0!3m2!1sen!2sbd!4v1730608791415!5m2!1sen!2sbd"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </Card>
      </Col>
      {/* contact section */}
      <ContactSection />
    </ResponsiveContainer>
  );
};

export default ContactUs;
