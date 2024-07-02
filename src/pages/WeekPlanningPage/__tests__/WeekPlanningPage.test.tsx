import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { DishType, IRecipe, IUser } from 'src/types';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { WeekPlanningPage } from '../WeekPlanningPage';

const navigateMock = vi.fn();
const dispatchMock = vi.fn();
const userMock = { email: 'Test@email.com' };
const imagesListMock = [
  {
    id: 'test_image_src_1',
    value: 'test/image/src/1',
  },
  {
    id: 'test_image_src_2',
    value: 'test/image/src/2',
  },
  {
    id: 'test_image_src_3',
    value: 'test/image/src/3',
  },
];
const recipesListMock: IRecipe[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    imageUrl: 'test_image_src_1',
    name: 'Test Recipe 1',
    type: DishType.Main,
    ingredients: [],
    composition: 'Test Ingredients 1',
    description: 'Test Description 1',
    isVegan: false,
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    imageUrl: 'test_image_src_2',
    name: 'Test Recipe 2',
    type: DishType.Soup,
    ingredients: [],
    composition: 'Test Ingredients 2',
    description: 'Test Description 2',
    isVegan: false,
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    imageUrl: 'test_image_src_3',
    name: 'Test Recipe 3',
    type: DishType.Salat,
    ingredients: [],
    composition: 'Test Ingredients 3',
    description: 'Test Description 3',
    isVegan: true,
  },
];
const allIngredientsMock = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Ingredient 1'
  }
]

const stateMock = {
  user: userMock as IUser,
  loading: false,
  error: null,
  imagesList: imagesListMock,
  recipesList: recipesListMock,
  ingredientsList: allIngredientsMock,
  planningPage: {
    ingredientsList: [],
    recipesList: [],
  }
};

const reducerMock = (state = stateMock) => {
  return state;
};

const storeMock = configureStore({ reducer: reducerMock });

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => ({ navigate: navigateMock }),
  };
});

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');

  return {
    ...actual,
    useDispatch: () => ({ dispatch: dispatchMock }),
  };
});

describe('Testing: WeekPlanningPage', () => {
  it('should render', () => {
    const { container } = render(
      <Provider store={storeMock}>
        <WeekPlanningPage />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
