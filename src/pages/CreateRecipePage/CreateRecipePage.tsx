import { useEffect } from 'react';
import css from './CreateRecipePage.module.sass';
import { useSelector } from 'react-redux';
import { IState } from 'src/types';
import { useNavigate } from 'react-router-dom';
import { ROOT_ROUTE } from 'src/constants';

export const CreateRecipePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: IState) => state.user);

  useEffect(() => {
    if (!user.email) {
      navigate(ROOT_ROUTE)
    }
  }, [navigate, user.email]);

  return (
    <>
      <div className={css.createRecipePageWrapper}>Create Recipe Page</div>
    </>
  );
};
