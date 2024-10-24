import { Button, Typography, Space, Row, Col, Result } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col>
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={[
              <Button
                type="primary"
                icon={<HomeOutlined />}
                onClick={handleBackHome}
                key="home"
              >
                Back to Home
              </Button>,
              // help center is not available so navigate contact pages
              <Button key="help" onClick={() => navigate('/contact')}>
                Help Center
              </Button>,
            ]}
          />

          <Row justify="center" style={{ marginTop: 32 }}>
            <Space direction="vertical" align="center">
              <Text type="secondary">
                Need help finding what you're looking for?
              </Text>
              <Space split={<Text type="secondary">|</Text>}>
                <Button type="link" onClick={() => navigate('/contact')}>
                  Contact Us
                </Button>
              </Space>
            </Space>
          </Row>
        </Col>
      </Row>{' '}
    </>
  );
};

export default ErrorPage;
