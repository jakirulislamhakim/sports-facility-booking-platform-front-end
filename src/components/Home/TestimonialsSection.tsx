import { Card, Rate, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Marquee from 'react-fast-marquee';
import { useMobileResponsive } from '../../hooks/useMobileResponsive';
import SectionTitle from '../UI/SectionTitle';
import ResponsiveContainer from '../../utils/ResponsiveContainer';
import { useEffect, useState } from 'react';

type Testimonial = {
  _id: number;
  name: string;
  location: string;
  rating: number;
  feedback: string;
  image: string;
  isDeleted: boolean;
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [imgErrors, setImgErrors] = useState<{ [key: number]: boolean }>({});

  const isMobile = useMobileResponsive();

  useEffect(() => {
    fetch('./public/testimonials.json')
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  // Handle individual image errors by setting the error state for a specific image ID
  const handleImgError = (imgId: number) => {
    setImgErrors((prevErrors) => ({
      ...prevErrors,
      [imgId]: true,
    }));
  };

  return (
    <ResponsiveContainer isNeedPadding={true}>
      <SectionTitle
        title="What Our Users Say"
        description=" Read testimonials from sports enthusiasts who have used our platform"
      />
      <Marquee pauseOnHover={true} delay={5}>
        <div
          style={{
            display: 'flex',
            gap: isMobile ? '8px' : '24px',
            flexDirection: 'row',
            marginRight: isMobile ? '8px' : '24px',
          }}
        >
          {testimonials?.map((testimonial) => (
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
                  alt={testimonial.name}
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
                title={testimonial.name}
                description={testimonial.location}
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

      {/* // TODO ->do the section */}
      {/* <Row justify={'center'}>
        <Button
          type="primary"
          style={{ marginTop: '20px' }}
          // onClick={handleShareExperience}
        >
          Share Your Experience
        </Button>
      </Row> */}
    </ResponsiveContainer>
  );
};

export default TestimonialsSection;
