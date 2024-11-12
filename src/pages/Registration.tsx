import { Row, Col, Typography } from 'antd';

import RootForm from '../components/Form/RootForm';
import FormInput from '../components/Form/FormInput';
import FormSubmitBtn from '../components/Form/FormSubmitBtn';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationValidationSchema } from '../validationSchema/registrationValidationSchema';
import { toast } from 'sonner';
import { useRegistrationUserMutation } from '../redux/features/auth/authApi';
import { TApiErrorResponse, TAuthUser } from '../types';
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/Shared/PageTitle';

const { Title, Link, Text } = Typography;

const Registration = () => {
  const [registrationUser, { isLoading }] = useRegistrationUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Registrations....');
    try {
      const res = await registrationUser(data).unwrap();

      if (res.success) {
        const { token, message } = res;
        // decode user from jwt token accessToken
        const decodedUser = jwtDecode(token) as TAuthUser;
        // set user in local state
        dispatch(
          setUser({
            user: decodedUser,
            token: token,
          })
        );

        toast.success(message, { id: toastId });
        // navigate the user home page
        navigate('/', { replace: true });
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
    <>
      <PageTitle title="REGISTRATION" />
      <Row
        justify="center"
        align="middle"
        style={{ height: '100vh', backgroundColor: '#f0f2f5' }}
      >
        <Col xs={22} sm={16} md={12} lg={8} xl={6}>
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
              Create Your Account
            </Title>

            {/* Login Form */}
            <RootForm
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

              <FormSubmitBtn btnText="Registration" disabled={isLoading} />
            </RootForm>

            {/* Registration Link */}
            <div style={{ textAlign: 'center' }}>
              <Text>Already have an account? </Text>
              <Link href="/login">Login here</Link>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Registration;
