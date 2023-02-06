import React, { useEffect } from 'react';
import {requestUserPermission, notificationListiner} from './src/utils/notificationServices';
import Router from './src/Router';

const App = () => {

  useEffect(()=>{
    requestUserPermission()
    notificationListiner()
  }, [])
  return <Router />;
};

export default App;
