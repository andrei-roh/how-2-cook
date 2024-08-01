import css from './PlanCard.module.sass';
import { IPlanningList } from 'src/types';

interface PlanCardProps {
  plan: IPlanningList;
}

export const PlanCard = ({ plan }: PlanCardProps) => {
  return (
    <div className={css.planContainer}>
      <div>{plan.name}</div>
      <div>
        {plan.ingredientsList.map((ingredient) => (
          <div key={ingredient}>{ingredient}</div>
        ))}
      </div>
      <div>
        {plan.recipesList.map((recipe) => (
          <div key={recipe}>{recipe}</div>
        ))}
      </div>
    </div>
  );
};
