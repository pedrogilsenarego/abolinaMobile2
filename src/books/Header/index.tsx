import * as React from "react";
import { Text, View } from "react-native";
import { Colors } from "../../constants/pallete";

const Header = () => {
  return (
    <View
      style={{
        borderBottomColor: Colors.grey,
        borderBottomWidth: 1,
        display: "flex",
        width: "100%",
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      <Text>sa</Text>
    </View>
  );
};

export default Header;
