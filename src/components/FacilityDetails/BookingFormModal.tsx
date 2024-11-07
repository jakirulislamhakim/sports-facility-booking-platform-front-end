import { DatePicker, Empty, Form, Modal, Select } from 'antd';
import { Controller, FieldValues, SubmitHandler } from 'react-hook-form';
import RootForm from '../Form/RootForm';
import { useState } from 'react';
import dayjs from 'dayjs';
import FormSubmitBtn from '../Form/FormSubmitBtn';
import { DollarOutlined } from '@ant-design/icons';
import { useAvailableTimeSlotQuery } from '../../redux/features/user/userBookingsApi';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const dateFormat = 'YYYY-MM-DD';
const today = new Date();
const currentDate = today.toLocaleDateString('en-CA');
// add 3 month dynamically
today.setMonth(today.getMonth() + 3);
const next3Month = today.toLocaleDateString('en-CA');

type TBookingFormModalProps = {
  facilityId: string;
  isOpenBookingModal: boolean;
  handleCloseBookingModal: () => void;
};

// validation schema for booking form
const bookingFormModalValidationSchema = z.object({
  timeSlot: z.string({
    required_error: 'Time slot is required',
  }),
});

const BookingFormModal = ({
  facilityId,
  isOpenBookingModal,
  handleCloseBookingModal,
}: TBookingFormModalProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { data: availableTimeSlotData, isLoading: timeSlotLoading } =
    useAvailableTimeSlotQuery(
      {
        date: selectedDate as string,
        facility: facilityId,
      },
      {
        // skip when not given selectedDate
        skip: !selectedDate,
      }
    );

  const handleSubmitBookingForm: SubmitHandler<FieldValues> = (data) => {
    const bookingData = {
      ...data,
      date: selectedDate,
      facility: facilityId,
    };

    // TODO :  do booking operation

    // close modal when booking done
    handleCloseBookingModal();
    console.log(bookingData);
  };

  const availableTimeSlots: string[] = availableTimeSlotData?.data?.timeSlot;

  return (
    <Modal
      title="Booking Form"
      open={isOpenBookingModal}
      //   onOk={handleOk}
      onCancel={handleCloseBookingModal}
      footer={null}
    >
      <RootForm
        onSubmit={handleSubmitBookingForm}
        resolver={zodResolver(bookingFormModalValidationSchema)}
      >
        <Form.Item label="Select a Date">
          <DatePicker
            onChange={(_, dateString) => {
              setSelectedDate(dateString as string);
            }}
            style={{ width: '100%', margin: '15px 0px' }}
            status="error"
            minDate={dayjs(currentDate, dateFormat)}
            maxDate={dayjs(next3Month, dateFormat)}
          />
        </Form.Item>

        {/* get timeSlot by select */}
        <Controller
          name={'timeSlot'}
          render={({ field, fieldState: { error } }) => {
            return (
              <Form.Item
                label={'Select a time slot'}
                help={error ? error.message : null}
                validateStatus={error ? 'error' : ''}
              >
                <Select
                  disabled={!selectedDate || timeSlotLoading}
                  options={availableTimeSlots?.map((slot) => ({
                    label: slot,
                    value: slot,
                  }))}
                  {...field}
                  placeholder={'Select slot'}
                  notFoundContent={
                    <Empty
                      description={
                        <span style={{ color: 'red' }}>
                          No available slots for this date.
                        </span>
                      }
                    />
                  }
                />
              </Form.Item>
            );
          }}
        />

        <FormSubmitBtn
          disabled={!selectedDate}
          btnText="Proceed to checkout"
          icon={<DollarOutlined style={{ fontSize: '20px' }} />}
        />
      </RootForm>
    </Modal>
  );
};

export default BookingFormModal;
