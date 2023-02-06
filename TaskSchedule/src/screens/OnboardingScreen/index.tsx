import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

import styles from './styles';
import ButtonCustom from 'components/ButtonCustom';
import InputCustom from 'components/InputCustom';
import ImageLoading from 'components/ImageLoading';
import HideKeyboard from 'components/HideKeyboard';
import Images from 'common/Images';
import {setUserInfo} from 'slices';

const OnboardingScreen = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState<any>({});

  const selectAvatar = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  const onContinue = () => {
    if (name.length > 0) {
      if (image?.uri) {
        dispatch(
          setUserInfo({
            userName: name,
            avatar: image.uri,
            joinAt: new Date(),
          }),
        );
      } else {
        dispatch(
          setUserInfo({
            userName: name,
            avatar: '',
            joinAt: new Date(),
          }),
        );
      }
    } else {
      setError('Please enter a name');
    }
  };

  const onFocusInput = useCallback(() => {
    setError('');
  }, []);

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <View />

        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.avatarHeader}
              onPress={selectAvatar}>
              {image?.uri ? (
                <ImageLoading
                  resizeMode="cover"
                  iconStyle={styles.avatar}
                  source={{uri: image.uri}}
                />
              ) : (
                <ImageLoading
                  iconStyle={styles.avatar}
                  source={Images.defaultAvatar}
                />
              )}
              <View style={styles.cameraBtn}>
                <ImageLoading
                  iconStyle={styles.cameraIc}
                  source={Images.grayCamera}
                />
              </View>
            </TouchableOpacity>
          </View>
          <InputCustom
            showIcon
            sourceIcon={Images.grayUser}
            iconStyle={styles.iconStyle}
            btnStyles={[styles.btnView, styles.icNormalView]}
            value={name}
            txtError={error}
            onChangeText={setName}
            onFocus={onFocusInput}
          />
        </View>

        <ButtonCustom
          txt="Continue >"
          btnStyles={[styles.successView, styles.btnView]}
          btnTxtStyles={[styles.successTxt, styles.btnTxt]}
          onPress={onContinue}
        />
      </SafeAreaView>
    </HideKeyboard>
  );
};

export default OnboardingScreen;
