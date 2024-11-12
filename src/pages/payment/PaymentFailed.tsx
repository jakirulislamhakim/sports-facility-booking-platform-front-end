import { Result, Button, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col>
        <Result
          status="error"
          title="Payment Failed"
          subTitle="Unfortunately, your payment could not be completed. Please try again or contact support."
          extra={[
            <Button
              type="primary"
              key="retry"
              onClick={() => navigate('/facilities')}
            >
              Go to Facilities
            </Button>,
            <Button key="home" onClick={() => navigate('/')}>
              Go to Homepage
            </Button>,
          ]}
        />{' '}
      </Col>
    </Row>
  );
};

export default PaymentFailed;
