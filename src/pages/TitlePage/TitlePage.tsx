import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import css from './TitlePage.module.sass';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { setError, setLoading, setUser } from 'src/redux/actions';
import {
  FirebaseErrorType,
  IState,
  IValidationError,
  Severity,
} from 'src/types';
import { useNavigate } from 'react-router-dom';
import { NOTIFICATIONS, RECIPES_ROUTE } from 'src/constants';
import { validateLoginValues } from 'src/utils/validateLoginValues';
import { showNotification } from 'src/utils/showNotification';
import Fish from 'src/assets/fish.svg';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { InputAdornment } from '@mui/material';
import Show from 'src/assets/eye.svg';
import Hide from 'src/assets/eye-closed.svg';

export const TitlePage = () => {
  const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state: IState) => state.loading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPasword] = useState(false);
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
          dispatch(setError({ code: error.code, message: error.message }));

          switch (error.code) {
            case FirebaseErrorType.InvalidEmail:
              showNotification(
                NOTIFICATIONS(email).USER_WRONG_EMAIL,
                6000,
                Severity.Error
              );
              break;
            case FirebaseErrorType.InvalidPassword:
              showNotification(
                NOTIFICATIONS(email).USER_WRONG_PASSWORD,
                6000,
                Severity.Error
              );
              break;
            case FirebaseErrorType.TooManyRequsts:
              showNotification(
                NOTIFICATIONS(email).USER_TOO_MANY_REQUESTS,
                6000,
                Severity.Error
              );
              break;
            default:
              break;
          }
        });

      setTimeout(() => dispatch(setLoading(false)), 300);
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
    <Stack
      direction='column'
      spacing={5}
      useFlexGap
      className={css.titleWrapper}
    >
      <Stack direction='column' spacing={1} useFlexGap>
        <img className={css.titleLogo} src={Fish} />
        <Typography variant='h5' alignSelf='center'>
          How to Cook
        </Typography>
      </Stack>
      <TextField
        label='Электронная почта'
        required
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={isSubmitting && !!validation.email}
        helperText={isSubmitting && validation.email}
      />
      <TextField
        label='Пароль'
        type={showPassword ? 'text' : 'password'}
        required
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={isSubmitting && !!validation.password}
        helperText={isSubmitting && validation.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <img
                onClick={() => setShowPasword(!showPassword)}
                src={showPassword ? Hide : Show}
                alt='Show/Hide Password'
              />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant='contained'
        className={css.titlePageSubmitButton}
        onClick={handleLogin}
      >
        {isLoading ? <CircularProgress /> : 'Войти'}
      </Button>
    </Stack>
  );
};
