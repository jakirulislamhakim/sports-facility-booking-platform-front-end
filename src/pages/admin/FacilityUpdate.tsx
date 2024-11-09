import FormInput from '../../components/Form/FormInput';
import RootForm from '../../components/Form/RootForm';
import FormTextArea from '../../components/Form/FormTextArea';
import FormInputNumber from '../../components/Form/FormInputNumber';
import FromInputImage from '../../components/Form/FormInputImage';
import FormSubmitBtn from '../../components/Form/FormSubmitBtn';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateFacilityFormValidationSchema } from '../../validationSchema/FacilityFormValidationSchema';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import {
  useGetSingleFacilityQuery,
  useUpdateAFacilityMutation,
} from '../../redux/features/facilities/facilitiesApi';
import { toast } from 'sonner';
import { TApiErrorResponse, TFacility } from '../../types';
import Title from 'antd/es/typography/Title';
import { Divider, Image } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/UI/Loading';
import { useEffect, useMemo, useState } from 'react';
import PageTitle from '../../components/Shared/PageTitle';

const FacilityUpdate = () => {
  const [formKey, setFormKey] = useState(0);
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading: currentFacilityLoading } = useGetSingleFacilityQuery(
    facilityId as string
  );
  const [updateAFacility, { isLoading }] = useUpdateAFacilityMutation();

  // Memoize facilityData to prevent unnecessary recalculations
  const facilityData: TFacility = useMemo(() => data?.data || {}, [data]);

  // basically useEffect use for setDefaultValues in form
  // when facilityData is available then rerender the component and set defaultvalues in form
  useEffect(() => {
    if (facilityData) {
      setFormKey((prevKey) => prevKey + 1);
    }
  }, [facilityData]);

  const { _id, image, ...defaultValues } = facilityData;

  // Form submission handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { image, ...rest } = data;
    const formData = new FormData();
    formData.append('data', JSON.stringify(rest));
    if (image) formData.append('image', image);

    const toastId = toast.loading('Facility updating...', { id: 33 });
    try {
      const arg = { _id, formData };
      const res = await updateAFacility(arg).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
        navigate('/dashboard/admin/facility-table');
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
      <PageTitle title="FACILITY-UPDATE" />

      <Loading isLoading={currentFacilityLoading}>
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '0px 12px',
          }}
        >
          <Title level={3} style={{ textAlign: 'center', margin: '16px' }}>
            Update The Facility
          </Title>
          <Divider></Divider>
          <RootForm
            onSubmit={onSubmit}
            resolver={zodResolver(updateFacilityFormValidationSchema)}
            disabled={currentFacilityLoading}
            defaultValues={defaultValues}
            key={formKey}
          >
            {/* Facility Name */}
            <FormInput
              label="Facility Name"
              name="name"
              placeHolder="Tennis Court"
            />
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

            <Image width={100} src={image ? image : undefined} />
            {/* Image Upload */}
            <FromInputImage label="Facility Image" name="image" />
            <FormSubmitBtn btnText="Update Facility" disabled={isLoading} />
          </RootForm>
        </div>
      </Loading>
    </>
  );
};

export default FacilityUpdate;
