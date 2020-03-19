import FullScreenContainer from '@jiaminghi/data-view-react/es/fullScreenContainer';
import React from 'react';
import FWatcher from './components/f-watcher';
import FKeyboard from './components/keyboard';
import styles from './index.less';

export default () => (
  <FullScreenContainer className={styles.elevator}>
    <div className={styles.elevator_flex}>
      <div className={styles.elevator_left}>
        <FWatcher />
      </div>
      <div className={styles.elevator_right}>
        <FKeyboard />
      </div>
    </div>
  </FullScreenContainer>
);
