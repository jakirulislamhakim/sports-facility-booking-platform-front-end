import { Layout, Menu } from 'antd';
// import { userSidebarItems } from './sidebarItems/userSidebarItems';
import { adminSidebarItems } from './sidebarItems/adminSidebarItems';
import { useAppSelector } from '../redux/hooks';
import { currentToken } from '../redux/features/auth/authSlice';
import { userSidebarItems } from './sidebarItems/userSidebarItems';
import { jwtDecode } from 'jwt-decode';
import { TAuthUser } from '../types';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const { Sider } = Layout;

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const token = useAppSelector(currentToken);
  const location = useLocation();

  const [, , , currentKeys] = location.pathname.split('/');

  let sidebarItems = userSidebarItems;

  try {
    const decodedUser = jwtDecode(token!) as TAuthUser;
    if (decodedUser.role === 'admin') sidebarItems = adminSidebarItems;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    toast.error('invalid token');
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      style={{
        background: 'white',
        borderRight: '1px solid #f0f0f0',
      }}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['profile']}
        selectedKeys={[currentKeys || 'profile']}
        // set dynamic sidebar items for user and admin
        items={sidebarItems}
        style={{ marginTop: '30px' }}
      />
    </Sider>
  );
};

export default Sidebar;
