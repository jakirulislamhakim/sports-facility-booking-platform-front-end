/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from 'antd';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type TRootFormProps = {
  onSubmit: SubmitHandler<any>;
  children: React.ReactNode;
  disabled?: boolean;
} & TFormConfig;

type TFormConfig = {
  resolver?: any;
};

const RootForm = ({
  onSubmit,
  children,
  disabled = false,
  resolver,
}: TRootFormProps) => {
  const formConfig: TFormConfig = {};
  if (resolver) {
    formConfig['resolver'] = resolver;
  }

  const methods = useForm(formConfig);

  return (
    <>
      <FormProvider {...methods}>
        <Form
          layout="vertical"
          onFinish={methods.handleSubmit(onSubmit)}
          disabled={disabled}
        >
          {children}
        </Form>
      </FormProvider>
    </>
  );
};

export default RootForm;
