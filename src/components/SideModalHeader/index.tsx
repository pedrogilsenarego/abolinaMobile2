import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/pallete";

type Props = {
  title: string;
  icon?: React.ReactNode;
  onBack?: () => void;
};

const SideModalHeader = ({ title, icon, onBack }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",

        justifyContent: "space-between",
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.tealc,
      }}
    >
      <TouchableOpacity
        onPress={onBack}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          name={"arrow-back-outline"}
          size={24}
          color={Colors.tealc}
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>
      <Text style={{ color: Colors.tealc, fontSize: 20, fontWeight: "700" }}>
        {title}
      </Text>
      {icon}
    </View>
  );
};

export default SideModalHeader;
