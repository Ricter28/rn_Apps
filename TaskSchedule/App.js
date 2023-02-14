import React, {useEffect} from 'react';

import Router from './src/Router';
import {
  requestUserPermission,
  notificationListiner,
} from './src/utils/NotificationServices';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListiner();
  }, []);
  return <Router />;
};

export default App;
