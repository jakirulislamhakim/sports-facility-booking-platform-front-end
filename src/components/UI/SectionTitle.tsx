import { Typography } from 'antd';
import { useMobileResponsive } from '../../hooks/useMobileResponsive';

const { Title, Paragraph } = Typography;

interface TSectionTitleProps {
  title: string;
  description: string;
}

const SectionTitle = ({ title, description }: TSectionTitleProps) => {
  const isMobile = useMobileResponsive();

  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: isMobile ? 24 : 48,
      }}
    >
      <Title
        level={isMobile ? 3 : 2}
        style={{
          marginBottom: isMobile ? 8 : 16,
        }}
      >
        {title}
      </Title>
      <Paragraph
        style={{
          fontSize: isMobile ? 14 : 16,
          color: '#666',
          maxWidth: 600,
          margin: '0 auto',
          padding: isMobile ? '0 16px' : 0,
        }}
      >
        {description}
      </Paragraph>
    </div>
  );
};

export default SectionTitle;
