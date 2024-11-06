import { Button, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive';
import '../../styles/home/heroSections.css'; // Importing custom styles for background image
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const HeroSection = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div className="hero-section">
      <div className="overlay"></div>
      <div className="hero-content">
        <Title level={isMobile ? 3 : 1} style={{ color: '#fff' }}>
          Play More, Worry Less
        </Title>
        <Text style={{ color: '#fff', fontSize: isMobile ? '16px' : '20px' }}>
          Find and book top-rated sports facilities without the hassle.
        </Text>
        <div style={{ marginTop: '20px' }}>
          <Link to={'/facilities'}>
            <Button type="primary" size={isMobile ? 'small' : 'large'}>
              Discover Facilities
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
