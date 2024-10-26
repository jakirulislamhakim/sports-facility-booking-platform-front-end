import { useState } from 'react';
import { Menu, Button, Drawer, Avatar } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import '../../styles/navbar.css';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { logoutUser } from '../../redux/features/auth/authSlice';
import { toast } from 'sonner';
import { useMobileResponsive } from '../../hooks/useMobileResponsive';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();

  // Use react-responsive to detect if the screen width is 768px or less
  // const isMobile = useMediaQuery({ maxWidth: 768 });
  const isMobile = useMobileResponsive();

  // Handle drawer open/close
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // Define the menu items
  const menuItems = [
    { key: 'home', label: <NavLink to={'/'}>Home</NavLink> },
    { key: 'dashboard', label: <NavLink to={'/dashboard'}>Dashboard</NavLink> },
    { key: 'about', label: <NavLink to={'/about-us'}>About Us</NavLink> },
    { key: 'contact', label: 'Contact Us' },
  ];

  const handleLogoutUser = () => {
    dispatch(logoutUser());
    toast.success('Logout Successfully');
  };

  return (
    <div style={{ backgroundColor: '#AEF0BA' }}>
      <nav className="navbar" style={{ margin: 'auto' }}>
        <div className="navbar-logo">
          <Avatar
            size={{ xs: 40, sm: 40, md: 50, lg: 60, xl: 70, xxl: 80 }}
            src={'https://i.ibb.co.com/gjxbcTH/Screenshot-96.png'}
          />
        </div>

        <div className="navbar-menu">
          {/* Desktop Menu */}
          {!isMobile && (
            <Menu mode="horizontal" className="desktop-menu" items={menuItems} />
          )}

          {/* Mobile Drawer */}
          {isMobile && (
            <Button
              className="menu-button"
              type="text"
              icon={<MenuOutlined />}
              onClick={showDrawer}
            />
          )}

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
          {user ? (
            <Button onClick={handleLogoutUser} type="primary">
              Logout
            </Button>
          ) : (
            <NavLink to={`/login`}>
              <Button type="primary">Login</Button>
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
