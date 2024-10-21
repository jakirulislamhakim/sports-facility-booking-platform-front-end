import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TFormInputProps = {
  type?: string;
  name: string;
  label: string;
  placeHolder?: string;
};

const FormInput = ({ name, label, type = 'text', placeHolder }: TFormInputProps) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item
              label={label}
              help={error ? error.message : null}
              validateStatus={error ? 'error' : ''}
            >
              {type === 'password' ? (
                <Input.Password
                  id={name}
                  type={type}
                  placeholder={placeHolder}
                  {...field}
                />
              ) : (
                <Input id={name} type={type} placeholder={placeHolder} {...field} />
              )}
            </Form.Item>
          );
        }}
      />
    </>
  );
};

export default FormInput;
