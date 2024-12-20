import { Card, Rate, Avatar, Row, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Marquee from 'react-fast-marquee';
import { useMobileResponsive } from '../../hooks/useMobileResponsive';
import SectionTitle from '../UI/SectionTitle';
import ResponsiveContainer from '../../utils/ResponsiveContainer';
import { useState } from 'react';
import {
  useAddATestimonialsMutation,
  useGetAllTestimonialsQuery,
} from '../../redux/features/testomonials/testonialsApi';
import { TApiErrorResponse, TTestimonial } from '../../types';
import ShareUserExperienceModal from './ShareUserExperienceModal';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useAppSelector } from '../../redux/hooks';
import { currentToken, currentUser } from '../../redux/features/auth/authSlice';
import useShowLoginAlertNotification from '../../hooks/useLoginAlertForProtectedRoute';

const TestimonialsSection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useAppSelector(currentUser);
  const token = useAppSelector(currentToken);

  const showNotification = useShowLoginAlertNotification();

  const [imgErrors, setImgErrors] = useState<{ [key: string]: boolean }>({});
  const [addTestimonial] = useAddATestimonialsMutation();
  const { data } = useGetAllTestimonialsQuery(undefined);
  const testimonials = data?.data;

  const isMobile = useMobileResponsive();

  // Handle individual image errors by setting the error state for a specific image ID
  const handleImgError = (imgId: string) => {
    setImgErrors((prevErrors) => ({
      ...prevErrors,
      [imgId]: true,
    }));
  };

  const handleShareExperience = async () => {
    if (!token && !user) {
      return showNotification('Please login to share your experience with us.s');
      // navigate('/login');
    } else {
      setIsModalVisible(true);
    }
  };

  // handle submit feedback form
  const handleModalSubmit: SubmitHandler<
    Pick<TTestimonial, 'feedback' | 'rating'>
  > = async (formData) => {
    try {
      const res = await addTestimonial(formData).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
      setIsModalVisible(false);
    } catch (error) {
      const err = error as TApiErrorResponse;
      toast.error(err.data.message);
    }
  };

  return (
    <ResponsiveContainer isNeedPadding={true}>
      <SectionTitle
        title="What Our Users Say"
        description=" Read testimonials from sports enthusiasts who have used our platform"
      />
      <Marquee pauseOnHover={true} delay={3}>
        <div
          style={{
            display: 'flex',
            gap: isMobile ? '8px' : '24px',
            flexDirection: 'row',
            marginRight: isMobile ? '8px' : '24px',
          }}
        >
          {/* show all  individual testimonial card using loop */}
          {testimonials?.map((testimonial: TTestimonial) => (
            <Card
              key={testimonial._id}
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%',
                maxWidth: isMobile ? '250px' : '300px',
                margin: '0 auto',
              }}
            >
              {testimonial.image && !imgErrors[testimonial._id] ? (
                <img
                  alt={testimonial.user.name}
                  src={testimonial.image}
                  style={{
                    width: isMobile ? '50px' : '70px',
                    height: isMobile ? '50px' : '70px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '10px',
                  }}
                  // onError for detected img url broken or network issues when does'nt loading img or
                  //  img hoisting server is down .onError have (event) param
                  onError={() => handleImgError(testimonial._id)}
                />
              ) : (
                <Avatar
                  size={isMobile ? 50 : 70}
                  icon={<UserOutlined />}
                  style={{ marginBottom: '10px' }}
                />
              )}

              <Card.Meta
                title={testimonial.user.name}
                description={testimonial.user.address}
              />

              <div style={{ marginTop: '10px' }}>
                <Rate
                  disabled
                  defaultValue={testimonial.rating}
                  style={{ fontSize: isMobile ? 12 : 14 }}
                />
                <p
                  style={{
                    fontSize: isMobile ? '12px' : '14px',
                    textAlign: 'justify',
                  }}
                >
                  {testimonial.feedback}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Marquee>

      {/* action btn for user share experience  */}
      <Row justify={'center'}>
        <Button
          disabled={user?.role === 'admin'}
          size={isMobile ? 'small' : 'middle'}
          type="primary"
          style={{ marginTop: '20px' }}
          onClick={handleShareExperience}
        >
          {user?.role === 'admin' ? "Admin can't share" : 'Share Your Experience'}
        </Button>
      </Row>

      {/* Modal for Sharing Experience */}
      <ShareUserExperienceModal
        visible={isModalVisible}
        onSubmit={handleModalSubmit}
        onCancel={() => setIsModalVisible(false)}
      />
    </ResponsiveContainer>
  );
};

export default TestimonialsSection;
