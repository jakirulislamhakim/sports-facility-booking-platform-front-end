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
        padding: isNeedPadding ? (isMobile ? '30px 0' : '60px 0') : '0',
        background,
      }}
      className="responsive-container"
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;
