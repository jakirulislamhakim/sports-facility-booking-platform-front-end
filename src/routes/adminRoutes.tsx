import { RouteObject } from 'react-router-dom';
import AddFacilityForm from '../pages/admin/AddFacilityForm';
import BookingsTable from '../pages/admin/BookingTable';
import CreateAdmin from '../pages/admin/CreateAdmin';
import FacilityDetails from '../pages/FacilityDetails';
import FacilityTable from '../pages/admin/FacilityTable';
import FacilityUpdate from '../pages/admin/FacilityUpdate';
import WelcomePage from '../pages/WelcomePage';
import ProtectedRoute from '../layout/ProtectedRoute';

const adminRoutes: RouteObject[] = [
  {
    path: 'admin/profile',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <WelcomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/add-facility',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AddFacilityForm />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/facility-table',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <FacilityTable />,
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/facility-details/:facilityId',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <FacilityDetails />,
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/facility-update/:facilityId',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <FacilityUpdate />,
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/bookings-table',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <BookingsTable />,
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin/create-admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <CreateAdmin />,
      </ProtectedRoute>
    ),
  },
];

export default adminRoutes;
