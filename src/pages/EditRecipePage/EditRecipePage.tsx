import { useEffect, useState } from 'react';
import css from './EditRecipePage.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { DishType, IRecipe, IState, IValidationError } from 'src/types';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DISH_TYPE,
  EMPTY_RECIPE,
  RECIPES_ROUTE,
  ROOT_ROUTE,
} from 'src/constants';
import {
  Button,
  ImageLoader,
  Input,
  Loader,
  Select,
  TextArea,
} from 'src/components';
import { updateRecipesList } from 'src/redux/actions';
import { validateRecipeValues } from 'src/utils/validateRecipeValues';
import { editRecipe } from 'src/utils/editRecipe';

export const EditRecipePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: IState) => state.user);
  const { id: recipeId } = useParams();
  const recipesList = useSelector((state: IState) => state.recipesList);
  const imagesList = useSelector((state: IState) => state.imagesList);
  const shownRecipe =
    recipesList.find((recipe) => recipe.id === recipeId) || EMPTY_RECIPE;
  const { imageUrl, name, type, ingredients, description } = shownRecipe;
  const currentImageUrl = imagesList.find(
    (image) => image.id === imageUrl
  )?.value;
  const updatedRecipeIndex = recipesList.findIndex(
    (recipe) => recipe.id === recipeId
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validation, setValidation] = useState<IValidationError>({});

  const [image, setImage] = useState<File | null>(null);
  const [recipeName, setRecipeName] = useState(name);
  const [recipeType, setRecipeType] = useState<DishType>(type);
  const [recipeIngredients, setRecipeIngredients] = useState(ingredients);
  const [recipeDescription, setRecipeDescription] = useState(description);

  const isFieldsChanged =
    image !== null ||
    name !== recipeName ||
    recipeType !== type ||
    recipeIngredients !== ingredients ||
    recipeDescription !== description;

  const handleEditRecipe = () => {
    navigate(RECIPES_ROUTE);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setIsSubmitting(() => true);
    console.log(Object.keys(validation));

    if (Object.keys(validation).length === 0) {
      console.log(1);
      const currentDate = new Date().toString();
      const updatedFields: Partial<IRecipe> = {
        name: recipeName !== name ? recipeName : name,
        type: recipeType !== type ? recipeType : type,
        ingredients:
          recipeIngredients !== ingredients ? recipeIngredients : ingredients,
        description:
          recipeDescription !== description ? recipeDescription : description,
        imageUrl: image
          ? `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}/public/${recipeId}`
          : imageUrl,
        updatedAt: currentDate,
        updatedBy: user.email,
      };

      setIsEditing(() => true);

      editRecipe(recipeId as string, updatedFields).then((result) => {
        if (result) {
          const updatedRecipe: IRecipe = { ...shownRecipe, ...updatedFields };
          const updatedRecipesList: IRecipe[] = [...recipesList];
          updatedRecipesList[updatedRecipeIndex] = { ...updatedRecipe };

          dispatch(updateRecipesList([...updatedRecipesList]));
        }
        handleEditRecipe();
      });
    }
  };

  useEffect(() => {
    setValidation(
      validateRecipeValues({
        imageUrl,
        name: recipeName,
        type: recipeType as DishType,
        ingredients: recipeIngredients,
        description: recipeDescription,
      })
    );
  }, [
    navigate,
    recipeName,
    recipeType,
    recipeIngredients,
    recipeDescription,
    imageUrl,
  ]);

  useEffect(() => {
    if (!user.email) {
      navigate(ROOT_ROUTE);
    }
  }, [navigate, user.email]);

  return (
    <div className={css.editRecipePageWrapper}>
      <div className={css.editRecipeTitle}>Обновление Рецепта</div>
      <form className={css.editRecipeForm} onSubmit={handleSubmit}>
        <ImageLoader setImage={setImage} imagePreview={currentImageUrl} />
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
            onClick={handleEditRecipe}
            className={`${css.editRecipeButton} ${css.cancelButton}`}
          >
            Назад
          </Button>
          <Button
            className={`${css.editRecipeButton} ${css.submitButton}`}
            id='update-recipe-submit'
            disabled={!isFieldsChanged}
          >
            {isEditing ? (
              <Loader size={'12px'} className={css.editRecipeLoader} />
            ) : (
              'Обновить'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
