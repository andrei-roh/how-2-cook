import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { PlanCreationPanel } from '../PlanCreationPanel';

const planNameMock = 'Test Plan';
const setPlanNameMock = vi.fn();
const handleCreatePlanMock = vi.fn();
const startCreationPlanningListMock = vi.fn();

describe('Testing: PlanCreationPanel', () => {
  it('should render when isStartCreation is true', () => {
    const { container } = render(
      <PlanCreationPanel
        isStartCreation={true}
        isAllocatedRecipes={true}
        planName={planNameMock}
        setPlanName={setPlanNameMock}
        handleCreatePlan={handleCreatePlanMock}
        startCreationPlanningList={startCreationPlanningListMock}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render when isStartCreation is false', () => {
    const { container } = render(
      <PlanCreationPanel
        isStartCreation={false}
        isAllocatedRecipes={true}
        planName={planNameMock}
        setPlanName={setPlanNameMock}
        handleCreatePlan={handleCreatePlanMock}
        startCreationPlanningList={startCreationPlanningListMock}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
