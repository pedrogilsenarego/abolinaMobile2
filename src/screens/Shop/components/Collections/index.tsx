import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Colors } from "../../../../constants/pallete";
import { ROUTE_PATHS } from "../../../../constants/routes";
import useMainColors from "../../../../hooks/useMainColors";
import {
  setPageCollection,
  setShopMode,
} from "../../../../slicer/homeFilters/homeFilters.actions";

type Props = {
  data: any;
};

const Collection = ({ data }: Props) => {
  if (!data?.books) return;
  const dispatch = useDispatch();
  const { textColor } = useMainColors();
  const navigation = useNavigation();
  const image1 = data?.books[0]?.coverPage[0] || "";
  const image2 = data?.books[1]?.coverPage[0] || "";
  const image3 = data?.books[2]?.coverPage[0] || "";
  return (
    <View
      style={{
        flexDirection: "row",

        paddingHorizontal: 25,
        paddingVertical: 15,
        height: 160,
        columnGap: 20,
      }}
    >
      <View
        style={{
          width: 130,
          height: "100%",
          position: "relative",
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
          flex: 1,
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              color: Colors.tealc,
              textTransform: "capitalize",
              fontSize: 18,
            }}
          >
            {data.title}
          </Text>
          <Text
            style={{
              color: Colors.grey,
            }}
          >
            {data?.books?.length || 0} Volumes
          </Text>
          <Text
            numberOfLines={5}
            ellipsizeMode="tail"
            style={{ color: textColor }}
          >
            {data.resume}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            navigation.navigate(ROUTE_PATHS.SHOP_COLLECTION, {
              collection: data,
            });
          }}
        >
          <Text
            style={{
              color: Colors.tealc,
              textTransform: "uppercase",
              fontSize: 14,
              fontWeight: "800",
              textAlign: "right",
            }}
          >
            Ver Mais
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Collection;
