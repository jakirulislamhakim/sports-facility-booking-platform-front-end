// src/components/Loading.tsx
import React from 'react';
import { Spin } from 'antd';

type TLoadingProps = {
  isLoading: boolean;
  tip?: string;
  children: React.ReactNode;
}

const Loading = ({ isLoading, tip = 'Loading...', children } : TLoadingProps) => {
  return (
    <Spin spinning={isLoading} tip={tip} size='large'>
      {children}
    </Spin>
  );
};

export default Loading;
