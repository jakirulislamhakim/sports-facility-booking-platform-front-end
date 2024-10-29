import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import AboutUs from '../pages/AboutUs';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import DashboardLayout from '../layout/DashboardLayout';
import ProtectedRoute from '../layout/ProtectedRoute';
import UserBookingsTable from '../pages/user/UserBookingsTable';
import BookingDetails from '../pages/user/BookingDetails';
import WelcomePage from '../pages/WelcomePage';
import AddFacilityForm from '../pages/admin/AddFacilityForm';

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
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },

      // user routes here
      {
        path: 'user-profile',
        element: <WelcomePage />,
      },
      {
        path: 'user/bookings',
        element: <UserBookingsTable />,
      },
      {
        path: 'user/bookings/:bookingId',
        element: <BookingDetails />,
      },

      // admin routs here
      {
        path: 'admin-profile',
        element: <WelcomePage />,
      },
      {
        path: 'admin/add-facility',
        element: <AddFacilityForm />,
      },
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
]);

export default router;
