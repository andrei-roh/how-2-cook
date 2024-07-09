import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import css from './PlanCreationPanel.module.sass';

interface PlanCreationPanelProps {
  isStartCreation: boolean;
  isAllocatedRecipes: boolean;
  planName: string;
  setPlanName: React.Dispatch<React.SetStateAction<string>>;
  handleCreatePlan: () => void;
  startCreationPlanningList: () => void;
}

export const PlanCreationPanel = ({
  isStartCreation,
  isAllocatedRecipes,
  planName,
  setPlanName,
  handleCreatePlan,
  startCreationPlanningList,
}: PlanCreationPanelProps) => {
  return isStartCreation ? (
    <TextField
      label='Создание плана'
      fullWidth
      value={planName}
      onChange={({ target: { value } }) => setPlanName(value)}
      className={css.creationPanel}
      InputProps={{
        endAdornment: (
          <Button
            variant='contained'
            className={css.creationButton}
            onClick={handleCreatePlan}
            disabled={!planName || !isAllocatedRecipes}
          >
            Создать
          </Button>
        ),
      }}
    />
  ) : (
    <Button
      className={css.createPlanButton}
      onClick={startCreationPlanningList}
    >
      Создать список рецептов
    </Button>
  );
};
