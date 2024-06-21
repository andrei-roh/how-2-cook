import css from './Modal.module.sass';
import { getClassesList } from 'src/utils/getClassesList';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

interface ModalProps {
  cancelButtonMessage: string;
  submitButtonMessage: string;
  isLoading: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  message: string;
  submitClassName?: string;
  cancelClassName?: string;
}

export const Modal = ({
  cancelButtonMessage,
  submitButtonMessage,
  isLoading,
  handleClose,
  handleSubmit,
  message,
  submitClassName,
  cancelClassName,
}: ModalProps) => {
  const submitClassNames = getClassesList(`${css.modalButton} ${css.modalSubmitButton}`, submitClassName);
  const cancelClassNames = getClassesList(`${css.modalButton} ${css.modalCancelButton}`, cancelClassName);

  return (
    <div className={css.modalWrapper}>
      <div className={css.modalContainer}>
        <div className={css.modalMessage}>{message}</div>
        <div className={css.buttonsPanel}>
          <Button onClick={handleClose} className={cancelClassNames}>
            {cancelButtonMessage}
          </Button>
          <Button
            onClick={handleSubmit}
            className={submitClassNames}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress color='inherit' size={32} /> : submitButtonMessage}
          </Button>
        </div>
      </div>
    </div>
  );
};
