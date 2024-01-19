import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { Colors } from "../../../constants/pallete";

type Props = {
  data: { title: string; books: string[] }[];
  currentIndex: number;
};

const Pagination = ({ data, currentIndex }: Props) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 180,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {data.map((ind, index) => {
        return index === 0 ? (
          <View
            key={index}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons
              name={"home-sharp"}
              size={11}
              color={index === currentIndex ? Colors.tealc : Colors.grey}
              style={{ marginTop: -1, marginRight: 2 }}
            />
          </View>
        ) : (
          <View
            key={index}
            style={{
              width: 9,
              height: 9,
              borderRadius: 5,
              marginHorizontal: 3,
              backgroundColor:
                index === currentIndex ? Colors.tealc : Colors.grey,
            }}
          />
        );
      })}
    </View>
  );
};

export default Pagination;
