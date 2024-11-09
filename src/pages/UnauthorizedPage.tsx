import React from 'react';
import { Button, Result, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { RootState } from '../redux/store';
import PageTitle from '../components/Shared/PageTitle';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  // !! use double not logical operator for get only boolean value
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

  const handleAction = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      <PageTitle title="UNAUTHORIZED 😜" />
      <div>
        <Result
          status="403"
          title="Access Denied ⚠"
          subTitle={
            <Space direction="vertical" size={'small'}>
              <p>Sorry, you don't have permission to access this page.</p>
              <p>
                Please contact your administrator if you think this is a mistake.
              </p>
            </Space>
          }
          extra={[
            <Button
              key="home"
              type="default"
              icon={<HomeOutlined />}
              onClick={handleGoHome}
              size="small"
              style={{ margin: '0px  20px 20px 0px' }}
            >
              Go to Home
            </Button>,
            <Button
              key="dashboard"
              type="primary"
              icon={isAuthenticated ? <HomeOutlined /> : <LoginOutlined />}
              onClick={handleAction}
              size="small"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Login'}
            </Button>,
          ]}
        />
      </div>
    </>
  );
};

export default UnauthorizedPage;
