import css from './PlansBlock.module.sass';
import { IPlanningList } from 'src/types';
import Fridge from 'src/assets/hand-drawn-food.svg';
import Pancakes from 'src/assets/pancakes.svg';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { PlanCard } from '../PlanCard/PlanCard';

interface PlansBlockProps {
  plans: IPlanningList[];
  isSearch: boolean;
}

export const PlansBlock = ({ plans, isSearch }: PlansBlockProps) => {
  if (plans.length === 0) {
    return (
      <Stack
        direction='column'
        useFlexGap
        spacing={2}
        className={css.plansServiceWrapper}
      >
        {isSearch ? (
          <>
            <img className={css.plansBlockLogo} src={Pancakes} />
            <Typography className={css.emptyMessage}>
              Планы не найдены
            </Typography>
          </>
        ) : (
          <>
            <img className={css.plansBlockLogo} src={Fridge} />
            <Typography className={css.emptyMessage}>
              Добавьте собственный план
            </Typography>
          </>
        )}
      </Stack>
    );
  }

  return (
    <Stack
      direction='column'
      useFlexGap
      spacing={2}
      className={css.plansBlockWrapper}
    >
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </Stack>
  );
};
