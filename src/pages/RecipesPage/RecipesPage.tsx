import { useEffect, useState } from 'react';
import css from './RecipesPage.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { IState, ScrollDirection } from 'src/types';
import { useNavigate } from 'react-router-dom';
import { CREATE_RECIPE_ROUTE, ROOT_ROUTE } from 'src/constants';
import { RecipesBlock } from './components/RecipesBlock/RecipesBlock';
import { Button, Input, Loader } from 'src/components';
import { Dispatch } from '@reduxjs/toolkit';
import Add from 'src/assets/add.svg';
import { getSearch } from 'src/utils/getSearch';
import {
  addRecipesToList,
  setRecipesPageScrollDirection,
  setRecipesPageScrollSize,
  setRecipesPageSearchInput,
} from 'src/redux/actions';
import { getAllRecipes } from 'src/utils/getAllRecipes';

const minScrollSize = 75;

const handleScrollDirection = (
  scrollSize: number,
  setScrollDirection: React.Dispatch<React.SetStateAction<ScrollDirection>>,
  setScrollSize: React.Dispatch<React.SetStateAction<number>>
) => {
  if (
    scrollSize !== window.scrollY &&
    Math.abs(window.scrollY - scrollSize) > minScrollSize
  ) {
    window.scrollY > scrollSize
      ? setScrollDirection(ScrollDirection.Up)
      : setScrollDirection(ScrollDirection.Down);

    setScrollSize(window.scrollY);
  }
};

export const RecipesPage = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const user = useSelector((state: IState) => state.user);
  const currentRecipesList = useSelector((state: IState) => state.recipesList);
  const searchInput = useSelector(
    (state: IState) => state.recipesPage.recipeSearchInput
  );

  const setSearchInput = (inputString: string) =>
    dispatch(setRecipesPageSearchInput(inputString));
  const savedScrollSize = useSelector(
    (state: IState) => state.recipesPage.scrollSize
  );
  const savedScrollDirection = useSelector(
    (state: IState) => state.recipesPage.scrollDirection
  );

  const [isLoading, setIsLoading] = useState(currentRecipesList.length === 0);
  const [scrollSize, setScrollSize] = useState(savedScrollSize);
  const [scrollDirection, setScrollDirection] = useState(savedScrollDirection);
  const [isShowPanel, setIsShowPanel] = useState(true);

  useEffect(() => {
    if (!user.email) {
      navigate(ROOT_ROUTE);
    }
  }, [navigate, user.email]);

  useEffect(() => {
    if (isLoading) {
      getAllRecipes().then((result) => {
        setIsLoading(false);
        dispatch(addRecipesToList(result));
      });
    }
  }, [dispatch, isLoading, navigate]);

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, savedScrollSize), 0);
  }, []);

  const handleCreateRecipe = () => {
    navigate(CREATE_RECIPE_ROUTE);
  };

  useEffect(() => {
    setIsShowPanel(() => scrollDirection === ScrollDirection.Down);

    addEventListener('scroll', () =>
      handleScrollDirection(scrollSize, setScrollDirection, setScrollSize)
    );

    return () => {
      dispatch(setRecipesPageScrollSize(scrollSize));
      dispatch(setRecipesPageScrollDirection(scrollDirection));
      removeEventListener('scroll', () =>
        handleScrollDirection(scrollSize, setScrollDirection, setScrollSize)
      );
    };
  }, [dispatch, scrollDirection, scrollSize]);

  return (
    <div className={css.recipesPageWrapper}>
      <div className={css.recipesPagePanelWrapper}>
        {isShowPanel && (
          <div className={css.manageUsersTitleWrapper}>
            <div className={css.recipesPageTitle}>Рецепты</div>
            <Button className={css.addUserButton} onClick={handleCreateRecipe}>
              <img
                className={css.headerLogo}
                src={Add}
                alt='Add Recipe Button'
                width={36}
              />
            </Button>
          </div>
        )}
        <Input
          value={searchInput}
          setChange={setSearchInput}
          type='search'
          placeholder={'Поиск'}
          labelClassName={css.recipesPageSearchLabel}
          inputClassName={css.recipesPageSearchInput}
        />
      </div>
      {isLoading ? (
        <Loader className={css.recipesPageLoader} />
      ) : (
        <RecipesBlock
          recipes={getSearch(currentRecipesList, searchInput)}
          isSearch={!!searchInput}
        />
      )}
    </div>
  );
};
