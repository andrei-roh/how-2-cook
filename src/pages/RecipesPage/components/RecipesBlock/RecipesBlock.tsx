import css from './RecipesBlock.module.sass';
import { IRecipe } from 'src/types';
import Fridge from 'src/assets/hand-drawn-food.svg';
import Pancakes from 'src/assets/pancakes.svg';
import { RecipeCard } from '../RecipeCard/RecipeCard';

interface RecipesBlockProps {
  recipes: IRecipe[];
  isSearch: boolean;
}

export const RecipesBlock = ({ recipes, isSearch }: RecipesBlockProps) => {
  if (recipes.length === 0) {
    return (
      <div className={css.recipesServiceWrapper}>
        {isSearch ? (
          <>
            <img className={css.recipesBlockLogo} src={Pancakes} />
            <div className={css.emptyMessage}>Рецепты не найдены</div>
          </>
        ) : (
          <>
            <img className={css.recipesBlockLogo} src={Fridge} />
            <div className={css.emptyMessage}>Рецепты отсутствуют</div>
            <div className={css.emptyMessage}>Добавьте первый рецепт</div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={css.recipesBlockWrapper}>
      {recipes.map((user) => (
        <RecipeCard key={user.id} {...user} />
      ))}
    </div>
  );
};
