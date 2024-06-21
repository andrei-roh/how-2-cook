import { Outlet, useNavigate } from 'react-router-dom';
import css from './App.module.sass';
import { Header, Menu, Notification } from './components';
import { getAuth } from 'firebase/auth';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/actions';
import { RECIPES_ROUTE, ROOT_ROUTE } from './constants';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { IState } from './types';
import { showElement } from './utils/showElement';
import { hideElement } from './utils/hideElement';

const App = () => {
  const auth = getAuth();
  const dispatch: Dispatch = useDispatch();
  const isMenu = useSelector((state: IState) => state.isMenu);
  const navigate = useNavigate();
  const [checkLogin, setCheckLogin] = useState(true);
  const menu = document.getElementById('menu');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ email: user.email as string }));
        navigate(
          window.location.pathname === ROOT_ROUTE
            ? RECIPES_ROUTE
            : window.location.pathname
        );
        setCheckLogin(false);
      } else {
        setCheckLogin(false);
      }
    });
  }, []);

  useEffect(() => {
    if (menu) {
      isMenu ? showElement(menu) : hideElement(menu);
    }
  }, [isMenu, menu]);

  return (
    <>
      {checkLogin ? (
        <CircularProgress size={64} />
      ) : (
        <>
          <Header />
          <div className={css.app}>
            <Outlet />
          </div>
          <Menu />
          <Notification />
        </>
      )}
    </>
  );
};

export default App;
