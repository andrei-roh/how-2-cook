import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROOT_ROUTE } from 'src/constants';
import { IState } from 'src/types';

export const IngredientsPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: IState) => state.user);

  useEffect(() => {
    if (!user.email) {
      navigate(ROOT_ROUTE);
    }
  }, [navigate, user.email]);

  return <div>Ingredients Page</div>;
};
