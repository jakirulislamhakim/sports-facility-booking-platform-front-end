import { Button, Form } from 'antd';
import { ReactNode } from 'react';

type TFormSubmitProps = {
  btnText: string;
  icon?: ReactNode;
  block?: boolean;
  disabled?: boolean;
};

const FormSubmitBtn = ({
  btnText,
  icon,
  block = true,
  disabled = false,
}: TFormSubmitProps) => {
  return (
    <Form.Item style={{ width: '100%', marginTop: '20px' }}>
      <Button block={block} htmlType="submit" type="primary" disabled={disabled}>
        {icon} {btnText}
      </Button>
    </Form.Item>
  );
};

export default FormSubmitBtn;
