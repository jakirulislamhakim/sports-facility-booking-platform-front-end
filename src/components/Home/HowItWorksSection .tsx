import { Typography } from 'antd';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import ResponsiveContainer from '../../utils/ResponsiveContainer';
import SectionTitle from '../UI/SectionTitle';
import { timelineData } from '../../data/timeLineData';

const { Title } = Typography;

const HowItWorksSection = () => {
  return (
    <ResponsiveContainer isNeedPadding={true}>
      <SectionTitle
        title="How It Works"
        description="  Follow these easy steps to book your favorite sports facility."
      />

      <VerticalTimeline animate={true} lineColor="#e6e6e6">
        {/* time line data import from data folder */}
        {timelineData.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element"
            contentStyle={{
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 3px 10px rgb(0 0 0 / 0.1)',
              padding: '24px',
            }}
            contentArrowStyle={{ borderRight: '7px solid #fff' }}
            iconStyle={{
              background: item.iconBgColor,
              color: item.iconColor,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            icon={item.icon}
          >
            <div className="hover:transform hover:scale-105 transition-transform duration-300">
              <Title level={4} className="mb-4 !mt-0">
                {item.title}
              </Title>
              <p className="text-gray-600 m-0">{item.description}</p>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </ResponsiveContainer>
  );
};

export default HowItWorksSection;
