import { Helmet } from 'react-helmet-async';

const PageTitle = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <title>{`SFBP | ${title}`}</title>
    </Helmet>
  );
};

export default PageTitle;
