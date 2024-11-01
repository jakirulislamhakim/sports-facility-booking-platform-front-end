import {
  UserOutlined,
  VideoCameraOutlined,
  HomeFilled,
  BookOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';

export const adminSidebarItems: MenuProps['items'] = [
  {
    key: 'home',
    icon: <HomeFilled />,
    label: <NavLink to="/">Home</NavLink>,
  },
  {
    key: 'admin',
    icon: <UserOutlined />,
    label: <NavLink to="/dashboard/admin-profile">Admin Profile</NavLink>,
  },
  {
    key: 'facilityManagement',
    icon: <VideoCameraOutlined />,
    label: 'Facility Management',
    children: [
      {
        key: 'addFacility',
        label: <NavLink to="/dashboard/admin/add-facility">Add Facility</NavLink>,
      },
      {
        key: 'facility-table',
        label: (
          <NavLink to="/dashboard/admin/facility-table">Facility Table</NavLink>
        ),
      },
    ],
  },
  {
    key: 'bookings-table',
    icon: <BookOutlined />,
    label: <NavLink to="/dashboard/admin/bookings-table">Bookings Table</NavLink>,
  },
  {
    key: 'create-admin',
    icon: <UserAddOutlined />,
    label: <NavLink to="/dashboard/admin/create-admin">Create an Admin</NavLink>,
  },
];
