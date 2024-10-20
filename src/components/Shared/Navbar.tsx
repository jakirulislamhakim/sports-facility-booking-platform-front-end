import { useState } from 'react';
import { Menu, Button, Drawer, Avatar } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import '../../styles/navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // Define the menu items
  const menuItems = [
    { key: 'home', label: <NavLink to={'/'}>Home</NavLink> },
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'about', label: <NavLink to={'/about-us'}>About Us</NavLink> },
    { key: 'contact', label: 'Contact Us' },
  ];

  return (
    <div style={{ backgroundColor: '#aee794' }}>
      <nav className="navbar" style={{ margin: 'auto' }}>
        <div className="navbar-logo">
          <Avatar
            size={{ xs: 40, sm: 40, md: 50, lg: 60, xl: 70, xxl: 80 }}
            src={'https://i.ibb.co.com/gjxbcTH/Screenshot-96.png'}
          />
        </div>

        <div className="navbar-menu">
          {/* Desktop Menu */}
          <Menu mode="horizontal" className="desktop-menu" items={menuItems} />

          {/* Mobile Drawer */}
          <Button
            className="menu-button"
            type="text"
            icon={<MenuOutlined />}
            onClick={showDrawer}
          />

          <Drawer title="MyLogo" placement="right" open={visible} onClose={onClose}>
            <Menu
              mode="vertical"
              items={[
                ...menuItems,
                { key: 'login', label: <Button type="primary">Login</Button> },
              ]}
            />
          </Drawer>
        </div>

        <div className="singInSingUp">
          <NavLink to={'/login'}>
            <Button type="primary">Login</Button>
          </NavLink>
        </div>
      </nav>{' '}
    </div>
  );
};

export default Navbar;
