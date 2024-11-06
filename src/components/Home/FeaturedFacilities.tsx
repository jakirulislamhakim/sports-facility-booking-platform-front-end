import { Row, Col, Button, Carousel } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useMobileResponsive } from '../../hooks/useMobileResponsive';
import FacilityCard from './FacilityCard';
import ResponsiveContainer from '../../utils/ResponsiveContainer';
import SectionTitle from '../UI/SectionTitle';
import { useGetAllFacilitiesQuery } from '../../redux/features/facilities/facilitiesApi';
import '../../styles/home/featuredFacilities.css';
import { TFacility } from '../../types';
import { Link } from 'react-router-dom';

const FeaturedFacilities = () => {
  const isMobile = useMobileResponsive();
  const { data, isLoading } = useGetAllFacilitiesQuery([
    { name: 'limit', value: '3' },
    { name: 'sort', value: '-rating' },
  ]);

  const facilities = data?.data;

  // Mobile carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <ResponsiveContainer isNeedPadding={true}>
      {/* Section Header */}
      <SectionTitle
        title="Featured Facilities"
        description="Discover our most popular sports facilities, equipped with
            state-of-the-art amenities."
      />

      {/* Conditional rendering based on screen size */}
      {isMobile ? (
        // Mobile view - Carousel
        <Carousel {...carouselSettings}>
          {facilities?.map((facility: TFacility) => (
            <div key={facility._id}>
              <FacilityCard facility={facility} isLoading={isLoading} />
            </div>
          ))}
        </Carousel>
      ) : (
        // Desktop view - Grid
        <Row gutter={[24, 24]}>
          {facilities?.map((facility: TFacility) => (
            <Col xs={24} sm={12} lg={8} key={facility._id}>
              <FacilityCard facility={facility} isLoading={isLoading} />
            </Col>
          ))}
        </Row>
      )}

      {/* View All Button */}
      <div
        style={{
          textAlign: 'center',
          marginTop: isMobile ? 24 : 48,
          padding: isMobile ? '0 16px' : 0,
        }}
      >
        <Link to={'/facilities'}>
          <Button
            type="primary"
            size={isMobile ? 'middle' : 'large'}
            style={{ width: isMobile ? '100%' : 'auto' }}
          >
            View All Facilities <ArrowRightOutlined />
          </Button>
        </Link>
      </div>
    </ResponsiveContainer>
  );
};

export default FeaturedFacilities;
