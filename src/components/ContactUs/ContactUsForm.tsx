import { Row, Col } from 'antd';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import RootForm from '../Form/RootForm';
import FormInput from '../Form/FormInput';
import FormSubmitBtn from '../Form/FormSubmitBtn';
import FormTextArea from '../Form/FormTextArea';
import { contactUsFormValidationSchema } from '../../validationSchema/contactUsFormValidationSchema';
import { TApiErrorResponse } from '../../types';
import { useSendUserMessageMutation } from '../../redux/features/testomonials/testonialsApi';
import { useState } from 'react';

const ContactUsForm = () => {
  const [formKey, setFormKey] = useState(0);
  const [sendUserMessage] = useSendUserMessageMutation();

  // contactUs form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Message sending...');
    try {
      const res = await sendUserMessage(data).unwrap();
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
    <Row justify="center" align="middle">
      <Col xs={22} sm={16} md={12} lg={10}>
        <div
          style={{
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '8px',
            // border: '1px solid green',
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
        >
          {/* Login Form */}
          <RootForm
            key={formKey}
            onSubmit={onSubmit}
            resolver={zodResolver(contactUsFormValidationSchema)}
          >
            <FormInput name="name" label="Name" placeHolder="Enter your name" />

            <FormInput name="email" label="Email" placeHolder="Enter your email" />

            <FormInput
              name="subject"
              label="Subject"
              placeHolder="Enter your Subject"
            />
            <FormTextArea
              label="Message"
              name="message"
              rows={4}
              placeHolder="Please enter your message"
            />

            <FormSubmitBtn
              btnText="Send Message"
              // disabled={isLoading}
            />
          </RootForm>
        </div>
      </Col>
    </Row>
  );
};

export default ContactUsForm;
