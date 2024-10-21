import { Button, Form } from 'antd';

type TFormSubmitProps = {
  btnText: string;
  block?: boolean;
};

const FormSubmitBtn = ({ btnText, block = true }: TFormSubmitProps) => {
  return (
    <Form.Item style={{ width: '100%', marginTop: '20px' }}>
      <Button block={block} htmlType="submit" type="primary">
        {btnText}
      </Button>
    </Form.Item>
  );
};

export default FormSubmitBtn;
