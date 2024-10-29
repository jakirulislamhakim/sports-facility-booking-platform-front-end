import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TFormImageInputProps = {
  name: string;
  label: string;
};

const FormInputImage = ({ name, label }: TFormImageInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          help={error ? error.message : null}
          validateStatus={error ? 'error' : ''}
        >
          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              field.onChange(file); // Pass only the File object
            }}
          />
        </Form.Item>
      )}
    />
  );
};

export default FormInputImage;
