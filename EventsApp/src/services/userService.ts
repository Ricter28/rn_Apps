import AsyncStorage from "@react-native-community/async-storage";
// import * as Keychain from "react-native-keychain";
import store from "../redux/store";
const userService = {
  setListEvent: (listEvent: any) => {
    store.dispatch({type: 'SET_LISTEVENT', listEvent});
  },
  setUser: (user: any) => {
    store.dispatch({type: 'SET_USER', user});
  },


};

export default userService;
