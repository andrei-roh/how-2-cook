import { useEffect, useState } from 'react';
import css from './CreateRecipePage.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { DishType, IRecipe, IState, IValidationError } from 'src/types';
import { useNavigate } from 'react-router-dom';
import { DISH_TYPE, RECIPES_ROUTE, ROOT_ROUTE } from 'src/constants';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  ImageLoader,
  Input,
  Loader,
  Select,
  TextArea,
} from 'src/components';
import { createRecipe } from 'src/utils/createRecipe';
import { addRecipesToList } from 'src/redux/actions';
import { validatRecipeValues } from 'src/utils/validateRecipeValues';

export const CreateRecipePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: IState) => state.user);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validation, setValidation] = useState<IValidationError>({});

  const [image, setImage] = useState<File | null>(null);
  const [recipeName, setRecipeName] = useState('');
  const [recipeType, setRecipeType] = useState<DishType | ''>('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');

  const handleCreateRecipe = () => {
    navigate(RECIPES_ROUTE);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setIsSubmitting(() => true);

    if (Object.keys(validation).length === 0) {
      const currentDate = new Date().toString();
      const recipeId = uuidv4();
      const newRecipe: IRecipe = {
        id: recipeId,
        imageUrl: `public/${recipeId}`,
        name: recipeName,
        type: recipeType as DishType,
        ingredients: recipeIngredients,
        description: recipeDescription,
        createdAt: currentDate,
        createdBy: user.email,
      };

      setIsCreating(() => true);

      createRecipe(newRecipe, image as File).then((result) => {
        if (result) {
          dispatch(addRecipesToList([newRecipe]));
        }
        handleCreateRecipe();
      });
    }
  };

  useEffect(() => {
    setValidation(
      validatRecipeValues({
        imageUrl: image ? image.name : '',
        name: recipeName,
        type: recipeType as DishType,
        ingredients: recipeIngredients,
        description: recipeDescription,
      })
    );
  }, [
    navigate,
    image,
    recipeName,
    recipeType,
    recipeIngredients,
    recipeDescription,
  ]);

  useEffect(() => {
    if (!user.email) {
      navigate(ROOT_ROUTE);
    }
  }, [navigate, user.email]);

  return (
    <div className={css.createRecipePageWrapper}>
      <div className={css.createRecipeTitle}>Создание Рецепта</div>
      <form className={css.createRecipeForm} onSubmit={handleSubmit}>
        <ImageLoader
          setImage={setImage}
          isValidationError={isSubmitting && !!validation.image}
          errorMessage={validation.image}
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
        <TextArea
          value={recipeIngredients}
          setChange={setRecipeIngredients}
          labelText={'Ингредиенты'}
          required
          labelClassName={css.createEventPadding}
          isValidationError={isSubmitting && !!validation.ingredients}
          errorMessage={validation.ingredients}
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
            onClick={handleCreateRecipe}
            className={`${css.createRecipeButton} ${css.cancelButton}`}
          >
            Назад
          </Button>
          <Button
            className={`${css.createRecipeButton} ${css.submitButton}`}
            id='create-recipe-submit'
          >
            {isCreating ? (
              <Loader size={'12px'} className={css.createRecipeLoader} />
            ) : (
              'Создать'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
