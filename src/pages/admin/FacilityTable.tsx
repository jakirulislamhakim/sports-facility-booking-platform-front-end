import {
  Table,
  Button,
  Space,
  Avatar,
  Tooltip,
  TableColumnsType,
  Modal,
} from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useMobileResponsive } from '../../hooks/useMobileResponsive';
import {
  useGetAllFacilitiesQuery,
  useRemoveAFacilityMutation,
} from '../../redux/features/facilities/facilitiesApi';
import { TApiErrorResponse, TFacility } from '../../types';
import { toast } from 'sonner';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FacilityTable = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);

  const isMobile = useMobileResponsive();
  const { data, isLoading } = useGetAllFacilitiesQuery(undefined);
  const [removeAFacility] = useRemoveAFacilityMutation();

  // facility data
  const facilityData: TFacility[] = data?.data || [];

  // handle remove facility
  const handleRemoveFacility = async (facilityId: string) => {
    const toastId = toast.loading('Deleing facility...', { id: 1 });
    try {
      const res = await removeAFacility(facilityId).unwrap();
      console.log(res);

      if (res.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (error) {
      const err = error as TApiErrorResponse;
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      }
      toast.error(err.data.message, { id: toastId });
    }
  };

  // modal actions for show modal
  const showModal = (facilityId: string) => {
    setSelectedFacilityId(facilityId);
    setIsModalOpen(true);
  };

  //  modal action for ultimate cancel booking
  const handleOk = () => {
    if (selectedFacilityId) {
      handleRemoveFacility(selectedFacilityId);
      setIsModalOpen(false);
      setSelectedFacilityId(null);
    }
  };

  //  modal action for cancel booking modal close
  const handleCancel = () => {
    setSelectedFacilityId(null);
    setIsModalOpen(false);
  };

  const columns: TableColumnsType<TFacility> = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      responsive: ['md'],
      render: (image) => (
        <Avatar
          src={image}
          shape="square"
          size={64}
          style={{ objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => (
        <Space>
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      responsive: ['md'],
    },
    {
      title: 'Price/Hour',
      dataIndex: 'pricePerHour',
      key: 'pricePerHour',
      render: (price) => `$${price}`,
      sorter: (a, b) => a.pricePerHour - b.pricePerHour,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size={isMobile ? 'small' : 'middle'} wrap>
          <Tooltip title="Details" color="blue">
            <Link to={`/dashboard/admin/facility-details/${record._id}`}>
              <Button
                type="primary"
                icon={<EyeOutlined />}
                size={isMobile ? 'small' : 'middle'}
              />{' '}
            </Link>
          </Tooltip>
          <Tooltip title="Update" mouseLeaveDelay={0.2}>
            <Button
              type="default"
              icon={<EditOutlined />}
              // onClick={() => handleUpdate(record._id)}
              size={isMobile ? 'small' : 'middle'}
            />
          </Tooltip>
          <Tooltip title="Delete" color="red">
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => showModal(record._id)}
              size={isMobile ? 'small' : 'middle'}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ width: '100%', overflow: 'auto', padding: '4px 12px' }}>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={facilityData}
        rowKey="_id"
        pagination={false}
        scroll={{ x: isMobile ? 400 : undefined }}
        size={isMobile ? 'small' : 'middle'}
      />
      <Modal
        title="Are you sure you want to delete the facility ?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="YES"
        cancelText="NO"
      ></Modal>
    </div>
  );
};

export default FacilityTable;
