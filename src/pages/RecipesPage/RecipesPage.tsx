import { useEffect, useState } from 'react';
import css from './RecipesPage.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { IState, ScrollDirection } from 'src/types';
import { useNavigate } from 'react-router-dom';
import { CREATE_RECIPE_ROUTE, RECIPES_ROUTE } from 'src/constants';
import { RecipesBlock } from './components/RecipesBlock/RecipesBlock';
import { Dispatch } from '@reduxjs/toolkit';
import Add from 'src/assets/add.svg';
import { getSearch } from 'src/utils/getSearch';
import {
  addRecipesToList,
  setPreviousRoute,
  setRecipesPageScrollDirection,
  setRecipesPageScrollSize,
  setRecipesPageSearchInput,
} from 'src/redux/actions';
import { getAllRecipes } from 'src/utils/recipes/getAllRecipes';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Telescope from 'src/assets/telescope.svg';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCheckAuthentication } from 'src/hooks/useCheckAuthentication';

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

  useCheckAuthentication(user);

  useEffect(() => {
    if (isLoading) {
      getAllRecipes().then((result) => {
        setIsLoading(false);
        dispatch(addRecipesToList(result));
        dispatch(setPreviousRoute(RECIPES_ROUTE));
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
    <Stack className={css.recipesPageWrapper}>
      <Stack
        direction='column'
        useFlexGap
        className={css.recipesPagePanelWrapper}
      >
        {isShowPanel && (
          <Stack
            direction='row'
            useFlexGap
            className={css.recipesPageTitleWrapper}
          >
            <Typography className={css.recipesPageTitle}>Рецепты</Typography>
            <img
              onClick={handleCreateRecipe}
              className={css.headerLogo}
              src={Add}
              alt='Add Recipe Button'
              width={36}
            />
          </Stack>
        )}
        <TextField
          label='Поиск'
          fullWidth
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <img src={Telescope} alt='Telescope' />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      {isLoading ? (
        <CircularProgress className={css.loader} />
      ) : (
        <RecipesBlock
          recipes={getSearch(currentRecipesList, searchInput)}
          isSearch={!!searchInput}
        />
      )}
    </Stack>
  );
};
