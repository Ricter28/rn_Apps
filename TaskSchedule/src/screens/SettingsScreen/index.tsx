import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState, useCallback, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

import styles from './styles';
import ButtonCustom from 'components/ButtonCustom';
import InputCustom from 'components/InputCustom';
import ImageLoading from 'components/ImageLoading';
import HideKeyboard from 'components/HideKeyboard';
import SelectModal from 'container/Settings/SelectModal';
import Images from 'common/Images';
import {isPhoneNumber} from 'utils/Validator';
import {selectUser, updateUserInfo, removeAllCategory} from 'slices';

const SettingsScreen = () => {
  // const dispatch = useDispatch();
  // const userReducer = useSelector(selectUser);
  // const {joinAt, userName, avatar} = userReducer;

  const selectModalRef = useRef<any>(null);

  // const [name, setName] = useState(userName);
  // const [error, setError] = useState('');
  // const [phone, setPhone] = useState('');
  // const [phoneError, setPhoneError] = useState('');
  // const [image, setImage] = useState<any>({});
  const [type, setType] = useState('');

  // const selectAvatar = async () => {
  //   const result = await launchImageLibrary({mediaType: 'photo'});
  //   if (result.assets && result.assets.length > 0) {
  //     setImage(result.assets[0]);
  //   }
  // };

  // const onFocusInput = useCallback(() => {
  //   setError('');
  // }, []);

  // const onFocusPhoneInput = useCallback(() => {
  //   setPhoneError('');
  // }, []);

  // const onSaveData = () => {
  //   if (name.length > 0) {
  //     if (phone.length > 0) {
  //       const resPhone = isPhoneNumber(phone);
  //       if (resPhone) {
  //         dispatch(
  //           updateUserInfo({
  //             userName: name,
  //             avatar: image?.uri ? image.uri : avatar,
  //             phone,
  //           }),
  //         );
  //         showMessage({
  //           message: 'Change Information success',
  //           type: 'success',
  //           duration: 1500,
  //         });
  //       } else {
  //         setPhoneError('Phone is not correct');
  //       }
  //     } else {
  //       dispatch(
  //         updateUserInfo({
  //           userName: name,
  //           avatar: image?.uri ? image.uri : avatar,
  //           phone: '',
  //         }),
  //       );
  //       showMessage({
  //         message: 'Change Information success',
  //         type: 'success',
  //         duration: 1500,
  //       });
  //     }
  //   } else {
  //     const resPhone = isPhoneNumber(phone);
  //     if (!resPhone) {
  //       setPhoneError('Phone is not correct');
  //     }
  //     setError('Please enter a name');
  //   }
  // };

  const deleteData = (value: string) => {
    setType(value);
    selectModalRef?.current?.setVisible(true);
  };

  // const renderAvatar = () => {
  //   if (image?.uri) {
  //     return (
  //       <ImageLoading
  //         resizeMode="cover"
  //         source={{uri: image.uri}}
  //         iconStyle={styles.avatar}
  //       />
  //     );
  //   } else if (userReducer?.avatar) {
  //     return (
  //       <ImageLoading
  //         resizeMode="cover"
  //         source={{uri: userReducer.avatar}}
  //         iconStyle={styles.avatar}
  //       />
  //     );
  //   } else {
  //     return (
  //       <ImageLoading
  //         resizeMode="cover"
  //         source={Images.defaultAvatar}
  //         iconStyle={styles.avatar}
  //       />
  //     );
  //   }
  // };
  // const joinAtApp = new Date(joinAt);

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.avatarHeader}
            onPress={selectAvatar}>
            {renderAvatar()}
            <View style={styles.cameraBtn}>
              <ImageLoading
                iconStyle={styles.cameraIc}
                source={Images.grayCamera}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.joinAtTxt}>
            Join at {joinAtApp.getFullYear()}/{joinAtApp.getMonth()}/
            {joinAtApp.getDate()}
          </Text>
        </View> */}

        <View style={styles.content}>
          {/* <InputCustom
            showIcon
            sourceIcon={Images.grayUser}
            iconStyle={styles.iconStyle}
            btnStyles={[styles.btnView, styles.icNormalView]}
            value={name}
            txtError={error}
            onChangeText={setName}
            onFocus={onFocusInput}
          />
          <InputCustom
            showIcon
            sourceIcon={Images.grayPhone}
            iconStyle={styles.iconStyle}
            btnStyles={[styles.btnView, styles.icNormalView]}
            keyboardType="decimal-pad"
            value={phone}
            txtError={phoneError}
            onChangeText={setPhone}
            onFocus={onFocusPhoneInput}
          /> */}
          <ButtonCustom
            txt="Delete all category"
            btnStyles={[styles.btnView, styles.normalView]}
            btnTxtStyles={[styles.btnTxt, styles.normalTxt]}
            onPress={() => deleteData('category')}
          />
          <ButtonCustom
            txt="Delete all task"
            btnStyles={[styles.btnView, styles.normalView]}
            btnTxtStyles={[styles.btnTxt, styles.normalTxt]}
            onPress={() => deleteData('task')}
          />
          {/* <ButtonCustom
            txt="Save"
            btnStyles={[styles.successView, styles.btnView]}
            btnTxtStyles={[styles.successTxt, styles.btnTxt]}
            onPress={onSaveData}
          /> */}
        </View>
        <SelectModal type={type} ref={selectModalRef} />
      </SafeAreaView>
    </HideKeyboard>
  );
};

export default SettingsScreen;
