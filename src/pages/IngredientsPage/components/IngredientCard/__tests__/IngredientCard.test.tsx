import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { IIngredient, IUser } from 'src/types';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { IngredientCard } from '../IngredientCard';

const navigateMock = vi.fn();
const dispatchMock = vi.fn();
const userMock = { email: 'Test@email.com' };
const recipesMock: IIngredient = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'Test Ingredient 1',
};

const stateMock = {
  user: userMock as IUser,
  loading: false,
  error: null,
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

describe('Testing: IngredientCard', () => {
  it('should render', () => {
    const { container } = render(
      <Provider store={storeMock}>
        <IngredientCard ingredient={recipesMock} />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
