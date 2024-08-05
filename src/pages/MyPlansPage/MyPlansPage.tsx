import { useCheckAuthentication } from 'src/hooks/useCheckAuthentication';
import css from './MyPlansPage.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from 'src/types';
import { getUserPlanningLists } from 'src/utils/planning/getUserPlanningLists';
import { useEffect, useState } from 'react';
import {
  setMyPlansPageSearchInput,
  setPreviousRoute,
  setUserPlanningLists,
} from 'src/redux/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { PlansBlock } from './components/PlansBlock/PlanBlock';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Telescope from 'src/assets/telescope.svg';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getSearch } from 'src/utils/getSearch';
import { MY_PLANS } from 'src/constants';

export const MyPlansPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: IState) => state.user);
  const userPlans = useSelector(
    (state: IState) => state.myPlansPage.planningLists
  );

  const [isLoading, setIsLoading] = useState(userPlans.length === 0);
  const searchInput = useSelector(
    (state: IState) => state.myPlansPage.userPlanSearchInput
  );
  const setSearchInput = (inputString: string) =>
    dispatch(setMyPlansPageSearchInput(inputString));

  useCheckAuthentication(user);

  useEffect(() => {
    if (isLoading) {
      getUserPlanningLists(user.email).then((result) => {
        const plansLists = Object.values(result);

        setIsLoading(false);
        dispatch(setUserPlanningLists(plansLists));
        dispatch(setPreviousRoute(MY_PLANS));
      });
    }
  }, [dispatch, isLoading, user.email]);

  return (
    <Stack className={css.myPlansPageWrapper}>
      <Stack
        direction='column'
        useFlexGap
        className={css.myPlansPagePanelWrapper}
      >
        <Typography className={css.myPlansTitle}>Мои планы</Typography>
        <TextField
          label='Поиск'
          fullWidth
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <img src={Telescope} alt='Telescope' />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      {isLoading ? (
        <CircularProgress className={css.loader} />
      ) : (
        <PlansBlock
          plans={getSearch(
            userPlans,
            searchInput
          )}
          isSearch={!!searchInput}
        />
      )}
    </Stack>
  );
};
