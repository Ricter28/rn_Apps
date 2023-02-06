import AsyncStorage from "@react-native-community/async-storage";
// import * as Keychain from "react-native-keychain";
import store from "../redux/store";
const userService = {
  setParner: (listPartner: any) => {
    store.dispatch({type: 'SET_PARTNER', listPartner});
  },
  setUser: (user: any) => {
    store.dispatch({type: 'SET_USER', user});
  },
  setListInvoice: (listInvoice: any) => {
    store.dispatch({type: 'SET_INVOICE', listInvoice});
  },
  setInvoiced: (invoiced: any) => {
    store.dispatch({type: 'SET_INVOICED', invoiced});
  },
};

export default userService;
