import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { RecipesBlock } from '../RecipesBlock';
import { DishType, IRecipe, IUser } from 'src/types';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

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
const recipesMock: IRecipe[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    imageUrl: 'test_image_src_1',
    name: 'Test Recipe 1',
    type: DishType.Fish,
    ingredients: 'Test Ingredients 1',
    description: 'Test Description 1',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    imageUrl: 'test_image_src_2',
    name: 'Test Recipe 2',
    type: DishType.Meat,
    ingredients: 'Test Ingredients 2',
    description: 'Test Description 2',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    imageUrl: 'test_image_src_3',
    name: 'Test Recipe 3',
    type: DishType.Vegan,
    ingredients: 'Test Ingredients 3',
    description: 'Test Description 3',
  },
];

const stateMock = {
  user: userMock as IUser,
  loading: false,
  error: null,
  imagesList: imagesListMock,
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

vi.mock('src/utils/getRecipeImage');

describe('Testing: RecipesBlock', () => {
  it('should render', () => {
    const { container } = render(
      <Provider store={storeMock}>
        <RecipesBlock recipes={recipesMock} isSearch={false} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render if there are no recipes', () => {
    const { container } = render(
      <Provider store={storeMock}>
        <RecipesBlock recipes={[]} isSearch={false} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render if have not found recipe', () => {
    const { container } = render(
      <Provider store={storeMock}>
        <RecipesBlock recipes={[]} isSearch={true} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
