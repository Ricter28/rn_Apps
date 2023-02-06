import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import Icon from "./Icon";

const CartBadge = (props: any) => {
  const navigation = useNavigation();
  const orders = useSelector((state: any) => state.cartReducer.orders);
  var count = 0;
  for (var property in orders) {
    count += Object.values(orders[property]).length;
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Cart")}
    >
      {count ? (
        <View style={styles.wrapNumber}>
          <Text style={styles.number}>{count}</Text>
        </View>
      ) : null}
      <Icon type="Ionicons" name="cart-outline" color="#fff" size={24} />
    </TouchableOpacity>
  );
};

export default CartBadge;

const styles = StyleSheet.create({
  container: {
    paddingRight: 18,
  },
  wrapNumber: {
    width: 21,
    height: 21,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -8,
    right: 4,
  },
  number: {
    color: "red",
    fontSize: 12,
  },
});
