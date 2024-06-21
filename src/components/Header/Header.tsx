import { useDispatch, useSelector } from 'react-redux';
import css from './Header.module.sass';
import { IState } from 'src/types';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import Skeleton from 'src/assets/fish-skeleton.svg';
import Table from 'src/assets/bedside-table.svg';
import { Dispatch } from '@reduxjs/toolkit';
import { setShowMenu } from 'src/redux/actions';
import { userSignOut } from 'src/utils/userSignOut';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const user = useSelector((state: IState) => state.user);
  const [isSignOut, setIsSignOut] = useState(false);

  const handleShowModal = () => setIsSignOut(true);
  const handleCloseModal = () => setIsSignOut(false);
  const handleShowMenu = () => dispatch(setShowMenu(true));

  const handleSignOut = () => {
    userSignOut(navigate, dispatch, user);
    handleCloseModal();
  };

  return (
    <div className={css.headerWrapper}>
      {user.email && (
        <button onClick={handleShowMenu} className={css.headerButton}>
          <img className={css.headerLogo} src={Table} alt='Menu Button' />
        </button>
      )}
      <div className={css.userEmail}>{user.email || ''}</div>
      {user.email && (
        <button onClick={handleShowModal} className={css.headerButton}>
          <img
            className={css.headerLogo}
            src={Skeleton}
            alt='Sign Out Button'
          />
        </button>
      )}
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
