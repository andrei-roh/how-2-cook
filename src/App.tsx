import { Outlet } from 'react-router-dom';
import css from './App.module.sass';
import { Header, Notification } from './components';

const App = () => {
  return (
    <>
      <Header />
      <div className={css.app}>
        <Outlet />
      </div>
      <Notification />
    </>
  );
};

export default App;
