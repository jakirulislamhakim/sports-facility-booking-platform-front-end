import React from 'react';
import { Table, Button, Space, Tag, Typography, Grid } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  useCancelUserBookingFacilityMutation,
  useGetUserBookingsFacilitiesQuery,
} from '../../redux/features/user/userBookingsApi';
import { BookingData, TApiErrorResponse } from '../../types';
import { toast } from 'sonner';
import { useMobileResponsive } from '../../hooks/useMobileResponsive';

const { Text } = Typography;
const { useBreakpoint } = Grid;

const UserBookingsTable: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserBookingsFacilitiesQuery(undefined);
  const [cancelUserBookingFacility] = useCancelUserBookingFacilityMutation();

  const screens = useBreakpoint();
  const isMobile = useMobileResponsive();

  const UserBookingsFacilities: BookingData[] = data?.data || [];

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const res = await cancelUserBookingFacility(bookingId).unwrap();

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      const err = error as TApiErrorResponse;
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (err) {
        toast.error(err.data.message);
      }
      toast.error('Something went wrong! Please try again.');
    }
  };

  const columns: ColumnsType<BookingData> = [
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => dayjs(text).format('DD-MMMM-YYYY'),
    },
    {
      title: 'Time',
      key: 'time',
      render: (_, record) => `${record.startTime} - ${record.endTime}`,
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
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small" direction={isMobile ? 'vertical' : 'horizontal'}>
          <Button
            size={isMobile ? 'small' : 'middle'}
            type="primary"
            onClick={() => navigate(`/user/bookings/${record._id}`)}
          >
            Details
          </Button>
          {record.isBooked !== 'cancelled' && (
            <Button
              size={isMobile ? 'small' : 'middle'}
              type="primary"
              danger
              onClick={() => handleCancelBooking(record._id)}
            >
              Cancel
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table<BookingData>
      columns={columns}
      dataSource={UserBookingsFacilities}
      rowKey="_id"
      loading={isLoading}
      // pagination= {{}}
      title={() => 'My Bookings'}
      scroll={(screens.xs && { x: 600 }) || screens.sm ? { x: 800 } : undefined}
    />
  );
};

export default UserBookingsTable;
