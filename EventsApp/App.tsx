import React, { useEffect } from "react";
import { View, StyleSheet, StatusBar, ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import store, { persistor } from "./src/redux/store";
import Modals from "./src/modals";
import codePush from "react-native-code-push";
import user from "./src/services/userService";
import SplashScreen from "react-native-splash-screen";
import AppContainer from "./src/navigation/AppContainer";
import Toast from "react-native-toast-message";
// import helpers from "core_loyalty_mobile/global/helpers";
import { PersistGate } from "redux-persist/integration/react";
import colors from "contant/colors";
import {
  notificationListiner,
  requestUserPermission,
} from "services/notificationService";

const App = (props: any) => {
  React.useEffect(() => {
    SplashScreen.hide();
    requestUserPermission();
    notificationListiner();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Provider store={store}>
        <PersistGate
          loading={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <ActivityIndicator size="large" color={colors.PRIMARY} />
            </View>
          }
          persistor={persistor}
        >
          <View style={styles.container}>
            <AppContainer />
            <Modals />
          </View>
        </PersistGate>
      </Provider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};
export default codePush(App);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
