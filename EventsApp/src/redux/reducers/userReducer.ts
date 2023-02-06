const init = {
  user: {},
  listEvent: [],


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

    case "SET_LISTEVENT":
      return Object.assign({}, state, {
        listEvent: action.listEvent,
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
