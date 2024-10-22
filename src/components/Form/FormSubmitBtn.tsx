import { Button, Form } from 'antd';

type TFormSubmitProps = {
  btnText: string;
  block?: boolean;
  disabled?: boolean;
};

const FormSubmitBtn = ({
  btnText,
  block = true,
  disabled = false,
}: TFormSubmitProps) => {
  return (
    <Form.Item style={{ width: '100%', marginTop: '20px' }}>
      <Button block={block} htmlType="submit" type="primary" disabled={disabled}>
        {btnText}
      </Button>
    </Form.Item>
  );
};

export default FormSubmitBtn;
