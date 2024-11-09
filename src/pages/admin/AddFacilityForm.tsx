import FormInput from '../../components/Form/FormInput';
import RootForm from '../../components/Form/RootForm';
import FormTextArea from '../../components/Form/FormTextArea';
import FormInputNumber from '../../components/Form/FormInputNumber';
import FromInputImage from '../../components/Form/FormInputImage';
import FormSubmitBtn from '../../components/Form/FormSubmitBtn';
import { zodResolver } from '@hookform/resolvers/zod';
import { addFacilityFormValidationSchema } from '../../validationSchema/FacilityFormValidationSchema';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useAddAFacilityMutation } from '../../redux/features/facilities/facilitiesApi';
import { toast } from 'sonner';
import { TApiErrorResponse } from '../../types';
import { useState } from 'react';
import Title from 'antd/es/typography/Title';
import { Divider } from 'antd';
import FormRating from '../../components/Form/FormRating';
import PageTitle from '../../components/Shared/PageTitle';

const AddFacilityForm = () => {
  const [addAFacility, { isLoading }] = useAddAFacilityMutation();
  const [formKey, setFormKey] = useState(0);

  // Form submission handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { image, ...rest } = data;
    const formData = new FormData();
    formData.append('data', JSON.stringify(rest));
    formData.append('image', image);

    const toastId = toast.loading('Facility creating....', { id: 33 });
    try {
      // send to backend
      const res = await addAFacility(formData).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });

        // set from key for rerender form component
        setFormKey(formKey + 1);
      }
    } catch (error) {
      const err = error as TApiErrorResponse;
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else if (err) {
        toast.error(err.data.message, { id: toastId });
      }
      toast.error('Something went wrong! Please try again', { id: toastId });
    }
  };

  return (
    <>
      <PageTitle title="ADD-FACILITY" />
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '0px 12px',
        }}
      >
        <Title level={3} style={{ textAlign: 'center', margin: '16px' }}>
          Add New Facility
        </Title>
        <Divider></Divider>
        <RootForm
          key={formKey}
          onSubmit={onSubmit}
          resolver={zodResolver(addFacilityFormValidationSchema)}
        >
          {/* Facility Name */}
          <FormInput label="Facility Name" name="name" placeHolder="Tennis Court" />

          {/* Description */}
          <FormTextArea
            label="Description"
            name="description"
            placeHolder="Description of the facility"
            rows={3}
          />

          {/* Price Per Hour */}
          <FormInputNumber
            label="Price Per Hour"
            name="pricePerHour"
            placeHolder="$"
          />

          {/* Location */}
          <FormInput
            label="Location"
            name="location"
            placeHolder="e.g., 456 Sports Ave, Springfield"
          />

          {/* rating */}
          <FormRating />

          {/* Image Upload */}
          <FromInputImage label="Facility Image" name="image" />

          <FormSubmitBtn btnText="Add Facility" disabled={isLoading} />
        </RootForm>
      </div>
    </>
  );
};

export default AddFacilityForm;
