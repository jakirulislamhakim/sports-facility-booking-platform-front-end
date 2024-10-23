import { useMediaQuery } from 'react-responsive';

export const useMobileResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile;
};
