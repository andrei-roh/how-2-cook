import { Modal } from 'src/components';
import css from './Menu.module.sass';
import Close from 'src/assets/close-circle.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { Link } from 'src/components';
import { useNavigate } from 'react-router-dom';
import { RECIPES_ROUTE, INGREDIENTS_ROUTE, WEEK_PLANNING, MY_PLANS } from 'src/constants';
import { useState } from 'react';
import { getClassesList } from 'src/utils/getClassesList';
import Button from '@mui/material/Button';
import { setShowMenu } from 'src/redux/actions';
import { userSignOut } from 'src/utils/userSignOut';
import { IState } from 'src/types';

const getMenuLinkClasses = (condition: boolean) =>
  getClassesList(css.menuLink, condition ? css.currentMenuLink : undefined);

export const Menu = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const user = useSelector((state: IState) => state.user);
  const currentRoute = window.location.pathname;
  const [isSignOut, setIsSignOut] = useState(false);

  const handleShowModal = () => setIsSignOut(true);
  const handleCloseModal = () => setIsSignOut(false);

  const handleCloseMenu = () => {
    dispatch(setShowMenu(false));
  };
  const handleChangePage = (route: string) => {
    navigate(route);
    handleCloseMenu();
  };

  const handleSignOut = () => {
    userSignOut(navigate, dispatch, user);
    handleCloseModal();
    handleCloseMenu();
  };

  return (
    <div id='menu' className={css.menuWrapper}>
      <div className={css.menuContent}>
        <Button onClick={handleCloseMenu} className={css.menuCloseButton}>
          <img width={30} src={Close} />
        </Button>
        <Link
          onClick={() => handleChangePage(RECIPES_ROUTE)}
          className={getMenuLinkClasses(currentRoute === RECIPES_ROUTE)}
        >
          Рецепты
        </Link>
        <Link
          onClick={() => handleChangePage(INGREDIENTS_ROUTE)}
          className={getMenuLinkClasses(currentRoute === INGREDIENTS_ROUTE)}
        >
          Ингредиенты
        </Link>
        <Link
          onClick={() => handleChangePage(WEEK_PLANNING)}
          className={getMenuLinkClasses(currentRoute === WEEK_PLANNING)}
        >
          Планирование
        </Link>
        <Link
          onClick={() => handleChangePage(MY_PLANS)}
          className={getMenuLinkClasses(currentRoute === MY_PLANS)}
        >
          Мои Планы
        </Link>
        <Link onClick={handleShowModal} className={css.menuLink}>
          Выход
        </Link>
        {isSignOut && (
          <Modal
            cancelButtonMessage='Отмена'
            submitButtonMessage='Выход'
            isLoading={false}
            handleClose={handleCloseModal}
            handleSubmit={handleSignOut}
            message='Вы уверены, что хотите выйти?'
          />
        )}
      </div>
    </div>
  );
};
