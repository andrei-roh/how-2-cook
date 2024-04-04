import { getClassesList } from 'src/utils/getClassesList';
import css from './Loader.module.sass';

interface LoaderProps {
    size?: string;
    className?: string;
}

export const Loader = ({ size, className }: LoaderProps) => {
  const loaderClasses = getClassesList(css.loaderWrapper, className);

  return <div className={loaderClasses} style={{ width: size, height: size }}></div>;
};
