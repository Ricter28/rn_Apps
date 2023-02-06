import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import FlashMessage from 'react-native-flash-message';
import {PersistGate} from 'redux-persist/integration/react';

import AppNavigator from './navigation/index';
import store from 'slices/store';

let persistor = persistStore(store);

const Router = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{flex: 1}}>
          <AppNavigator />
          <FlashMessage position="top" floating={true} hideStatusBar={false} />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default Router;
