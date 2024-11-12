import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import AboutUs from '../pages/AboutUs';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import DashboardLayout from '../layout/DashboardLayout';
import ProtectedRoute from '../layout/ProtectedRoute';
import WelcomePage from '../pages/WelcomePage';
import ContactUs from '../pages/ContactUs';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import userRoutes from './userRoutes';
import adminRoutes from './adminRoutes';
import Facilities from '../pages/Facilities';
import FacilityDetails from '../pages/FacilityDetails';
import PaymentSuccess from '../pages/payment/Payment';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
      {
        path: 'contact-us',
        element: <ContactUs />,
      },
      {
        path: '/facilities',
        element: <Facilities />,
      },
      {
        path: '/facilities/:facilityId',
        element: <FacilityDetails />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin', 'user']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },

      // user routes here
      ...userRoutes,
      // admin routs here
      ...adminRoutes,
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },
  {
    path: 'payment/:status',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <PaymentSuccess />
      </ProtectedRoute>
    ),
  },
]);

export default router;
