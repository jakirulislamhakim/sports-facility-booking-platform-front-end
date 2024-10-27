import { UserOutlined, VideoCameraOutlined, HomeFilled } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const { Sider } = Layout;

const sidebarItems = [
  {
    key: 'home',
    icon: <HomeFilled />,
    label: <NavLink to="/">Home</NavLink>,
  },
  {
    key: 'user',
    icon: <UserOutlined />,
    label: <NavLink to="/dashboard/user-profile">User</NavLink>,
  },
  {
    key: 'booking',
    icon: <VideoCameraOutlined />,
    label: <NavLink to="/dashboard/user/Bookings">Bookings</NavLink>,
  },
];

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={200}
      style={{
        background: 'white',
        borderRight: '1px solid #f0f0f0',
      }}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['user']}
        items={sidebarItems}
        style={{ marginTop: '30px' }}
      />
    </Sider>
  );
};

export default Sidebar;
