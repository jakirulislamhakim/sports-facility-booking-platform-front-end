import { Button, notification } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const useShowLoginAlertNotification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const showNotification = (description: string) => {
    notification.info({
      message: 'You need to login',
      description,
      btn: (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            notification.destroy('destroyKey');
            navigate('/login', { state: { from: location } });
          }}
        >
          Login Now
        </Button>
      ),
      duration: 5,
      key: 'destroyKey',
      placement: 'top',
    });
  };

  return showNotification;
};

export default useShowLoginAlertNotification;
