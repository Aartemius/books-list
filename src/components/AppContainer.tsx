import { ReactNode } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './AppContainer.module.scss';

const AppContainer = ({ children }: { children?: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={ styles.appContainer }>
      <div className={ styles.topBar }>
        { currentPath === '/' && <p>Books Read This Month</p> }
        { currentPath.includes('/book') && 
          <img src="/images/icons/backArrow.svg" alt="" onClick={ () => navigate(-1) } />
        }
      </div>
      <div className={ styles.contentContainer }>
        { children }
      </div>
    </div>
  );
};

export default AppContainer; 