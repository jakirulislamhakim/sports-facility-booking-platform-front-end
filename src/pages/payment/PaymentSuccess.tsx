import { Result, Button, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col>
        <Result
          status="success"
          title="Payment Successful!"
          subTitle="Thank you for your payment. Your transaction was successful."
          extra={[
            <Button
              type="primary"
              key="home"
              onClick={() => navigate('/', { replace: true })}
            >
              Go to Homepage
            </Button>,
            <Button
              key="order"
              onClick={() => navigate('/dashboard/user/Bookings', { replace: true })}
            >
              View Your Booking
            </Button>,
          ]}
        />{' '}
      </Col>{' '}
    </Row>
  );
};

export default PaymentSuccess;
