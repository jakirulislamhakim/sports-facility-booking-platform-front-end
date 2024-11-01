import { Row, Col, Typography } from 'antd';

import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRegistrationAdminMutation } from '../../redux/features/auth/authApi';
import { TApiErrorResponse } from '../../types';
import RootForm from '../../components/Form/RootForm';
import { registrationValidationSchema } from '../../validationSchema/registrationValidationSchema';
import FormInput from '../../components/Form/FormInput';
import FormSubmitBtn from '../../components/Form/FormSubmitBtn';
import { useState } from 'react';

const { Title } = Typography;

const CreateAdmin = () => {
  const [formKey, setFormKey] = useState(0);
  const [registrationUser, { isLoading }] = useRegistrationAdminMutation();

  // form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Admin Registrations....');
    try {
      const res = await registrationUser(data).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        setFormKey(formKey + 1);
      }
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message, { id: toastId });
      }
      const err = error as TApiErrorResponse;
      toast.error(err.data.message, { id: toastId });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: '80vh', backgroundColor: '#f0f2f5' }}
    >
      <Col xs={22} sm={20} md={16} lg={14} xl={8}>
        <div
          style={{
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Login Page Title */}
          <Title level={3} style={{ marginBottom: '24px', textAlign: 'center' }}>
            Create An Account
          </Title>

          {/* Login Form */}
          <RootForm
            key={formKey}
            onSubmit={onSubmit}
            resolver={zodResolver(registrationValidationSchema)}
          >
            <FormInput name="name" label="Name" placeHolder="Enter your name" />
            <FormInput
              name="phone"
              label="Phone Number"
              placeHolder="Enter your phone number"
            />
            <FormInput
              name="address"
              label="Address"
              placeHolder="Enter your address"
            />
            <FormInput name="email" label="Email" placeHolder="Enter your email" />
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeHolder="Enter your password.."
            />

            <FormSubmitBtn btnText="Create Admin" disabled={isLoading} />
          </RootForm>
        </div>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
