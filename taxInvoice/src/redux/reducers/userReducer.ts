const init = {
  user: {},
  listPartner: [],
  listInvoice: [],
  invoiced: [],
};
const userReducer = (state = init, action: any) => {
  switch (action.type) {

    case "SET_PARTNER":
      return Object.assign({}, state, {
        listPartner: action.listPartner,
      });

    case "SET_USER":
      return Object.assign({}, state, {
        user: action.user,
      });

    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.user } };

    case "SET_INVOICE":
      return Object.assign({}, state, {
        listInvoice: action.listInvoice,
      });
    case "SET_INVOICED":
      return Object.assign({}, state, {
        invoiced: action.invoiced,
      });

    case "REFRESH_SCREEN":
      return {
        ...state,
        refresh: {
          ...state?.refresh,
          [action.name]: !state.refresh?.[action.name],
        },
      };
      
    case "LOGOUT":
      return init;
    default:
      return state;
  }
};
export default userReducer;
