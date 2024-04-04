import { useSelector } from 'react-redux';
import css from './Header.module.sass';
import { IState } from 'src/types';

export const Header = () => {
  const user = useSelector((state: IState) => state.user);

  return (
    <div className={css.headerWrapper}>
      <div className={css.userEmail}>
        {user.email || ''}
      </div>
    </div>
  );
};
