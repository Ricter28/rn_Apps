let inititalState = {
  // change all variable show modal = one name
  nameUI: '',

  messageTitle: '',
  messageContent: '',
  funcMsg: () => {},

  // confirm box
  confirmTitle: '',
  confirmContent: '',
  onConfirmOk: () => {},
  onConfirmCancel: () => {},
  confirmCancelText: '',
  confirmOkText: '',
  centerButtonContent: '',
  centerButtonFunc: undefined,
  nameClose: '',
  imageConfirm: '',
};
const modalReducer = (state = inititalState, action: any) => {
  switch (action.type) {
    case 'SHOW_LOADING':
      return Object.assign({}, state, {nameUI: 'loading'});
    case 'SHOW_MESSAGE':
      return Object.assign({}, state, {
        nameUI: 'message',
        messageTitle: action.title,
        messageContent: action.content,
        funcMsg: action.funcMsg,
        nameClose: action.nameClose,
        imageMessage: action.imageMessage,
        lottieFile: action.lottieFile,
      });
    case 'HIDE_MODAL':
      return inititalState;
    case 'SHOW_CONFIRM':
      return Object.assign({}, state, {
        confirmTitle: action.title,
        confirmContent: action.content,
        onConfirmOk: action.onOk,
        onConfirmCancel: action.onCancer,
        confirmOkText: action.textOk,
        confirmCancelText: action.textCancer,
        imageConfirm: action.imageConfirm,
        nameUI: 'comfirmBox',
      });
    default:
      return state;
  }
};
export default modalReducer;
