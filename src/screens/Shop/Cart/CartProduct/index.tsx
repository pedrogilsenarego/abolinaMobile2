import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Incrementor from "../../../../components/Incrementor";
import Checkbox from "../../../../components/Inputs/CheckBox";
import { Colors } from "../../../../constants/pallete";
import useMainColors from "../../../../hooks/useMainColors";
import { Book } from "../../../../slicer/books/books.types";
import {
  deleteProductCart,
  onlyOfferToggle,
  updateCart,
} from "../../../../slicer/cart/cart.actions";
import { CartProduct } from "../../../../slicer/cart/cart.types";
import { State } from "../../../../slicer/types";
import { CurrentUser } from "../../../../slicer/user/user.types";

type Props = {
  product: CartProduct;
};

const CartProductItem = ({ product }: Props) => {
  const dispatch = useDispatch();
  const { backgroundColor, textColor } = useMainColors();
  const [numberOffer, setNumberOffer] = useState<number>(0);
  const [checkBoxDisabled, setCheckBoxDisabled] = useState<boolean>(false);
  const [forOffer, setForOffer] = useState<boolean>(
    product?.onlyOffer || false
  );
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state.user.currentUser
  );

  useEffect(() => {
    if (forOffer !== product?.onlyOffer)
      dispatch(onlyOfferToggle(product.product.documentID, forOffer));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forOffer]);
  const handleUpdateSubtotal = (value: number) => {
    if (value < numberOffer) setNumberOffer(value);
    dispatch(updateCart(value, product.product.documentID));
  };

  useEffect(() => {
    if (currentUser?.booksOwned?.includes(product.product.documentID)) {
      setForOffer(true);
      setCheckBoxDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 30,
        borderBottomWidth: 2,
        borderColor: Colors.tealc,
      }}
    >
      <View
        style={{ width: "10%", justifyContent: "center", alignItems: "center" }}
      >
        <TouchableOpacity
          onPress={() =>
            dispatch(deleteProductCart(product.product.documentID))
          }
        >
          <Ionicons name="close-outline" size={34} color={textColor} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "30%",
          justifyContent: "space-between",

          rowGap: 10,
        }}
      >
        <Image
          style={{ width: "100%", aspectRatio: 1, borderRadius: 6 }}
          source={{ uri: product.product.coverPage[0] }}
        />
        <TouchableOpacity
          onPress={() => setForOffer(!forOffer)}
          style={{
            flexDirection: "row",
            position: "relative",

            alignItems: "flex-end",
          }}
        >
          <Checkbox
            disabled={checkBoxDisabled}
            disableStyles
            isChecked={forOffer}
          />
          <View style={{ position: "absolute", paddingLeft: 30 }}>
            <Text style={{ fontSize: 12, color: textColor }}>
              Apenas para Oferta
            </Text>
            <Text
              style={{ fontSize: 10, color: Colors.tealc, fontStyle: "italic" }}
            >
              (sem compras para o próprio)
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "60%",

          justifyContent: "space-between",
          paddingLeft: 20,
        }}
      >
        <Text style={{ color: textColor }}>{product.product.title}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: textColor }}>
            {" "}
            €
            {(
              product.product.price *
              (1 - (product.product.discount || 0) / 100)
            ).toFixed(1)}
          </Text>
          <Incrementor
            key={product.product.documentID}
            initialValue={product.value}
            updateValue={handleUpdateSubtotal}
          />
          <Text style={{ color: textColor }}>
            €
            {(
              product.product.price *
              product.value *
              (1 - (product.product.discount || 0) / 100)
            ).toFixed(1)}
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text style={{ color: textColor }}>
            {product?.value > 1 || forOffer
              ? forOffer
                ? product.value
                : product.value - 1
              : 0}{" "}
            Oferta
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartProductItem;
