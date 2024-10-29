import { Layout, Menu } from 'antd';
// import { userSidebarItems } from './sidebarItems/userSidebarItems';
import { adminSidebarItems } from './sidebarItems/adminSidebarItems';

const { Sider } = Layout;

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
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
        defaultSelectedKeys={['user']}
        // set dynamic sidebar items for user and admin
        items={adminSidebarItems}
        style={{ marginTop: '30px' }}
      />
    </Sider>
  );
};

export default Sidebar;
