import { TeamOutlined, BulbOutlined, StarOutlined } from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';
import { useMobileResponsive } from '../../hooks/useMobileResponsive';

const { Title, Paragraph } = Typography;

// Values data
const values = [
  {
    title: 'Innovation',
    description: 'Continuously improving our platform with cutting-edge technology',
    icon: <BulbOutlined style={{ fontSize: '36px', color: '#1890ff' }} />,
  },
  {
    title: 'Community',
    description: 'Building strong connections between sports enthusiasts',
    icon: <TeamOutlined style={{ fontSize: '36px', color: '#52c41a' }} />,
  },
  {
    title: 'Excellence',
    description: 'Maintaining high standards in service and facility quality',
    icon: <StarOutlined style={{ fontSize: '36px', color: '#faad14' }} />,
  },
];

const OurMissionSection = () => {
  const isMobile = useMobileResponsive();

  return (
    <>
      <Row justify="center">
        <Col md={18}>
          <Card
            bordered={true}
            className="mission-card"
            style={{ border: '1px solid', padding: '0px' }}
          >
            <Title level={isMobile ? 4 : 3}>Our Mission</Title>
            <Paragraph
              style={{ fontSize: isMobile ? '14px' : '18px', textAlign: 'justify' }}
            >
              At Sports Facility Booking, we believe everyone deserves access to
              quality sports facilities. Our mission is to simplify the booking
              process and create a seamless connection between facility owners and
              sports enthusiasts, fostering an active and healthy community.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* core values */}
      <Row gutter={[32, 32]} justify="center" style={{ margin: '60px 0' }}>
        {values.map((value, index) => (
          <Col key={index} xs={24} sm={8}>
            <Card style={{ textAlign: 'center', height: '100%' }}>
              {value.icon}
              <Title level={isMobile ? 5 : 4} style={{ marginTop: '24px' }}>
                {value.title}
              </Title>
              <Paragraph>{value.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default OurMissionSection;
