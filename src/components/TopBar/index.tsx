import React from "react";
import { Text, View } from "react-native";
import useMainColors from "../../hooks/useMainColors";
type Props = {
  title: string;
};
const TopestBar = ({ title }: Props) => {
  const { backgroundColor, textColor } = useMainColors();
  return (
    <View
      style={{
        backgroundColor,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: textColor, fontSize: 16 }}>{title}</Text>
    </View>
  );
};

export default TopestBar;
