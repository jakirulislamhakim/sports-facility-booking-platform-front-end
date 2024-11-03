import { Card, Col, Row, Typography } from 'antd';
import { useMobileResponsive } from '../../hooks/useMobileResponsive';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ContactSection = () => {
  const isMobile = useMobileResponsive();

  return (
    <Row justify={'center'} style={{ margin: '30px 0' }}>
      <Col span={24}>
        <Card bordered={false}>
          <Title
            level={isMobile ? 3 : 2}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            Get in Touch
          </Title>
          <Row gutter={[32, 32]} justify={'center'}>
            <Col xs={24} md={12} style={{ textAlign: 'center' }}>
              <Card bordered={false}>
                <EnvironmentOutlined
                  style={{ fontSize: '24px', color: '#1890ff' }}
                />
                <Title level={isMobile ? 5 : 4}>Visit Us</Title>
                <Paragraph>123 Sports Avenue , Mymensingh</Paragraph>
              </Card>
            </Col>

            <Col xs={24} md={12} style={{ textAlign: 'center' }}>
              <Card bordered={false}>
                <PhoneOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                <Title level={isMobile ? 5 : 4}>Call Us</Title>
                <Paragraph>
                  <a href="tel:01736100945">01736100945</a>
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} md={12} style={{ textAlign: 'center' }}>
              <Card bordered={false}>
                <MailOutlined style={{ fontSize: '24px', color: '#722ed1' }} />
                <Title level={isMobile ? 5 : 4}>Email Us</Title>
                <Paragraph>
                  <a href="mailto:jakiruislamhakim@gmail.com">
                    jakirulislamhakim@gmail.com
                  </a>
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} md={12} style={{ textAlign: 'center' }}>
              <Card bordered={false}>
                <ClockCircleOutlined
                  style={{ fontSize: '24px', color: '#722ed1' }}
                />
                <Title level={isMobile ? 5 : 4}>Opening Hours</Title>
                <Paragraph>Monday - Friday: 9:00 AM - 6:00 PM</Paragraph>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ContactSection;
