import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { useGetAllFacilitiesQuery } from '../../redux/features/facilities/facilitiesApi';

const facilities = [
  {
    id: 1,
    name: 'Central Sports Complex',
    description:
      'A state-of-the-art facility with courts for basketball, tennis, and more.',
    imageUrl: 'https://pitchbooking.com/img/_v1/hero/carousel-pitchbooking.webp',
  },
  {
    id: 2,
    name: 'Riverside Soccer Field',
    description: 'Perfect for 5-a-side soccer games with high-quality turf.',
    imageUrl: 'https://pitchbooking.com/img/_v1/hero/carousel-pitchbooking.webp',
  },
  {
    id: 3,
    name: 'Lakeside Tennis Courts',
    description: 'Well-maintained courts with beautiful lakeside views.',
    imageUrl: 'https://pitchbooking.com/img/_v1/hero/carousel-pitchbooking.webp',
  },
  // Add more facilities as needed
];

const FeaturedFacilities: React.FC = () => {
  const { data, isLoading, isError } = useGetAllFacilitiesQuery(undefined);

  console.log(data);

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f5f5f5' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Featured Facilities
      </h2>

      <Row gutter={[16, 16]} justify="center">
        {facilities.map((facility) => (
          <Col xs={24} sm={12} md={8} lg={6} key={facility.id}>
            <Card
              hoverable
              cover={<img alt={facility.name} src={facility.imageUrl} />}
              style={{ borderRadius: '10px', overflow: 'hidden' }}
            >
              <Card.Meta title={facility.name} description={facility.description} />
              <Button type="primary" block style={{ marginTop: '15px' }}>
                View Details
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedFacilities;
