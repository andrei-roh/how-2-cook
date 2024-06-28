import { useEffect, useState } from 'react';
import css from './CreateRecipePage.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import {
  DishType,
  ICurrentRecipe,
  IRecipe,
  IState,
  IValidationError,
} from 'src/types';
import { useNavigate } from 'react-router-dom';
import {
  CURRENT_RECIPE,
  DISH_TYPE,
  RECIPES_ROUTE,
  ROOT_ROUTE,
} from 'src/constants';
import { v4 as uuidv4 } from 'uuid';
import { ImageLoader, Input, Select, TextArea } from 'src/components';
import { createRecipe } from 'src/utils/createRecipe';
import { addIngredientsToList, addRecipesToList } from 'src/redux/actions';
import { validateRecipeValues } from 'src/utils/validateRecipeValues';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getAllIngredients } from 'src/utils/getAllIngredients';
import { getIngredientsToSelect } from 'src/utils/getIngredientsToSelect';

export const CreateRecipePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: IState) => state.user);
  const allIngredients = useSelector((state: IState) => state.ingredientsList);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validation, setValidation] = useState<IValidationError>({});

  const [image, setImage] = useState<File | null>(null);
  const [recipeName, setRecipeName] = useState('');
  const [recipeType, setRecipeType] = useState<DishType | ''>('');
  const [isVegan, setIsVegan] = useState(false);
  const [recipeIngredients, setRecipeIngredients] = useState<string[] | []>([]);
  const [recipeComposition, setRecipeComposition] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');

  const handleCreateRecipe = () => {
    navigate(RECIPES_ROUTE);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsVegan(event.target.checked);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setIsSubmitting(() => true);

    if (Object.keys(validation).length === 0) {
      const currentDate = new Date().toString();
      const recipeId = uuidv4();
      const newRecipe: IRecipe = {
        id: recipeId,
        imageUrl: `${
          import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
        }/public/${recipeId}`,
        name: recipeName,
        type: recipeType as DishType,
        isVegan,
        ingredients: recipeIngredients,
        description: recipeDescription,
        composition: recipeComposition,
        createdAt: currentDate,
        createdBy: user.email,
      };

      setIsCreating(() => true);

      createRecipe(newRecipe, image as File).then((result) => {
        if (result) {
          dispatch(addRecipesToList([newRecipe]));
        }
        sessionStorage.removeItem(CURRENT_RECIPE);
        handleCreateRecipe();
      });
    }
  };

  useEffect(() => {
    setValidation(
      validateRecipeValues({
        imageUrl: image ? image.name : '',
        name: recipeName,
        type: recipeType as DishType,
        ingredients: recipeIngredients.join(''),
        description: recipeDescription,
      })
    );
  }, [
    navigate,
    image,
    recipeName,
    recipeType,
    recipeComposition,
    recipeDescription,
    recipeIngredients,
  ]);

  useEffect(() => {
    if (!user.email) {
      navigate(ROOT_ROUTE);
    }
  }, [navigate, user.email]);

  useEffect(() => {
    const currentRecipe = sessionStorage.getItem(CURRENT_RECIPE);

    if (currentRecipe) {
      const recipe = JSON.parse(currentRecipe) as ICurrentRecipe;

      setRecipeName(recipe.name || '');
      setRecipeType(recipe.type || '');
      setIsVegan(recipe.isVegan || false);
      setRecipeIngredients(recipe.ingredients || []);
      setRecipeComposition(recipe.composition || '');
      setRecipeDescription(recipe.description || '');
    }

    if (allIngredients.length === 0) {
      getAllIngredients().then((result) => {
        dispatch(addIngredientsToList(result));
      });
    }
  }, []);

  useEffect(() => {
    if (
      recipeName ||
      recipeType ||
      isVegan ||
      recipeComposition ||
      recipeDescription
    ) {
      sessionStorage.setItem(
        CURRENT_RECIPE,
        JSON.stringify({
          name: recipeName,
          type: recipeType as DishType,
          isVegan,
          ingredients: recipeComposition,
          description: recipeDescription,
        })
      );
    }
  }, [isVegan, recipeDescription, recipeComposition, recipeName, recipeType]);

  return (
    <div className={css.createRecipePageWrapper}>
      <div className={css.createRecipeTitle}>Создание Рецепта</div>
      <form className={css.createRecipeForm} onSubmit={handleSubmit}>
        <ImageLoader
          setImage={setImage}
          isValidationError={isSubmitting && !!validation.imageUrl}
          errorMessage={validation.imageUrl}
        />
        <Input
          value={recipeName}
          setChange={setRecipeName}
          labelText={'Название'}
          required
          labelClassName={css.createEventPadding}
          isValidationError={isSubmitting && !!validation.name}
          errorMessage={validation.name}
        />
        <Select
          value={recipeType}
          setChange={setRecipeType}
          options={DISH_TYPE}
          labelText={'Тип'}
          required
          placeholder={'Выбор'}
          selectClassName={!recipeType ? css.selectPlaceholder : undefined}
          isValidationError={isSubmitting && !!validation.type}
          errorMessage={validation.type}
        />
        <FormControlLabel
          control={<Switch checked={isVegan} onChange={handleCheckboxChange} />}
          label='Вегетарианское блюдо'
          className={css.checkboxLabel}
          labelPlacement='top'
        />
        <Select
          value={recipeIngredients}
          setChange={setRecipeIngredients}
          options={getIngredientsToSelect(allIngredients)}
          labelText={'Ингредиенты'}
          multiple
          required
          placeholder={'Выбор'}
          selectClassName={!recipeType ? css.selectPlaceholder : undefined}
          isValidationError={isSubmitting && !!validation.ingredients}
          errorMessage={validation.ingredients}
        />
        <TextArea
          value={recipeComposition}
          setChange={setRecipeComposition}
          labelText={'Состав'}
          labelClassName={css.createEventPadding}
        />
        <TextArea
          value={recipeDescription}
          setChange={setRecipeDescription}
          labelText={'Описание'}
          required
          labelClassName={css.createEventPadding}
          isValidationError={isSubmitting && !!validation.description}
          errorMessage={validation.description}
        />
        <div className={css.buttonsPanel}>
          <Button
            variant='outlined'
            onClick={handleCreateRecipe}
            className={`${css.createRecipeButton} ${css.cancelButton}`}
          >
            Назад
          </Button>
          <Button
            className={`${css.createRecipeButton} ${css.submitButton}`}
            type='submit'
            id='create-recipe-submit'
          >
            {isCreating ? (
              <CircularProgress color='inherit' size={32} />
            ) : (
              'Создать'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
