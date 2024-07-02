import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROOT_ROUTE } from 'src/constants';
import { IUser } from 'src/types';

export const useCheckAuthentication = (user: IUser) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      navigate(ROOT_ROUTE);
    }
  }, [navigate, user.email]);
};
