import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import Button from "../../../components/Button";
import SideModalHeader from "../../../components/SideModalHeader";
import { Colors } from "../../../constants/pallete";
import { ROUTE_PATHS } from "../../../constants/routes";
import useMainColors from "../../../hooks/useMainColors";
import { CartProduct } from "../../../slicer/cart/cart.types";
import { State } from "../../../slicer/types";
import CartProductItem from "./CartProduct";

const Cart = () => {
  const { backgroundColor, textColor } = useMainColors();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const cartProducts = useSelector<State, CartProduct[]>(
    (state) => state.cart.cartItems
  );

  const calculateTotalValue = () => {
    return cartProducts
      .reduce((total, product) => {
        const productValue =
          product.product.price *
          (1 - (product?.product?.discount || 0) / 100) *
          product.value;
        return total + productValue;
      }, 0)
      .toFixed(2);
  };

  const renderFooter = () => (
    <View style={{ marginVertical: 20, rowGap: 30, marginBottom: 300 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            textTransform: "uppercase",
            textDecorationLine: "underline",
            color: Colors.tealc,
            fontSize: 20,
          }}
        >
          Total
        </Text>
        <Text style={{ fontSize: 20, color: textColor }}>
          {" "}
          €{calculateTotalValue()}
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Button
          label="Continuar Compra"
          fullwidth
          //@ts-ignore
          onClick={() => navigation.navigate(ROUTE_PATHS.CHECKOUT)}
        ></Button>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{ backgroundColor: Colors.blackish }}>
      <View
        style={{
          minHeight: "100%",
          justifyContent: "flex-start",
          backgroundColor,
        }}
      >
        <SideModalHeader
          title="Carrinho"
          onBack={
            // @ts-ignore
            () => navigation.navigate(ROUTE_PATHS.SHOP)
          }
          icon={
            <Ionicons
              name={"cart-outline"}
              size={24}
              color={Colors.tealc}
              style={{ marginLeft: 5 }}
            />
          }
        />

        <View
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            borderBottomWidth: 1,
            paddingVertical: 10,
            borderColor: Colors.tealc,
            flexDirection: "row",
          }}
        >
          <View style={{ width: "10%" }}></View>
          <View style={{ width: "30%" }}>
            <Text style={{ color: Colors.tealc }}>Produto</Text>
          </View>
          <View
            style={{
              width: "60%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 20,
            }}
          >
            <Text style={{ color: Colors.tealc }}>Preço</Text>
            <Text style={{ color: Colors.tealc }}>Quantidade</Text>
            <Text style={{ color: Colors.tealc }}>Subtotal</Text>
          </View>
        </View>
        <FlatList
          numColumns={1}
          style={{
            paddingHorizontal: 20,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={cartProducts}
          renderItem={({ item }) => <CartProductItem product={item} />}
          ListFooterComponent={renderFooter}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
