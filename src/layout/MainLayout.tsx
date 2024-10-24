import { Outlet } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';
import AppFooter from '../components/Shared/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default MainLayout;
