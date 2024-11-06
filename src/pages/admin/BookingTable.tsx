import { Table, Tag, Typography, Grid } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useGetAdminBookingsAllFacilitiesQuery } from '../../redux/features/user/userBookingsApi';
import { TBookingData } from '../../types';
import { useMobileResponsive } from '../../hooks/useMobileResponsive';
import SectionTitle from '../../components/UI/SectionTitle';

const { Text } = Typography;
const { useBreakpoint } = Grid;

const BookingsTable = () => {
  const { data, isLoading } = useGetAdminBookingsAllFacilitiesQuery(undefined);

  const screens = useBreakpoint();
  const isMobile = useMobileResponsive();

  const UserBookingsFacilities: TBookingData[] = data?.data || [];

  const columns: ColumnsType<TBookingData> = [
    {
      title: 'Facility Name',
      dataIndex: ['facility', 'name'],
      key: 'facilityName',
      render: (text) => (
        <Text type="success" ellipsis>
          {text}
        </Text>
      ),
    },
    {
      title: 'User Email',
      dataIndex: ['user', 'email'],
      key: 'userEmail',
      //   render: (text) => (
      //     <Text type="success" ellipsis>
      //       {text}
      //     </Text>
      //   ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => dayjs(text).format('DD-MMMM-YYYY'),
    },
    {
      title: 'Time Slot',
      dataIndex: 'timeSlot',
      key: 'timeSlot',
      // render: (_, record) => `${record.startTime} - ${record.endTime}`,
    },
    {
      title: 'Amount',
      dataIndex: 'payableAmount',
      key: 'payableAmount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'isBooked',
      key: 'isBooked',
      render: (status: string) => {
        const color = status === 'confirmed' ? 'green' : 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    // TODO: if need show details
    // {
    //   title: 'Actions',
    //   key: 'actions',
    //   align: 'center',
    //   // render: (_, record) => (
    //   //   <Space size="small" direction={isMobile ? 'vertical' : 'horizontal'}>
    //   //     <Link to={`/dashboard/admin/bookings/${record._id}`}>
    //   //       <Button
    //   //         size={isMobile ? 'small' : 'middle'}
    //   //         type="primary"
    //   //         onClick={() => navigate()}
    //   //       >
    //   //         Details
    //   //       </Button>
    //   //     </Link>
    //   //   </Space>
    //   // ),
    // },
  ];

  return (
    <>
      <SectionTitle
        title="Booking Management"
        description="Users Bookings: View or Manage users Reservations"
      />

      <Table<TBookingData>
        columns={columns}
        dataSource={UserBookingsFacilities}
        rowKey="_id"
        loading={isLoading}
        pagination={false}
        title={() => 'Users Bookings List'}
        size={isMobile ? 'small' : 'middle'}
        scroll={(screens.xs && { x: 600 }) || screens.sm ? { x: 800 } : undefined}
      />
    </>
  );
};

export default BookingsTable;
