import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

const { TextArea } = Input;

type TFormInputProps = {
  name: string;
  label: string;
  placeHolder?: string;
  rows?: number;
};

const FormTextArea = ({ name, label, placeHolder, rows }: TFormInputProps) => {
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
              <TextArea {...field} placeholder={placeHolder} rows={rows} />
            </Form.Item>
          );
        }}
      />
    </>
  );
};

export default FormTextArea;
