import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { IngredientsSelect } from '../IngredientsSelect';

const recipeIngredientsMock = ['00000000-0000-0000-0000-000000000001'];
const setRecipeIngredientsMock = vi.fn();
const allIngredientsMock = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Ingredient 1',
  },
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Ingredient 2',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Ingredient 3',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Ingredient 4',
  },
];
const handleGetRecipesByIngredientMock = vi.fn();
const planningIngredientsMock = [
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003',
];

describe('Testing: IngredientsSelect', () => {
  it('should render', () => {
    const { container } = render(
      <IngredientsSelect
        recipeIngredients={recipeIngredientsMock}
        setRecipeIngredients={setRecipeIngredientsMock}
        allIngredients={allIngredientsMock}
        handleGetRecipesByIngredient={handleGetRecipesByIngredientMock}
        isPlanning={false}
        planningIngredients={planningIngredientsMock}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
