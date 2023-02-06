import store from '../redux/store';
interface Message {
  content?: string | any;
  title?: string;
  callBack?: () => {};
  nameClose?: string;
}
const modal = {
  showLoading: () => {
    store.dispatch({type: 'SHOW_LOADING'});
  },
  showMessage: (data: Message) => {
    store.dispatch({
      type: 'SHOW_MESSAGE',
      content: data.content,
      title: data.title,
      funcMsg: data.callBack,
      nameClose: data.nameClose,
    });
  },
  showComfirm: ({
    title = '',
    content = '',
    textOk = '',
    textCancer = '',
    onOk = () => {},
    onCancer = () => {},
    
    imageConfirm = '',
  }) => {
    store.dispatch({
      type: 'SHOW_CONFIRM',
      title,
      content,
      textOk,
      textCancer,
      onOk,
      onCancer,
      imageConfirm,
    });
  },
  hide: () => {
    store.dispatch({type: 'HIDE_MODAL'});
  },
};
export default modal;
