import { UserOutlined, VideoCameraOutlined, HomeFilled } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';

export const userSidebarItems: MenuProps['items'] = [
  {
    key: 'home',
    icon: <HomeFilled />,
    label: <NavLink to="/">Home</NavLink>,
  },
  {
    key: 'user',
    icon: <UserOutlined />,
    label: <NavLink to="/dashboard/user/profile">User Profile</NavLink>,
  },
  {
    key: 'booking',
    icon: <VideoCameraOutlined />,
    label: <NavLink to="/dashboard/user/Bookings">Bookings</NavLink>,
  },
];
