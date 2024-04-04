import { useEffect } from 'react';
import css from './RecipesPage.module.sass';
import { useSelector } from 'react-redux';
import { IState } from 'src/types';
import { useNavigate } from 'react-router-dom';
import { ROOT_ROUTE } from 'src/constants';

export const RecipesPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: IState) => state.user);

  useEffect(() => {
    if (!user.email) {
      navigate(ROOT_ROUTE)
    }
  }, [navigate, user.email]);

  return (
    <>
      <div className={css.recipesPageWrapper}>Recipes Page</div>
    </>
  );
};
