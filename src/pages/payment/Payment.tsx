import { useParams } from 'react-router-dom';
import PaymentSuccess from './PaymentSuccess';
import PaymentFailed from './PaymentFailed';

const Payment = () => {
  const { status } = useParams();

  return <>{status === 'success' ? <PaymentSuccess /> : <PaymentFailed />}</>;
};

export default Payment;
