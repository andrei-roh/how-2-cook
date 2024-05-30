import { useDispatch, useSelector } from 'react-redux';
import css from './Header.module.sass';
import { IState, IUser, Severity } from 'src/types';
import { getAuth, signOut } from 'firebase/auth';
import { showNotification } from 'src/utils/showNotification';
import { NOTIFICATIONS, ROOT_ROUTE } from 'src/constants';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import Skeleton from 'src/assets/fish-skeleton.svg';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { setUser } from 'src/redux/actions';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const user = useSelector((state: IState) => state.user);
  const [isSignOut, setIsSignOut] = useState(false);

  const handleShowModal = () => setIsSignOut(true);
  const handleCloseModal = () => setIsSignOut(false);

  const handleSignOut = async () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        dispatch(setUser({} as IUser));
        showNotification(NOTIFICATIONS(user.email).SIGN_OUT_SUCCESS, 6000, Severity.Info);
        navigate(ROOT_ROUTE);
      })
      .catch(() => {
        showNotification(NOTIFICATIONS(user.email).SIGN_OUT_ERROR, 6000, Severity.Error);
      });
    
    handleCloseModal();
  };

  return (
    <div className={css.headerWrapper}>
      <div className={css.userEmail}>{user.email || ''}</div>
      {user.email && <button onClick={handleShowModal} className={css.headerModalButton}>
        <img className={css.headerLogo} src={Skeleton} alt='Sign Out Button' />
      </button>}
      {isSignOut && (
        <Modal
          cancelButtonMessage='Отмена'
          submitButtonMessage='Выход'
          isLoading={false}
          handleClose={handleCloseModal}
          handleSubmit={handleSignOut}
          message='Вы уверены, что хотите выйти?'
          submitClassName={css.modalUserLogoutButton}
          cancelClassName={css.modalCancelButton}
        />
      )}
    </div>
  );
};
