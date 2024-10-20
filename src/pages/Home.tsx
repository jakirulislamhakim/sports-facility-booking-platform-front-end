import { Outlet } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Home;
