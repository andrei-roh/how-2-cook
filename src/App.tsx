import { Outlet, useNavigate } from 'react-router-dom';
import css from './App.module.sass';
import { Header, Notification } from './components';
import { getAuth } from 'firebase/auth';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/actions';
import { RECIPES_ROUTE, ROOT_ROUTE } from './constants';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const App = () => {
  const auth = getAuth();
  const dispatch: Dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkLogin, setCheckLogin] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ email: user.email as string }));
        navigate(window.location.pathname === ROOT_ROUTE ? RECIPES_ROUTE : window.location.pathname);
        setCheckLogin(false);
      } else {
        setCheckLogin(false);
      }
    });
  }, [])

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
          <Notification />
        </>
      )}
    </>
  );
};

export default App;
