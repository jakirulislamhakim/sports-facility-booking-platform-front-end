import { Card, Col, Row, Timeline, Typography } from 'antd';
import {
  TrophyOutlined,
  RocketOutlined,
  GlobalOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import { useMobileResponsive } from '../../hooks/useMobileResponsive';

const { Title, Paragraph } = Typography;

// Timeline data
const timelineItems = [
  {
    year: '2020',
    title: 'Platform Launch',
    description: 'Started with 5 partner facilities in the city center',
    icon: <RocketOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
  },
  {
    year: '2021',
    title: 'Expansion Phase',
    description: 'Partnered with 20+ facilities across the region',
    icon: <GlobalOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
  },
  {
    year: '2022',
    title: 'Mobile App Launch',
    description: 'Introduced seamless booking experience on mobile devices',
    icon: <MobileOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
  },
  {
    year: '2023',
    title: 'Community Achievement',
    description: 'Reached 100,000 successful bookings milestone',
    icon: <TrophyOutlined style={{ fontSize: '24px', color: '#faad14' }} />,
  },
];

const OurJourneyTimeLineSection = () => {
  const isMobile = useMobileResponsive();

  return (
    <Row justify="center" style={{ margin: '60px 10px' }}>
      <Col span={24} md={18}>
        <Title
          level={isMobile ? 3 : 2}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          Our Journey
        </Title>
        <Timeline mode={isMobile ? 'left' : 'alternate'}>
          {timelineItems.map((item, index) => (
            <Timeline.Item key={index} dot={item.icon}>
              <Card bordered={false}>
                <Title level={isMobile ? 5 : 4}>
                  {item.year} - {item.title}
                </Title>
                <Paragraph>{item.description}</Paragraph>
              </Card>
            </Timeline.Item>
          ))}
        </Timeline>
      </Col>
    </Row>
  );
};

export default OurJourneyTimeLineSection;
