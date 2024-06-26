import { getClassesList } from 'src/utils/getClassesList';
import css from './ImageLoader.module.sass';
import { useState } from 'react';
import Camera from './assets/camera.svg';
import { showNotification } from 'src/utils/showNotification';
import { IMAGE_TYPE, NOTIFICATIONS } from 'src/constants';
import { Severity } from 'src/types';

interface ImageLoaderProps {
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  imagePreview?: string;
  isValidationError?: boolean;
  errorMessage?: string;
}

const convertBytesToMegabytes = (value: number) =>
  Number((value / (1024 * 1024)).toFixed(4));

export const ImageLoader = ({
  setImage,
  imagePreview,
  isValidationError,
  errorMessage,
}: ImageLoaderProps) => {
  const imageLoaderClasses = getClassesList(css.imageLoader);
  const [preview, setPreview] = useState<string>(imagePreview || '');

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const imageFile = e.target.files[0];

      if (convertBytesToMegabytes(imageFile.size) > 10) {
        showNotification(NOTIFICATIONS().IMAGE_TOO_BIG, 6000, Severity.Error);
        return;
      }

      if (!IMAGE_TYPE.some((type) => type === imageFile.type)) {
        showNotification(
          NOTIFICATIONS().IMAGE_WRONG_TYPE,
          6000,
          Severity.Error
        );
        return;
      }

      setImage(() => imageFile);
      setPreview(() => URL.createObjectURL(imageFile));
    }
  };

  return (
    <div className={css.imageLoaderWrapper}>
      <div className={imageLoaderClasses}>
        <label className={css.imageLoaderContainer}>
          <img className={css.uploadButton} width={29} src={Camera} />
          <input
            className={css.imageLoaderInput}
            type='file'
            onChange={(e) => handleSetImage(e)}
          />
          {preview && (
            <img
              className={css.imagePreview}
              src={preview}
              alt='Your Image Preview'
            />
          )}
        </label>
      </div>
      {isValidationError && (
        <p className={css.validationError}>
          {isValidationError && errorMessage}
        </p>
      )}
    </div>
  );
};
