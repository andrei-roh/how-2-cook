import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { DishType, IRecipe, IUser } from 'src/types';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { RecipeCard } from '../RecipeCard';

const navigateMock = vi.fn();
const dispatchMock = vi.fn();
const userMock = { email: 'Test@email.com' };
const imagesListMock = [
  {
    id: 'test_image_src_1',
    value: 'test/image/src/1',
  },
];
const recipeMock: IRecipe = {
  id: '00000000-0000-0000-0000-000000000001',
  imageUrl: 'test_image_src_1',
  name: 'Test Recipe 1',
  type: DishType.Fish,
  ingredients: 'Test Ingredients 1',
  description: 'Test Description 1',
};

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

describe('Testing: RecipeCard', () => {
  it('should render', () => {
    const { container } = render(
      <Provider store={storeMock}>
        <RecipeCard {...recipeMock} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
