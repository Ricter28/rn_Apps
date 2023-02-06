import Text from "components/native/Text";
import Box from "components/others/Box";
import Icon from "components/others/Icon";
import colors from "contant/colors";
import config from "contant/config";
import layout from "contant/layout";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Modal from "react-native-modal";
import { formatMoney } from "utils/format";
interface ModalSaleProps {
  title?: string;
  onClose?: () => void;
  onFinish?: () => void;
}
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const ModalPrice = forwardRef((props: ModalSaleProps, ref) => {
  const { title = "Nhập giá" } = props;
  const scrollViewRef = useRef<any>(null);
  const priceRef = useRef<any>(null);
  const [price, setPrice] = useState<any>("");
  const [scrollOffset, setScrollOffset] = useState(undefined);
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const showModal = () => setModal(true);
  useImperativeHandle(ref, () => ({ closeModal, showModal }));
  const handleScrollTo = (p: any) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };
  const handleOnScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const onNumber = (number: any) => {
    priceRef.current.focus();
    if (!price && (number == "0" || number == "000")) return;
    let clearDot = price.replace(/\./g, "");
    let money = formatMoney(clearDot + number, "");
    setPrice(money);
  };
  const clearOne = () => {
    let clearDot = price.replace(/\./g, "");
    let remove = clearDot.substring(0, clearDot.length - 1);
    let money = formatMoney(remove, "");
    setPrice(money);
  };
  useEffect(() => {
    if (modal) {
      priceRef &&
        priceRef?.current.setNativeProps({
          style: {
            fontFamily: config.FONT,
          },
        });
      priceRef?.current.focus();
    }
  }, [modal]);
  return (
    <Modal
      useNativeDriver
      isVisible={modal}
      onBackdropPress={closeModal}
      onSwipeComplete={closeModal}
      swipeDirection="down"
      propagateSwipe={true}
      style={styles.modal}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={layout.heightScreen - layout.heightScreen * 0.7}
    >
      <View style={styles.wrapModal}>
        <StatusBar translucent backgroundColor="rgba(1,1,1,0.7)" />
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
        >
          <Box row alignItems="center" style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.btClose} onPress={closeModal}>
              <Icon type="AntDesign" name="close" color="black" size={18} />
            </TouchableOpacity>
          </Box>
          <TextInput
            style={styles.inputPrice}
            placeholder="Giá sản phẩm (VNĐ)"
            showSoftInputOnFocus={false}
            contextMenuHidden
            value={price}
            allowFontScaling={false}
            ref={priceRef}
          />

          <View style={styles.wrapKeybroadView}>
            <View style={styles.wrapNumber}>
              {data.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.btNumber}
                  onPress={() => onNumber(item)}
                  activeOpacity={1}
                >
                  <Text fontSize={28}>{item}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.btNumber}
                onPress={() => onNumber("0")}
                activeOpacity={1}
              >
                <Text fontSize={28}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btNumber,
                  {
                    width: "66.66%",
                    aspectRatio: 6 / 2.5,
                  },
                ]}
                onPress={() => onNumber("000")}
              >
                <Text fontSize={28}>000</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: 80, height: "100%" }}>
              <TouchableOpacity
                style={styles.btClear}
                onPress={clearOne}
                onLongPress={() => setPrice("")}
                activeOpacity={1}
              >
                <Icon
                  type="Feather"
                  name="delete"
                  size={28}
                  style={{
                    position: "absolute",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btAdd}
                onPress={closeModal}
                onLongPress={() => setPrice("")}
                activeOpacity={1}
              >
                <Text
                  color="#fff"
                  fontSize={18}
                  bold
                  style={{
                    position: "absolute",
                  }}
                >
                  Thêm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
});

export default ModalPrice;

const styles = StyleSheet.create({
  container: {},

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  wrapModal: {
    width: layout.width,
    height: layout.heightScreen * 0.7,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#fff",
  },
  header: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderColor: colors.BODER,
  },
  title: {
    flex: 1,
    textAlign: "center",
    paddingLeft: 50,
    fontSize: 15,
  },
  btClose: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btClear: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btAdd: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.PRIMARY,
  },
  inputPrice: {
    marginTop: 20,
    height: 55,
    borderRadius: 5,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    textAlign: "center",
    fontSize: 28,
  },
  inputDescription: {
    marginTop: 20,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    borderColor: "#E0E0E0",
  },

  wrapKeybroadView: {
    flexDirection: "row",
    marginTop: 12,
    borderTopWidth: 1,
    borderColor: colors.BODER,
  },
  btOk: {
    width: 130,
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.PRIMARY,
  },
  btCancel: {
    width: 130,
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BCBCBC",
  },
  wrapButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: getBottomSpace() || 20,
    justifyContent: "center",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  wrapNumber: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
  btNumber: {
    width: "33.33%",
    aspectRatio: 3 / 2.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.BODER,
    justifyContent: "center",
    alignItems: "center",
  },
});
