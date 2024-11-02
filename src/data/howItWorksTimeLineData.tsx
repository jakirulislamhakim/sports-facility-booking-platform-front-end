import {
  SearchOutlined,
  FieldTimeOutlined,
  CreditCardOutlined,
  PlayCircleOutlined,
  StarOutlined,
  FormOutlined,
} from '@ant-design/icons';

export const howItWorksTimelineData = [
  {
    icon: <FormOutlined style={{ fontSize: '24px' }} />,
    title: 'Fill Basic Information',
    description:
      'Start by providing your name, email, and creating a secure password for your account.',
    iconBgColor: '#4096ff',
    iconColor: '#fff',
  },
  {
    icon: <SearchOutlined style={{ fontSize: '24px' }} />,
    title: 'Find the Perfect Facility',
    description:
      'Search for sports facilities by location, activity, or available time slots. You can explore a wide variety of options that suit your needs.',
    iconBgColor: '#4096ff',
    iconColor: '#fff',
  },
  {
    icon: <FieldTimeOutlined style={{ fontSize: '24px' }} />,
    title: 'Select Your Preferred Time',
    description:
      'Pick the date and time that works best for you. Our platform shows real-time availability for quick and easy booking.',
    iconBgColor: '#36cfc9',
    iconColor: '#fff',
  },
  {
    icon: <CreditCardOutlined style={{ fontSize: '24px' }} />,
    title: 'Secure Your Booking',
    description:
      "Complete your booking by securely paying online using your preferred payment method. You'll receive a confirmation instantly.",
    iconBgColor: '#73d13d',
    iconColor: '#fff',
  },
  {
    icon: <PlayCircleOutlined style={{ fontSize: '24px' }} />,
    title: 'Play and Enjoy!',
    description:
      "Show up at your selected facility at the booked time and enjoy your game. We'll handle the rest to make sure everything runs smoothly.",
    iconBgColor: '#ffa940',
    iconColor: '#fff',
  },
  {
    icon: <StarOutlined style={{ fontSize: '24px' }} />,
    title: 'Share Your Experience',
    description:
      'After your booking, leave a review to help others choose the best facilities for their needs.',
    iconBgColor: '#ff7a45',
    iconColor: '#fff',
  },
];
