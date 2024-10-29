import { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Typography, Drawer } from 'antd';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useMobileResponsive } from '../hooks/useMobileResponsive';

const { Title } = Typography;
const { Header, Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMobileResponsive();

  useEffect(() => {
    // Collapse sidebar by default on mobile
    if (isMobile) setCollapsed(true);
  }, [isMobile]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ? (
        // Use Drawer for mobile sidebar
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setCollapsed(true)}
          open={!collapsed}
          width={280}
        >
          <Sidebar collapsed={false} />
        </Drawer>
      ) : (
        <Sidebar collapsed={collapsed} />
      )}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: 'white',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{ fontSize: '16px' }}
          />
          <Title
            level={isMobile ? 5 : 3}
            style={{ margin: 0, textAlign: 'center', flex: 1 }}
          >
            Sports Facility Booking
          </Title>
        </Header>
        <Content
          style={{
            padding: isMobile ? '8px' : '24px',
            background: '#f0f2f5',
            minHeight: '500px',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
