interface data {}
const init = {
  refresh: {},
};
const screenReducer = (state = init, action: any) => {
  switch (action.type) {
    case "REFRESH_SCREEN":
      return {
        ...state,
        refresh: {
          ...state.refresh,
          [action.nameScreen]: !state.refresh[action.nameScreen],
        },
      };
    default:
      return state;
  }
};
export default screenReducer;
