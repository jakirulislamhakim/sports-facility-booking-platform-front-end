import { RouteObject } from 'react-router-dom';
import BookingDetails from '../pages/user/BookingDetails';
import UserBookingsTable from '../pages/user/UserBookingsTable';
import WelcomePage from '../pages/WelcomePage';
import ProtectedRoute from '../layout/ProtectedRoute';

const userRoutes: RouteObject[] = [
  {
    path: 'user/profile',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <WelcomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: 'user/bookings',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <UserBookingsTable />,
      </ProtectedRoute>
    ),
  },
  {
    path: 'user/bookings/:bookingId',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <BookingDetails />,
      </ProtectedRoute>
    ),
  },
];

export default userRoutes;
