import { DEFAULT_NOTIFICATION } from 'src/constants';
import css from './Notification.module.sass';
import { hideElement } from 'src/utils/hideElement';
import Alert from '@mui/material/Alert';
import { Severity } from 'src/types';
import { useEffect, useState } from 'react';

export const Notification = () => {
  const notification = document.getElementById('notification');
  const [severity, setSeverity] = useState(Severity.Info);

  const handleHideNotification = () => {
    if (notification) {
      hideElement(notification);
    }
  };

  useEffect(() => {
    if (notification?.dataset.severity) {
      setSeverity(notification.dataset.severity as Severity);
    }
  }, [notification?.dataset.severity, severity]);

  return (
    <Alert
      id='notification'
      data-testid='notification-test-id'
      className={css.notificationWrapper}
      severity={severity}
      onClick={handleHideNotification}
    >
      {DEFAULT_NOTIFICATION}
    </Alert>
  );
};
