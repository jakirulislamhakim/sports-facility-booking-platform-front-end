import { Card, Rate, Button, Badge, Typography } from 'antd';
import {
  ArrowRightOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from '@ant-design/icons';
const { Title, Paragraph } = Typography;
import { useMobileResponsive } from '../../hooks/useMobileResponsive';
import { TFacility } from '../../types';

const { Meta } = Card;

type TFacilityCardProps = {
  facility: TFacility;
  isLoading?: boolean;
};

const FacilityCard = ({ facility, isLoading = false }: TFacilityCardProps) => {
  const { description, image, name, pricePerHour, rating } = facility;
  const isMobile = useMobileResponsive();

  return (
    <Badge.Ribbon
      text="Popular"
      color="#f50"
      style={{ display: rating >= 4.5 ? 'block' : 'none' }}
    >
      <Card
        loading={isLoading}
        hoverable
        style={{
          margin: isMobile ? '0 8px' : 0,
          height: isMobile ? 'auto' : 450, // Fixed height for desktop
        }}
        cover={
          <img
            alt={name}
            src={image}
            style={{
              height: isMobile ? 150 : 200,
              objectFit: 'cover',
            }}
          />
        }
        actions={[
          <Button
            style={{ border: '2px solid', padding: '8px', marginBottom: '16px' }}
            type="link"
            key="book"
          >
            Book Now <ArrowRightOutlined />
          </Button>,
        ]}
      >
        <Meta
          title={
            <div style={{ marginBottom: 8 }}>
              <Title
                level={4}
                style={{
                  marginBottom: 0,
                  fontSize: isMobile ? '16px' : '18px',
                }}
              >
                {name}
              </Title>
            </div>
          }
          description={
            <>
              <Paragraph
                ellipsis={{ rows: isMobile ? 1 : 2 }}
                style={{
                  marginBottom: 12,
                  fontSize: isMobile ? '12px' : '14px',
                }}
              >
                {description}
              </Paragraph>
              <div style={{ marginBottom: 12 }}>
                <Rate
                  disabled
                  defaultValue={rating}
                  allowHalf
                  style={{ fontSize: isMobile ? 12 : 14 }}
                />
                <span
                  style={{ marginLeft: 8, fontSize: isMobile ? '12px' : '14px' }}
                >
                  {rating}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: isMobile ? '12px' : '14px',
                }}
              >
                <span>
                  <DollarOutlined /> ${pricePerHour}/hour
                </span>
                <span>
                  <ClockCircleOutlined /> Available Now
                </span>
              </div>
            </>
          }
        />
      </Card>
    </Badge.Ribbon>
  );
};

export default FacilityCard;
