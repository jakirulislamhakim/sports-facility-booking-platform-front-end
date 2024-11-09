import {
  Col,
  Row,
  Input,
  Select,
  Divider,
  Pagination,
  Grid,
  Typography,
  Alert,
} from 'antd';
import FacilityCard from '../components/Home/FacilityCard';
import SectionTitle from '../components/UI/SectionTitle';
import { useGetAllFacilitiesQuery } from '../redux/features/facilities/facilitiesApi';
import ResponsiveContainer from '../utils/ResponsiveContainer';
import Loading from '../components/UI/Loading';
import { TFacility } from '../types';
import { useState } from 'react';
import { SearchProps } from 'antd/es/input';
import PageTitle from '../components/Shared/PageTitle';

const { Search } = Input;
const { Title, Text } = Typography;

const selectOptions = [
  {
    label: 'Default',
    value: '',
  },
  {
    label: 'Price per hour high to low',
    value: '-pricePerHour',
  },
  {
    label: 'Price per hour low to high',
    value: 'pricePerHour',
  },
  {
    label: 'Popular facilities',
    value: '-rating',
  },
];

const Facilities = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<string>('');
  const [page, setPage] = useState<string>('');

  const { useBreakpoint } = Grid;

  const { data, isLoading, isFetching, isError } = useGetAllFacilitiesQuery([
    { name: 'searchTerm', value: searchTerm },
    { name: 'sort', value: selectedOptions },
    { name: 'page', value: page },
    //* limit value can do dynamic
    { name: 'limit', value: '6' },
  ]);

  const facilities = data?.data as TFacility[];

  const onSearch: SearchProps['onSearch'] = (value) => {
    setSearchTerm(value);
    setPage('1');
  };

  const handleSelect = (value: string) => {
    setSelectedOptions(value);
    setPage('1');
  };

  return (
    <>
      <PageTitle title="FACILITIES" />
      <div style={{ minHeight: '90vh' }}>
        <Loading isLoading={isFetching || isLoading}>
          <ResponsiveContainer isNeedPadding>
            <SectionTitle
              title="Available Facilities"
              description="Explore and book your favorite sports facilities"
            />

            <Divider />

            {/* Search and Filter Section */}
            <Row
              gutter={[16, 16]}
              justify={'space-between'}
              style={{ margin: useBreakpoint().xs ? '20px 5px' : '40px 5px' }}
            >
              <Col xs={24} sm={12} md={8} lg={6}>
                <Search
                  placeholder="Search facilities..."
                  size={useBreakpoint().xs ? 'small' : 'middle'}
                  style={{ width: '100%' }}
                  allowClear
                  onSearch={onSearch}
                  disabled={isError}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Select
                  defaultValue="Filter by.."
                  size={useBreakpoint().xs ? 'small' : 'middle'}
                  style={{ width: '100%' }}
                  options={selectOptions}
                  onChange={handleSelect}
                  disabled={isError}
                />
              </Col>
            </Row>

            {/* Error Handling when data couldn't fetch */}
            {isError && (
              <Alert
                message="Error"
                description="Sorry, we couldn't load the facilities. Please try again later."
                type="error"
                showIcon
                style={{ marginBottom: '20px' }}
              />
            )}

            {/* if no facilities found */}
            {facilities?.length === 0 && (
              <Row justify={'center'}>
                <Col style={{ textAlign: 'center' }}>
                  <Title type="danger" level={3}>
                    No facilities found
                  </Title>
                  <Text type="danger">
                    Try adjusting your search or browse our other available
                    facilities.
                  </Text>
                </Col>
              </Row>
            )}

            {/* show all facility card by grid layout */}
            <Row gutter={[24, 24]}>
              {facilities?.map((facility, index) => (
                <Col xs={24} sm={24} md={12} lg={8} key={index}>
                  <FacilityCard
                    facility={facility}
                    key={index}
                    isLoading={isFetching}
                  />
                </Col>
              ))}
            </Row>

            {/* pagination section */}
            <Pagination
              align="center"
              size={useBreakpoint().xs ? 'small' : 'default'}
              style={{ marginTop: '30px' }}
              defaultCurrent={1}
              defaultPageSize={20}
              hideOnSinglePage={true}
              onChange={(page) => setPage(page.toString())}
              current={data?.meta?.page}
              pageSize={data?.meta?.limit}
              total={data?.meta?.countTotal}
            />
          </ResponsiveContainer>
        </Loading>
      </div>
    </>
  );
};

export default Facilities;
