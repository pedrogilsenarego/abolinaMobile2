import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleProp, Text, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../../../constants/pallete";
import { ROUTE_PATHS } from "../../../../../constants/routes";
import useMainColors from "../../../../../hooks/useMainColors";
type Props = {
  data: any;
  style?: StyleProp<ViewStyle>;
};
const ProductC = ({ data, style }: Props) => {
  if (!data.books) return;
  const navigation = useNavigation();
  const { textColor } = useMainColors();
  const image1 = data?.books[0]?.coverPage[0] || "";
  const image2 = data?.books[1]?.coverPage[0] || "";
  const image3 = data?.books[2]?.coverPage[0] || "";
  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => {
        // @ts-ignore
        navigation.navigate(ROUTE_PATHS.SHOP_COLLECTION, {
          collection: data,
        });
      }}
      style={{
        width: 120,
        height: 184,
        borderWidth: 2,
        borderColor: Colors.grey,
        borderRadius: 4,
        position: "relative",
        ...(style as object),
      }}
    >
      <View
        style={{
          width: "100%",
          aspectRatio: 1,
          position: "relative",
          backgroundColor: Colors.grey,
        }}
      >
        {image3 && (
          <Image
            source={{ uri: image3 }}
            style={{
              position: "absolute",
              right: "0%",
              top: "40%",
              width: "40%",
              height: "60%",
              borderRadius: 4,
            }}
            resizeMode="cover"
          />
        )}
        {image2 && (
          <Image
            source={{ uri: image2 }}
            style={{
              position: "absolute",
              right: "18%",
              top: "20%",
              width: "50%",
              height: "80%",
              borderRadius: 4,
            }}
            resizeMode="cover"
          />
        )}
        {image1 && (
          <Image
            source={{ uri: image1 }}
            style={{
              position: "absolute",
              width: "64%",
              height: "100%",
              borderRadius: 4,
            }}
            resizeMode="cover"
          />
        )}
      </View>
      <View
        style={{
          padding: 4,

          height: 64,
        }}
      >
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ color: Colors.tealc }}
        >
          {data.title}
        </Text>
        <Text style={{ color: textColor, fontStyle: "italic", fontSize: 12 }}>
          {data?.books?.length || 0} Volumes
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductC;
