import { Empty, List, Modal, Typography } from 'antd';

const { Text } = Typography;

type TCheckAvailabilityModalProps = {
  facilityName: string;
  isOpenCheckAvailabilityModal: boolean;
  handleCloseCheckAvailabilityModal: () => void;
  availableTimeSlots: string[];
  timeSlotLoading: boolean;
};

const CheckAvailabilityModal = ({
  facilityName,
  isOpenCheckAvailabilityModal,
  handleCloseCheckAvailabilityModal,
  availableTimeSlots,
  timeSlotLoading,
}: TCheckAvailabilityModalProps) => {
  return (
    <Modal
      title={`Available slot for ${facilityName}`}
      open={isOpenCheckAvailabilityModal}
      onCancel={handleCloseCheckAvailabilityModal}
      loading={timeSlotLoading}
      footer={null}
    >
      <div>
        {availableTimeSlots?.length > 0 ? (
          <div style={{ marginTop: '20px' }}>
            <List
              bordered
              dataSource={availableTimeSlots}
              renderItem={(slot) => <List.Item>{slot}</List.Item>}
            />
          </div>
        ) : (
          <Empty
            description={
              <Text type="danger" style={{ marginTop: '20px' }}>
                No available slots for this date.
              </Text>
            }
          />
        )}
      </div>
    </Modal>
  );
};

export default CheckAvailabilityModal;
