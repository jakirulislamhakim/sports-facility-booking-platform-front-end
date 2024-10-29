import { UserOutlined, VideoCameraOutlined, HomeFilled } from '@ant-design/icons';
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
        key: 'updateFacility',
        label: (
          <NavLink to="/dashboard/admin/update-facility">Update Facility</NavLink>
        ),
      },
      {
        key: 'removeFacility',
        label: (
          <NavLink to="/dashboard/admin/remove-facility">Remove Facility</NavLink>
        ),
      },
    ],
  },
];
