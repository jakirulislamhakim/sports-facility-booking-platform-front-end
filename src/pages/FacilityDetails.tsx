import {
  Row,
  Col,
  Card,
  Typography,
  Rate,
  Divider,
  Tag,
  Button,
  Descriptions,
  Image,
  Space,
  DatePicker,
} from 'antd';
import {
  DollarCircleOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useMobileResponsive } from '../hooks/useMobileResponsive';
import { useGetSingleFacilityQuery } from '../redux/features/facilities/facilitiesApi';
import { useParams } from 'react-router-dom';
import Loading from '../components/UI/Loading';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useAvailableTimeSlotQuery } from '../redux/features/user/userBookingsApi';
import CheckAvailabilityModal from '../components/FacilityDetails/CheckAvailabilityModal';
import BookingFormModal from '../components/FacilityDetails/BookingFormModal';
import PageTitle from '../components/Shared/PageTitle';
import { useAppSelector } from '../redux/hooks';
import { currentToken, currentUser } from '../redux/features/auth/authSlice';
import useShowLoginAlertNotification from '../hooks/useLoginAlertForProtectedRoute';

const { Title, Paragraph, Text } = Typography;

const dateFormat = 'YYYY-MM-DD';
const today = new Date();
const currentDate = today.toLocaleDateString('en-CA');
// add 3 month dynamically
today.setMonth(today.getMonth() + 3);
const next3Month = today.toLocaleDateString('en-CA');

