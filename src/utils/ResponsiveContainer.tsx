import React from 'react';
import '../styles/responsiveContainer.css';
import { useMobileResponsive } from '../hooks/useMobileResponsive';

type TResponsiveContainerProps = {
  children: React.ReactNode;
  isNeedPadding?: boolean;
  background?: string;
};

const ResponsiveContainer = ({
  children,
  isNeedPadding = false,
  background = '',
}: TResponsiveContainerProps) => {
  const isMobile = useMobileResponsive();

  return (
    <div
      style={{
        padding: isNeedPadding ? (isMobile ? '25px 8px' : '40px 8px') : '0px',
        background,
      }}
      className="responsive-container"
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;
