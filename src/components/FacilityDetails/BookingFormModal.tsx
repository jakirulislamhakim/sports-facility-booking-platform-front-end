import { DatePicker, Empty, Form, Modal, Row, Select } from 'antd';
import { Controller, FieldValues, SubmitHandler } from 'react-hook-form';
import RootForm from '../Form/RootForm';
import { useState } from 'react';
import dayjs from 'dayjs';
import FormSubmitBtn from '../Form/FormSubmitBtn';
import { DollarOutlined } from '@ant-design/icons';
import {
  useAvailableTimeSlotQuery,
  useCreateUserBookingFacilityMutation,
} from '../../redux/features/user/userBookingsApi';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { TApiErrorResponse } from '../../types';

const dateFormat = 'YYYY-MM-DD';
const today = new Date();
const currentDate = today.toLocaleDateString('en-CA');
// add 3 month dynamically
today.setMonth(today.getMonth() + 3);
const next3Month = today.toLocaleDateString('en-CA');

type TBookingFormModalProps = {
  facilityId: string;
  bookingAmount: string;
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
  bookingAmount,
  isOpenBookingModal,
  handleCloseBookingModal,
}: TBookingFormModalProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { data: availableTimeSlotData, isLoading: timeSlotLoading } =
    useAvailableTimeSlotQuery(
      { date: selectedDate as string, facility: facilityId },
      { skip: !selectedDate } // skip when not given selectedDate
    );

  const [createBookings] = useCreateUserBookingFacilityMutation();

  // submit booking
  const handleSubmitBookingForm: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Booking Facility...', { id: 17 });

    const bookingData = {
      ...data,
      date: selectedDate,
      facility: facilityId,
    };

    try {
      const res = await createBookings(bookingData).unwrap();

      if (res.success && res.data.payment_url) {
        window.location.href = res.data.payment_url;
      }

      toast.error(res?.data, { id: toastId });
    } catch (error) {
      const err = error as TApiErrorResponse;
      if (error instanceof Error) toast.error(error.message, { id: toastId });
      toast.error(err.data.message, { id: toastId });
    }
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
                label={'Available time slot'}
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
          btnText={`Proceed to checkout`}
          icon={
            <Row justify={'center'} align={'middle'}>
              <span>{bookingAmount} </span>
              <DollarOutlined style={{ fontSize: '18px', marginLeft: '4px' }} />
            </Row>
          }
        />
      </RootForm>
    </Modal>
  );
};

export default BookingFormModal;
