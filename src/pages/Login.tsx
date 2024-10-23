import { Row, Col, Typography } from 'antd';

import RootForm from '../components/Form/RootForm';
import FormInput from '../components/Form/FormInput';
import FormSubmitBtn from '../components/Form/FormSubmitBtn';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginValidationSchema } from '../validationSchema/loginValidationSchema';
import { toast } from 'sonner';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { TApiErrorResponse, TAuthUser } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const { Title, Link, Text } = Typography;

const LoginForm = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Handle login logic here
    const toastId = toast.loading('Logging in...');
    try {
      const res = await loginUser(data).unwrap();

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
            Login to Your Account
          </Title>

          {/* Login Form */}
          <RootForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <FormInput name="email" label="Email" placeHolder="enter your email.." />
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeHolder="enter your password.."
            />

            <FormSubmitBtn btnText="Login" disabled={isLoading} />
          </RootForm>

          {/* Registration Link */}
          <div style={{ textAlign: 'center' }}>
            <Text>Don't have an account? </Text>
            <Link href="/registration">Register here</Link>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default LoginForm;
