import { Collapse, Row, Col, CollapseProps } from 'antd';
import SectionTitle from '../UI/SectionTitle';
import ResponsiveContainer from '../../utils/ResponsiveContainer';
import { faqData } from '../../data/faqData';

const collapseItems: CollapseProps['items'] = faqData.map((item, index) => ({
  key: index,
  label: item.question,
  children: <p>{item.answer}</p>,
}));

const FAQSection = () => {
  return (
    <ResponsiveContainer isNeedPadding={true}>
      <SectionTitle
        title="Frequently Asked Questions"
        description="Quick answers to common questions about booking and using our platform."
      />
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18}>
          <Collapse items={collapseItems} />
        </Col>
      </Row>
    </ResponsiveContainer>
  );
};

export default FAQSection;
