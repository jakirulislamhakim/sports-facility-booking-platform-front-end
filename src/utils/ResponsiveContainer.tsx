import React from 'react';
import '../styles/responsiveContainer.css';

const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ border: '2px solid red' }} className="responsive-container">
      {children}
    </div>
  );
};

export default ResponsiveContainer;
