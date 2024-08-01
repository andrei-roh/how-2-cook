import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IIngredient, IState } from 'src/types';
import { getAllIngredients } from 'src/utils/ingredients/getAllIngredients';
import {
  addIngredientsToList,
  setIngredientsPageSearchInput,
} from 'src/redux/actions';
import { Dispatch } from '@reduxjs/toolkit';
import css from './IngredientsPage.module.sass';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Telescope from 'src/assets/telescope.svg';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IngredientsBlock } from './components/IngredientsBlock/IngredientsBlock';
import { getSearch } from 'src/utils/getSearch';
import Add from 'src/assets/add.svg';
import Close from 'src/assets/close-square.svg';
import Button from '@mui/material/Button';
import Hat from 'src/assets/chef-hat.svg';
import { v4 as uuidv4 } from 'uuid';
import { createIngredient } from 'src/utils/ingredients/createIngredient';
import { getClassesList } from 'src/utils/getClassesList';
import { useCheckAuthentication } from 'src/hooks/useCheckAuthentication';

export const IngredientsPage = () => {
  const dispatch: Dispatch = useDispatch();

  const user = useSelector((state: IState) => state.user);
  const currentIngredientsList = useSelector(
    (state: IState) => state.ingredientsList
  );
  const searchInput = useSelector(
    (state: IState) => state.ingredientsPage.ingredientSearchInput
  );
  const createInputRef = useRef(null);

  const setSearchInput = (inputString: string) =>
    dispatch(setIngredientsPageSearchInput(inputString));

  const [isLoading, setIsLoading] = useState(
    currentIngredientsList.length === 0
  );
  const [isShowPanel, setIsShowPanel] = useState(false);
  const [newIngredientName, setIsNewIngredientName] = useState('');
  const ingredientsPageClassList = getClassesList(
    css.ingredientsPageWrapper,
    isShowPanel ? css.mover : undefined
  );

  const handleCreateIngredient = () => {
    const ingredientId = uuidv4();
    const newIngredient: IIngredient = {
      id: ingredientId,
      name: newIngredientName.toLowerCase(),
    };

    createIngredient(newIngredient).then((result) => {
      if (result) {
        dispatch(addIngredientsToList([newIngredient]));
        setIsNewIngredientName('');
        setIsShowPanel(false);
      }
    });
  };

  useCheckAuthentication(user);

  useEffect(() => {
    if (isLoading) {
      getAllIngredients().then((result) => {
        setIsLoading(false);
        dispatch(addIngredientsToList(result));
      });
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (isShowPanel && createInputRef.current) {
      (
        (createInputRef.current as HTMLElement)
          .getElementsByClassName('MuiInputBase-input')
          .item(0) as HTMLElement
      )?.focus();
    }
  }, [isShowPanel]);

  return (
    <Stack className={ingredientsPageClassList}>
      <Stack
        direction='column'
        useFlexGap
        className={css.ingredientsPagePanelWrapper}
      >
        <Stack
          direction='row'
          useFlexGap
          className={css.ingredientsPageTitleWrapper}
        >
          <Typography className={css.ingredientsPageTitle}>
            Ингредиенты
          </Typography>
          <img
            onClick={() => setIsShowPanel(!isShowPanel)}
            className={css.headerLogo}
            src={isShowPanel ? Close : Add}
            alt='Show Panel Button'
            width={36}
          />
        </Stack>
        {isShowPanel && (
          <TextField
            label='Создание ингредиента'
            fullWidth
            value={newIngredientName}
            onChange={(e) => setIsNewIngredientName(e.target.value)}
            className={css.creationPanel}
            ref={createInputRef}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <img src={Hat} alt='Hat' />
                </InputAdornment>
              ),
              endAdornment: (
                <Button
                  variant='contained'
                  className={css.creationButton}
                  onClick={handleCreateIngredient}
                  disabled={!newIngredientName}
                >
                  Создать
                </Button>
              ),
            }}
          />
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
        <IngredientsBlock
          ingredients={getSearch(currentIngredientsList, searchInput)}
          isSearch={!!searchInput}
        />
      )}
    </Stack>
  );
};
