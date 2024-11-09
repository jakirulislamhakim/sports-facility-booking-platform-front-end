import { useState } from 'react';
import { Table, Button, Space, Tag, Typography, Grid, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  useCancelUserBookingFacilityMutation,
  useGetUserBookingsFacilitiesQuery,
} from '../../redux/features/user/userBookingsApi';
import { TApiErrorResponse, TBookingData } from '../../types';
import { toast } from 'sonner';
import { useMobileResponsive } from '../../hooks/useMobileResponsive';
import SectionTitle from '../../components/UI/SectionTitle';
import PageTitle from '../../components/Shared/PageTitle';

const { Text } = Typography;
const { useBreakpoint } = Grid;

const UserBookingsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const { data, isLoading } = useGetUserBookingsFacilitiesQuery(undefined);
  const [cancelUserBookingFacility] = useCancelUserBookingFacilityMutation();

  const screens = useBreakpoint();
  const isMobile = useMobileResponsive();

  const UserBookingsFacilities: TBookingData[] = data?.data || [];

  //  handle logic for cancel booking facility
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
      }
      toast.error(err.data.message || 'Something went wrong! Please try again.');
    }
  };

  // modal actions for show modal
  const showModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsModalOpen(true);
  };

  //  modal action for ultimate cancel booking
  const handleOk = () => {
    if (selectedBookingId) {
      handleCancelBooking(selectedBookingId);
      setIsModalOpen(false);
      setSelectedBookingId(null);
    }
  };

  //  modal action for cancel booking modal close
  const handleCancel = () => {
    setSelectedBookingId(null);
    setIsModalOpen(false);
  };

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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => dayjs(text).format('DD-MMMM-YYYY'),
    },
    {
      title: 'Time',
      dataIndex: 'timeSlot',
      key: 'time',
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
      align: 'center',
      render: (_, record) => (
        <Space size="small" direction={isMobile ? 'vertical' : 'horizontal'}>
          <Link to={`/dashboard/user/bookings/${record._id}`}>
            <Button size={isMobile ? 'small' : 'middle'} type="primary">
              Details
            </Button>
          </Link>

          {record.isBooked !== 'cancelled' && (
            <Button
              size={isMobile ? 'small' : 'middle'}
              type="primary"
              danger
              onClick={() => showModal(record._id)}
            >
              Cancel
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageTitle title="BOOKING-TABLE" />

      <SectionTitle
        title="Booking Management"
        description="My Bookings: View or Manage Your Reservations"
      />

      <Table<TBookingData>
        columns={columns}
        dataSource={UserBookingsFacilities}
        rowKey="_id"
        loading={isLoading}
        pagination={false}
        title={() => 'My Bookings'}
        size={isMobile ? 'small' : 'middle'}
        scroll={(screens.xs && { x: 600 }) || screens.sm ? { x: 800 } : undefined}
      />
      <Modal
        title="Are you sure you want to cancel the booking facility ?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="YES"
        cancelText="NO"
      ></Modal>
    </>
  );
};

export default UserBookingsTable;
