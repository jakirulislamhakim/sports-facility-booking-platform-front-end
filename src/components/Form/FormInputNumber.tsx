import { Form, InputNumber } from 'antd';
import { Controller } from 'react-hook-form';

type TFormInputProps = {
  name: string;
  label: string;
  placeHolder?: string;
  maxNumber?: number;
};

const FormInputNumber = ({
  name,
  label,
  placeHolder,
  maxNumber,
}: TFormInputProps) => {
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
              <InputNumber
                style={{ width: '50%' }}
                id={name}
                placeholder={placeHolder}
                {...field}
                min={0}
                max={maxNumber}
              />
            </Form.Item>
          );
        }}
      />
    </>
  );
};

export default FormInputNumber;