const FacilityDetails = () => {
  const [isOpenCheckAvailabilityModal, setIsOpenCheckAvailabilityModal] =
    useState<boolean>(false);
  const [isOpenBookingModal, setIsOpenBookingModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dateRequiredError, setDateRequiredError] = useState<string>('');
  const { facilityId } = useParams();

  // currant user and token
  const user = useAppSelector(currentUser);
  const token = useAppSelector(currentToken);

  // hook for alert login
  const showNotification = useShowLoginAlertNotification();

  const { data, isLoading } = useGetSingleFacilityQuery(facilityId as string);
  // facility data
  const facility = data?.data;

  //
  const { data: availableTimeSlotData, isLoading: timeSlotLoading } =
    useAvailableTimeSlotQuery(
      {
        date: selectedDate as string,
        facility: facility?._id,
      },
      {
        // skip when isLoading , not given selectedDate
        skip: isLoading || !selectedDate,
      }
    );

  const availableTimeSlots: string[] = availableTimeSlotData?.data?.timeSlot;

  const isMobile = useMobileResponsive();

  // CheckAvailabilityModal open
  const showCheckAvailabilityModal = () => {
    if (!selectedDate) {
      return setDateRequiredError('Please select a date');
    }
    setIsOpenCheckAvailabilityModal(true);
  };

  const handleCloseCheckAvailabilityModal = () => {
    setIsOpenCheckAvailabilityModal(false);
  };

  // CheckAvailabilityModal open
  const showBookingModal = () => {
    if (!token || !user) {
      showNotification('You need to must login for booking facility');
    } else {
      setIsOpenBookingModal(true);
    }
  };

  // close booking modal x
  const handleCloseBookingModal = () => {
    setIsOpenBookingModal(false);
  };

  return (
    <>
      <PageTitle title="FACILITY-DETAILS" />
      <Loading isLoading={isLoading}>
        <div style={{ overflow: 'hidden', maxWidth: '1220px', margin: '20px auto' }}>
          {/* Header Section */}
          <Row gutter={[24, 24]} style={{ overflow: 'hidden' }}>
            <Col xs={24}>
              <Card>
                <Row gutter={[24, 24]} align="middle">
                  <Col xs={24} md={16}>
                    <Space
                      direction="vertical"
                      size="large"
                      style={{ width: '100%' }}
                    >
                      <div>
                        <Title level={isMobile ? 3 : 2} style={{ marginBottom: 8 }}>
                          {facility?.name}
                        </Title>
                        <Space size="large">
                          {facility?.rating && (
                            <Rate
                              disabled
                              defaultValue={facility?.rating}
                              allowHalf
                              style={{ fontSize: isMobile ? '14px' : '18px' }}
                            />
                          )}
                          <span
                            style={{
                              fontSize: isMobile ? '12px' : '16px',
                              color: '#666',
                            }}
                          >
                            {facility?.rating} out of 5
                          </span>
                        </Space>
                      </div>
                      <Space>
                        <Tag icon={<EnvironmentOutlined />} color="blue">
                          {facility?.location}
                        </Tag>
                        <Tag icon={<DollarCircleOutlined />} color="green">
                          ${facility?.pricePerHour}/hour
                        </Tag>
                      </Space>
                    </Space>
                  </Col>
                  <Col
                    xs={24}
                    md={8}
                    style={{ textAlign: isMobile ? 'left' : 'right' }}
                  >
                    <Button
                      onClick={showBookingModal}
                      type="primary"
                      disabled={user?.role === 'admin'}
                      size={isMobile ? 'small' : 'large'}
                    >
                      Book Now
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          {/* Main Content Section */}
          <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
            {/* Left Column - Image and Description */}
            <Col xs={24} lg={16}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card style={{ display: 'flex', justifyContent: 'center' }}>
                  <Image
                    src={facility?.image}
                    alt={facility?.name}
                    style={{
                      width: '100%',
                      height: isMobile ? '200px' : '400px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </Card>

                <Card>
                  <Title level={isMobile ? 5 : 4}>About the Facility</Title>
                  <Paragraph style={{ fontSize: isMobile ? '14px' : '16px' }}>
                    {facility?.description}
                  </Paragraph>

                  <Divider />

                  <Title level={isMobile ? 5 : 4}>Amenities</Title>
                  <Row gutter={[8, 8]}>
                    <Col xs={20} sm={12} md={8}>
                      <Tag
                        color="processing"
                        style={{ padding: '2px 4px', marginBottom: '4px' }}
                      >
                        Free Parking
                      </Tag>
                    </Col>
                    <Col xs={20} sm={12} md={8}>
                      <Tag
                        color="processing"
                        style={{ padding: '2px 4px', marginBottom: '4px' }}
                      >
                        Changing Rooms
                      </Tag>
                    </Col>
                    <Col xs={20} sm={12} md={8}>
                      <Tag
                        color="processing"
                        style={{ padding: '2px 4px', marginBottom: '4px' }}
                      >
                        Equipment Rental
                      </Tag>
                    </Col>
                  </Row>
                </Card>
              </Space>
            </Col>

            {/* Right Column - Booking Info and Details */}
            <Col xs={24} lg={8}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card>
                  <Title level={isMobile ? 5 : 4}>Booking Information</Title>
                  <Descriptions column={1}>
                    <Descriptions.Item
                      label={
                        <Space>
                          <DollarCircleOutlined /> Price
                        </Space>
                      }
                    >
                      <span
                        style={{
                          fontSize: isMobile ? '14px' : '16px',
                          fontWeight: 'bold',
                          color: '#52c41a',
                        }}
                      >
                        ${facility?.pricePerHour} per hour
                      </span>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <Space>
                          <ClockCircleOutlined /> Operating Hours
                        </Space>
                      }
                    >
                      9:00 AM - 05:00 PM
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={
                        <Space>
                          <CalendarOutlined /> Availability
                        </Space>
                      }
                    >
                      Monday - Sunday
                    </Descriptions.Item>
                  </Descriptions>

                  <Divider />

                  {/* date picker and check availability*/}
                  <Col>
                    <DatePicker
                      onChange={(_, dateString) => {
                        setSelectedDate(dateString as string);
                        setDateRequiredError('');
                      }}
                      style={{ width: '100%', margin: '15px 0px' }}
                      status="error"
                      minDate={dayjs(currentDate, dateFormat)}
                      maxDate={dayjs(next3Month, dateFormat)}
                    />
                    {dateRequiredError && (
                      <Text type="danger" strong style={{ marginBottom: '20px' }}>
                        {dateRequiredError}
                      </Text>
                    )}
                    <Button
                      onClick={showCheckAvailabilityModal}
                      type="primary"
                      block
                      size={isMobile ? 'small' : 'large'}
                    >
                      Check Availability
                    </Button>
                  </Col>
                </Card>

                <Card>
                  <Title level={isMobile ? 5 : 4}>Location</Title>
                  <Tag
                    icon={<EnvironmentOutlined />}
                    color="blue"
                    style={{ padding: '6px 12px' }}
                  >
                    {facility?.location}
                  </Tag>
                  {/* Placeholder for map */}
                  <div
                    style={{
                      height: '200px',
                      background: '#f0f2f5',
                      marginTop: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                    }}
                  >
                    Map View is not available
                  </div>
                </Card>
              </Space>
            </Col>
          </Row>
        </div>

        {/* modal for show available facility slot */}
        <CheckAvailabilityModal
          availableTimeSlots={availableTimeSlots}
          facilityName={facility?.name}
          handleCloseCheckAvailabilityModal={handleCloseCheckAvailabilityModal}
          isOpenCheckAvailabilityModal={isOpenCheckAvailabilityModal}
          timeSlotLoading={timeSlotLoading}
        />

        <BookingFormModal
          facilityId={facility?._id}
          bookingAmount={facility?.pricePerHour}
          isOpenBookingModal={isOpenBookingModal}
          handleCloseBookingModal={handleCloseBookingModal}
        />
      </Loading>
    </>
  );
};

export default FacilityDetails;
