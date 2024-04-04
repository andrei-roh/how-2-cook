import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import css from './TitlePage.module.sass';
import { useEffect, useState } from 'react';
import { Button, Input, Loader } from 'src/components';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { setError, setLoading, setUser } from 'src/redux/actions';
import { FirebaseErrorType, IState, IValidationError } from 'src/types';
import { useNavigate } from 'react-router-dom';
import { NOTIFICATION, RECIPES_ROUTE } from 'src/constants';
import { validateLoginValues } from 'src/utils/validateLoginValues';
import { showNotification } from 'src/utils/showNotification';
import Fish from 'src/assets/fish.svg';

export const TitlePage = () => {
  const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state: IState) => state.loading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState<IValidationError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUserLogin = () => {
    navigate(RECIPES_ROUTE);
  };

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsSubmitting(() => true);

    if (Object.keys(validation).length === 0) {
      dispatch(setLoading(true));

      const auth = getAuth();

      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const { user } = userCredential;

          dispatch(setUser({ email: user.email as string }));
          handleUserLogin();
        })
        .catch((error) => {
          console.log({ code: error.code, message: error.message });
          dispatch(setError({ code: error.code, message: error.message }));

          switch (error.code) {
            case FirebaseErrorType.InvalidEmail:
              showNotification(NOTIFICATION(email).USER_WRONG_EMAIL, 6000);
              break;
            case FirebaseErrorType.InvalidPassword:
              showNotification(NOTIFICATION(email).USER_WRONG_PASSWORD, 6000);
              break;
            case FirebaseErrorType.TooManyRequsts:
              showNotification(
                NOTIFICATION(email).USER_TOO_MANY_REQUESTS,
                6000
              );
              break;
            default:
              break;
          }
        });

      setTimeout(() => dispatch(setLoading(false)), 1000);
    }
  };

  useEffect(() => {
    setValidation(
      validateLoginValues({
        email,
        password,
      })
    );
  }, [email, navigate, password]);

  return (
    <>
      <div className={css.titleWrapper}>
        <img className={css.titleLogo} src={Fish} />
        <div>How to Cook</div>
      </div>
      <form className={css.titlePageForm} onSubmit={handleLogin}>
        <Input
          value={email}
          setChange={setEmail}
          labelText='Электронная почта'
          isValidationError={isSubmitting && !!validation.email}
          errorMessage={validation.email}
        />
        <Input
          value={password}
          setChange={setPassword}
          type='password'
          labelText='Пароль'
          isValidationError={isSubmitting && !!validation.password}
          errorMessage={validation.password}
        />
        <Button className={css.titlePageSubmitButton}>
          {isLoading ? <Loader size={'12px'} /> : 'Войти'}
        </Button>
      </form>
    </>
  );
};
