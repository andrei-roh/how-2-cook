import { useCheckAuthentication } from 'src/hooks/useCheckAuthentication';
import css from './MyPlansPage.module.sass';
import { useSelector } from 'react-redux';
import { IState } from 'src/types';

export const MyPlansPage = () => {
  const user = useSelector((state: IState) => state.user);

  useCheckAuthentication(user);

  return (
    <div className={css.myPlansPageWrapper}>
      <div className={css.myPlansTitle}>Мои планы</div>
    </div>
  );
};
