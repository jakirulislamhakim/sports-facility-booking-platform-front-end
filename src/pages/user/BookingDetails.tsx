import {
  Card,
  Row,
  Col,
  Descriptions,
  Typography,
  Divider,
  Image,
  Grid,
  Alert,
} from 'antd';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Loading from '../../components/UI/Loading';
import { toast } from 'sonner';
import { useGetUserSingleBookingFacilityQuery } from '../../redux/features/user/userBookingsApi';
import PageTitle from '../../components/Shared/PageTitle';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const BookingDetails = () => {
  const { bookingId } = useParams<{ bookingId: string }>(); // Booking ID from URL params
  const { data, isLoading, error } = useGetUserSingleBookingFacilityQuery(
    bookingId as string
  );

  const screens = useBreakpoint();

  if (error) {
    toast.error('Failed to load booking details');
    return null;
  }

  const booking = data?.data;
  const facility = booking?.facility;

  return (
    <>
      <PageTitle title="BOOKING-DETAILS" />
      <Loading isLoading={isLoading}>
        <Card>
          {/* show bookings details card*/}
          {booking && facility && (
            <Row gutter={[24, 16]}>
              <Col span={24}>
                <Title level={screens.xs ? 4 : 3} style={{ textAlign: 'center' }}>
                  Booking Details
                </Title>
                <Divider />
              </Col>

              <Col md={24} lg={10}>
                <Image
                  src={facility?.image}
                  alt={facility?.name}
                  fallback="https://via.placeholder.com/200" // Fallback if no image available
                  style={{ borderRadius: '8px', width: '100%', height: 'auto' }}
                />
              </Col>

              <Col md={24} lg={14}>
                <Descriptions
                  title="Facility Information"
                  bordered
                  column={1}
                  labelStyle={{ width: screens.xs ? '20%' : '30%' }}
                  size={screens.xs ? 'small' : 'middle'}
                >
                  <Descriptions.Item label="Facility Name">
                    {facility?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Location">
                    {facility?.location}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {facility?.description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price Per Hour">
                    ${facility?.pricePerHour}
                  </Descriptions.Item>
                  <Descriptions.Item label="Rating">
                    {facility?.rating} / 5
                  </Descriptions.Item>
                </Descriptions>

                <Divider />

                <Descriptions
                  title="Booking Information"
                  bordered
                  column={1}
                  labelStyle={{ width: screens.xs ? '20%' : '30%' }}
                >
                  <Descriptions.Item label="Booking Date">
                    {dayjs(booking?.date).format('DD-MM-YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Time">
                    {booking?.timeSlot}
                  </Descriptions.Item>
                  <Descriptions.Item label="Payable Amount">
                    ${booking?.payableAmount.toFixed(2)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Booking Status">
                    <Text strong>{booking?.isBooked}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Payment Status">
                    <Text strong>{booking?.paymentStatus}</Text>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          )}

          {/* if can't find the facility or the facility is not exists */}
          {!isLoading && !booking && (
            <Alert
              message="Error"
              description="Sorry, we couldn't load the facility. Please try again later."
              type="error"
              showIcon
              style={{ marginBottom: '20px' }}
            />
          )}
        </Card>
      </Loading>
    </>
  );
};

export default BookingDetails;
