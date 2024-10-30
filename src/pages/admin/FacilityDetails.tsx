import {
  Row,
  Col,
  Card,
  Typography,
  Rate,
  Divider,
  Tag,
  Button,
  Descriptions,
  Image,
  Space,
} from 'antd';
import {
  DollarCircleOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useMobileResponsive } from '../../hooks/useMobileResponsive';
import { useGetSingleFacilityQuery } from '../../redux/features/facilities/facilitiesApi';
import { useParams } from 'react-router-dom';
import Loading from '../../components/UI/Loading';

const { Title, Paragraph } = Typography;

const FacilityDetails = () => {
  const { facilityId } = useParams();
  const { data, isLoading } = useGetSingleFacilityQuery(facilityId as string);

  const isMobile = useMobileResponsive();

  // facility data
  const facility = data?.data;

  return (
    <Loading isLoading={isLoading}>
      <div style={{ overflow: 'hidden', maxWidth: '1220px', margin: '0 auto' }}>
        {/* Header Section */}
        <Row gutter={[24, 24]} style={{ overflow: 'hidden' }}>
          <Col xs={24}>
            <Card>
              <Row gutter={[24, 24]} align="middle">
                <Col xs={24} md={16}>
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                      <Title level={isMobile ? 3 : 2} style={{ marginBottom: 8 }}>
                        {facility?.name}
                      </Title>
                      <Space size="large">
                        <Rate
                          disabled
                          defaultValue={facility?.rating ?? 0}
                          allowHalf
                          style={{ fontSize: isMobile ? '14px' : '18px' }}
                        />
                        <span
                          style={{
                            fontSize: isMobile ? '12px' : '16px',
                            color: '#666',
                          }}
                        >
                          {facility?.rating} out of 5
                        </span>
                      </Space>
                    </div>
                    <Space>
                      <Tag icon={<EnvironmentOutlined />} color="blue">
                        {facility?.location}
                      </Tag>
                      <Tag icon={<DollarCircleOutlined />} color="green">
                        ${facility?.pricePerHour}/hour
                      </Tag>
                    </Space>
                  </Space>
                </Col>
                <Col
                  xs={24}
                  md={8}
                  style={{ textAlign: isMobile ? 'left' : 'right' }}
                >
                  <Button type="primary" size={isMobile ? 'small' : 'large'}>
                    Book Now
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Main Content Section */}
        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          {/* Left Column - Image and Description */}
          <Col xs={24} lg={16}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Card style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                  src={facility?.image}
                  alt={facility?.name}
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </Card>

              <Card>
                <Title level={isMobile ? 5 : 4}>About the Facility</Title>
                <Paragraph style={{ fontSize: isMobile ? '14px' : '16px' }}>
                  {facility?.description}
                </Paragraph>

                <Divider />

                <Title level={isMobile ? 5 : 4}>Amenities</Title>
                <Row gutter={[8, 8]}>
                  <Col xs={20} sm={12} md={8}>
                    <Tag
                      color="processing"
                      style={{ padding: '2px 4px', marginBottom: '4px' }}
                    >
                      Free Parking
                    </Tag>
                  </Col>
                  <Col xs={20} sm={12} md={8}>
                    <Tag
                      color="processing"
                      style={{ padding: '2px 4px', marginBottom: '4px' }}
                    >
                      Changing Rooms
                    </Tag>
                  </Col>
                  <Col xs={20} sm={12} md={8}>
                    <Tag
                      color="processing"
                      style={{ padding: '2px 4px', marginBottom: '4px' }}
                    >
                      Equipment Rental
                    </Tag>
                  </Col>
                </Row>
              </Card>
            </Space>
          </Col>

          {/* Right Column - Booking Info and Details */}
          <Col xs={24} lg={8}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Card>
                <Title level={isMobile ? 5 : 4}>Booking Information</Title>
                <Descriptions column={1}>
                  <Descriptions.Item
                    label={
                      <Space>
                        <DollarCircleOutlined /> Price
                      </Space>
                    }
                  >
                    <span
                      style={{
                        fontSize: isMobile ? '14px' : '16px',
                        fontWeight: 'bold',
                        color: '#52c41a',
                      }}
                    >
                      ${facility?.pricePerHour} per hour
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <Space>
                        <ClockCircleOutlined /> Operating Hours
                      </Space>
                    }
                  >
                    6:00 AM - 10:00 PM
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <Space>
                        <CalendarOutlined /> Availability
                      </Space>
                    }
                  >
                    Monday - Sunday
                  </Descriptions.Item>
                </Descriptions>

                <Divider />

                <Button type="primary" block size={isMobile ? 'small' : 'large'}>
                  Check Availability
                </Button>
              </Card>

              <Card>
                <Title level={isMobile ? 5 : 4}>Location</Title>
                <Tag
                  icon={<EnvironmentOutlined />}
                  color="blue"
                  style={{ padding: '6px 12px' }}
                >
                  {facility?.location}
                </Tag>
                {/* Placeholder for map */}
                <div
                  style={{
                    height: '200px',
                    background: '#f0f2f5',
                    marginTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                  }}
                >
                  Map View is not available
                </div>
              </Card>
            </Space>
          </Col>
        </Row>
      </div>
    </Loading>
  );
};

export default FacilityDetails;
