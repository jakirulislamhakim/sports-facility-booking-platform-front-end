import { Layout, Row, Col, Form, Input, Button, Typography } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import React from 'react';
import ResponsiveContainer from '../../utils/ResponsiveContainer';

const { Footer } = Layout;
const { Title, Text } = Typography;

type TFooterLinkProps = {
  href: string;
  name: string;
};

type TSocialMediaLinkProps = {
  href: string;
  icon: React.ReactNode;
  color: string;
};

const quickLinks = [
  { href: '/', name: 'Home' },
  { href: '/about', name: 'About Us' },
  { href: '/facilities', name: 'Facilities' },
  { href: '/faq', name: 'FAQs' },
  { href: '/contact', name: 'Contact Us' },
];

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer style={{ backgroundColor: '#AEF0BA', padding: '20px' }}>
      <ResponsiveContainer>
        <Row gutter={16} justify="space-between">
          <Col xs={24} sm={12} md={6}>
            <Title level={4}>Quick Links</Title>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {quickLinks.map((link, index) => (
                <FooterLink key={index} href={link.href} name={link.name} />
              ))}
            </ul>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={4}>Contact Us</Title>
            <Text>Phone: 01736100945</Text>
            <br />
            <Text>Email: jakirulislamhakim@gmail.com</Text>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={4}>Follow Us</Title>
            <div style={{ display: 'flex', gap: '10px' }}>
              <SocialMediaLink
                href="https://m.facebook.com/jakirulIslamHakim1"
                icon={<FacebookOutlined />}
                color="#4267B2"
              />
              <SocialMediaLink
                href="https://x.com/j_i__hakim"
                icon={<TwitterOutlined />}
                color="#1DA1F2"
              />
              <SocialMediaLink
                href="https://www.instagram.com/jakirul_islam_hakim"
                icon={<InstagramOutlined />}
                color="#DD2A7B"
              />
              <SocialMediaLink
                href="https://www.linkedin.com/in/jakirulislamhakim"
                icon={<LinkedinOutlined />}
                color="#0077B5"
              />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Title level={4}>Subscribe to Our Newsletter</Title>
            <Form
              layout="inline"
              style={{ display: 'flex', alignItems: 'center', gap: 0 }}
            >
              <Form.Item>
                <Input placeholder="Your email" style={{ width: '180px' }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size="small" htmlType="submit">
                  Subscribe
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

        <Row justify="center" style={{ marginTop: '20px' }}>
          <Text>
            © {currentYear} Sports Facility Booking Platform. All rights reserved by
            Jakirul Islam Hakim.
          </Text>
        </Row>
      </ResponsiveContainer>
    </Footer>
  );
};

// Reusable link component
const FooterLink = ({ href, name }: TFooterLinkProps) => (
  <li>
    <a href={href} style={{ color: '#000' }}>
      {name}
    </a>
  </li>
);

// Reusable social media link component
const SocialMediaLink = ({ href, icon, color }: TSocialMediaLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color,
      fontSize: '22px',
      padding: '2px 4px',
      borderRadius: '4px',
    }}
  >
    {icon}
  </a>
);

export default AppFooter;
