import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { getAuth, signOut } from 'firebase/auth';
import { setUser } from 'src/redux/actions';
import { IUser, Severity } from 'src/types';
import { showNotification } from './showNotification';
import { NOTIFICATIONS, ROOT_ROUTE } from 'src/constants';
import { NavigateFunction } from 'react-router-dom';

export const userSignOut = (
  navigate: NavigateFunction,
  dispatch: Dispatch<UnknownAction>,
  user: IUser
) => {
  const auth = getAuth();

  signOut(auth)
    .then(() => {
      dispatch(setUser({} as IUser));
      showNotification(
        NOTIFICATIONS(user.email).SIGN_OUT_SUCCESS,
        6000,
        Severity.Info
      );
      navigate(ROOT_ROUTE);
    })
    .catch(() => {
      showNotification(
        NOTIFICATIONS(user.email).SIGN_OUT_ERROR,
        6000,
        Severity.Error
      );
    });
};
