import { Card, Col, Row, Typography } from 'antd';
import { LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';
import { useMobileResponsive } from '../../hooks/useMobileResponsive';

const { Text, Title, Paragraph } = Typography;

// Team members data
const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    bio: 'Former professional athlete with 15 years of experience in sports facility management',
    image: 'https://i.ibb.co.com/8rSFwWS/IMG-20220217-230939.jpg',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/jakirulislamhakim/',
      twitter: 'https://x.com/j_i__hakim',
    },
  },
  {
    name: 'Michael Chen',
    role: 'Operations Director',
    bio: 'Specialized in optimizing facility scheduling and maintenance procedures',
    image: 'https://i.ibb.co.com/NFZqhk8/user.png',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/jakirulislamhakim/',
      twitter: 'https://x.com/j_i__hakim',
    },
  },
  {
    name: 'Emma Rodriguez',
    role: 'Community Manager',
    bio: 'Passionate about creating inclusive sports communities',
    image:
      'https://res.cloudinary.com/dpufrltp8/image/upload/v1730181636/sports-facility-image/dvs1yuj1vyfusrrzio3o.jpg',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/jakirulislamhakim/',
      twitter: 'https://x.com/j_i__hakim',
    },
  },
];

const MeetOurTeamSection = () => {
  const isMobile = useMobileResponsive();

  return (
    <>
      <Title
        level={isMobile ? 4 : 3}
        style={{ textAlign: 'center', margin: '60px 0 40px' }}
      >
        Meet Our Team
      </Title>
      <Row gutter={[32, 32]} justify="center">
        {teamMembers.map((member, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card
              cover={
                <img
                  alt={member.name}
                  src={member.image}
                  style={{
                    width: '100%',
                    height: isMobile ? '350px' : '400px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              }
              actions={[
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={member.socialLinks.linkedin}
                >
                  <LinkedinOutlined />
                </a>,
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={member.socialLinks.twitter}
                >
                  <TwitterOutlined />
                </a>,
              ]}
            >
              <Card.Meta
                title={<Title level={4}>{member.name}</Title>}
                description={
                  <>
                    <Text strong style={{ color: '#1890ff' }}>
                      {member.role}
                    </Text>
                    <Paragraph style={{ marginTop: '16px' }}>{member.bio}</Paragraph>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MeetOurTeamSection;
