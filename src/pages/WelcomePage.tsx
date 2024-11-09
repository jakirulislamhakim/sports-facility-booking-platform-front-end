import {
  Card,
  Avatar,
  Typography,
  Row,
  Col,
  Space,
  Descriptions,
  Button,
  Tooltip,
  Badge,
} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  MailOutlined,
  CalendarOutlined,
  EditOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { useGetUserProfileQuery } from '../redux/features/user/userApi';
import { useMobileResponsive } from '../hooks/useMobileResponsive';
import Loading from '../components/UI/Loading';
import PageTitle from '../components/Shared/PageTitle';

const { Title, Text } = Typography;

const WelcomePage = () => {
  const { data, isLoading } = useGetUserProfileQuery(undefined);
  const user = data?.data;
  const isMobile = useMobileResponsive();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <PageTitle title="PROFILE" />
      <Loading isLoading={isLoading}>
        <div
          style={{
            padding: isMobile ? '8px' : '16px',
          }}
        >
          {/* Welcome Banner */}
          <Card
            style={{
              marginBottom: isMobile ? 16 : 24,
              background: ' #AEF0BA',
              borderRadius: '8px',
              border: 'none',
              // padding: isMobile ? '8px' : '24px',
            }}
          >
            <Row justify="center" align="middle">
              <Col>
                <Badge.Ribbon text={user?.role === 'admin' && 'Admin'}>
                  <Avatar
                    size={isMobile ? 50 : 74}
                    icon={<UserOutlined />}
                    src={user?.avatar}
                    style={{ border: '4px solid white' }}
                  />
                </Badge.Ribbon>
              </Col>
              <Col style={{ marginLeft: isMobile ? 8 : 16 }}>
                <Title level={isMobile ? 4 : 2} style={{ margin: 0 }}>
                  Welcome back, {user?.name}!
                </Title>
                <Text>We're excited to see you again</Text>
              </Col>
            </Row>
          </Card>

          <Row justify="center">
            <Col xs={24} sm={20} md={16} lg={12}>
              <Card
                title={
                  <Space className="w-full justify-between">
                    <Space>
                      <UserOutlined style={{ color: '#1890ff' }} />
                      <span>Personal Information</span>
                    </Space>
                    {/* for future : NOTE update for profile info show modal and updated profile info */}
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      size="small"
                      ghost
                    >
                      Edit
                    </Button>
                  </Space>
                }
                bordered={false}
                style={{
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  textAlign: 'center',
                }}
              >
                <Descriptions
                  column={isMobile ? 1 : 2}
                  layout="vertical"
                  contentStyle={{
                    fontWeight: '500',
                    fontSize: isMobile ? '14px' : '15px',
                  }}
                  labelStyle={{
                    color: '#8c8c8c',
                  }}
                >
                  <Descriptions.Item
                    label={
                      <Space>
                        <MailOutlined style={{ color: '#1890ff' }} />
                        <span>Email</span>
                      </Space>
                    }
                  >
                    <Space>
                      {user?.email}
                      <Tooltip title="Copy email">
                        <Button
                          type="text"
                          icon={<CopyOutlined />}
                          size="small"
                          onClick={() => handleCopy(user?.email)}
                        />
                      </Tooltip>
                    </Space>
                  </Descriptions.Item>

                  <Descriptions.Item
                    label={
                      <Space>
                        <PhoneOutlined style={{ color: '#1890ff' }} />
                        <span>Phone</span>
                      </Space>
                    }
                  >
                    <Space>
                      {user?.phone}
                      <Tooltip title="Copy phone">
                        <Button
                          type="text"
                          icon={<CopyOutlined />}
                          size="small"
                          onClick={() => handleCopy(user?.phone)}
                        />
                      </Tooltip>
                    </Space>
                  </Descriptions.Item>

                  <Descriptions.Item
                    label={
                      <Space>
                        <HomeOutlined style={{ color: '#1890ff' }} />
                        <span>Address</span>
                      </Space>
                    }
                  >
                    <Space align="center">
                      <div>{user?.address}</div>
                      <Tooltip title="Copy address">
                        <Button
                          type="text"
                          icon={<CopyOutlined />}
                          size="small"
                          onClick={() => handleCopy(user?.address)}
                        />
                      </Tooltip>
                    </Space>
                  </Descriptions.Item>

                  <Descriptions.Item
                    label={
                      <Space>
                        <CalendarOutlined style={{ color: '#1890ff' }} />
                        <span>Member Since</span>
                      </Space>
                    }
                  >
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'N/A'}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </div>
      </Loading>
    </>
  );
};

export default WelcomePage;
