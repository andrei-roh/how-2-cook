import {  describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Menu } from '../Menu';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { IAction, IUser } from 'src/types';
import { SET_USER } from 'src/redux/types';

const userMock = { email: 'Test@email.com' };
const navigateMock = vi.fn();
const stateMock = {
  user: userMock as IUser,
  loading: false,
  error: null,
};

const reducerMock = (( state = stateMock, action: IAction) => {
  if (action.type === SET_USER) {
    return {
      ...state,
      user: action.payload,
    };
  }

  return state;
})

const storeMock = configureStore({ reducer: reducerMock });

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useNavigate: () => ({ navigate: navigateMock }),
  };
});

describe('Testing: Menu', () => {
  it('should render', () => {
    const { container } = render(
      <Provider store={storeMock}>
        <Menu />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
