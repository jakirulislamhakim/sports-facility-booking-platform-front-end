import { Modal } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import RootForm from '../Form/RootForm';
import FormRating from '../Form/FormRating';
import FormTextArea from '../Form/FormTextArea';
import { SubmitHandler } from 'react-hook-form';
import FormSubmitBtn from '../Form/FormSubmitBtn';
import { shareUserExperienceValidationSchema } from '../../validationSchema/ShareExperienceValidationSchema';

type TShareExperienceModalProps = {
  visible: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: SubmitHandler<any>;
  onCancel: () => void;
};

const ShareExperienceModal = ({
  visible,
  onSubmit,
  onCancel,
}: TShareExperienceModalProps) => {
  return (
    <Modal
      title="Share Your Experience"
      open={visible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <RootForm
        onSubmit={onSubmit}
        resolver={zodResolver(shareUserExperienceValidationSchema)}
      >
        {/* Rating Field */}
        <FormRating />

        {/* Feedback Field */}
        <FormTextArea
          name="feedback"
          label="Feedback"
          placeHolder="Share your experience.."
        />

        {/* form submit btn */}
        <FormSubmitBtn btnText="Feedback" />
      </RootForm>
    </Modal>
  );
};

export default ShareExperienceModal;
