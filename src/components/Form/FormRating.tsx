import { Form, Rate } from 'antd';
import { Controller } from 'react-hook-form';

const FormRating = () => {
  return (
    <>
      <Controller
        name="rating"
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item
              label="Rating"
              help={error ? error.message : null}
              validateStatus={error ? 'error' : ''}
            >
              <Rate {...field} />
            </Form.Item>
          );
        }}
      />
    </>
  );
};

export default FormRating;
