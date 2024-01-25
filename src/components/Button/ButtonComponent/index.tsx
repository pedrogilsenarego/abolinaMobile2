import React from "react";
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../../../constants/pallete";

interface Props extends TouchableOpacityProps {
  label: string;
  inverseColors?: boolean;
  fullwidth?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  isLoading?: boolean;
}

const Button = ({
  label,
  onPress,
  inverseColors,
  isLoading,
  fullwidth,
  buttonStyle,
  textStyle,
  ...rest
}: Props) => {
  return (
    <View style={{ width: fullwidth ? "100%" : undefined }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          borderColor: Colors.tealc,
          borderWidth: 2,
          backgroundColor: inverseColors ? "white" : Colors.tealc,
          alignSelf: "flex-start",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
          width: fullwidth ? "100%" : undefined,
          ...buttonStyle,
        }}
        {...rest}
      >
        {isLoading ? (
          <View
            style={{
              height: 20,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "transparent",
                fontWeight: "800",
                fontSize: 20,
                ...textStyle,
              }}
            >
              sa
            </Text>
            <ActivityIndicator size="small" color={Colors.white} />
            <Text
              style={{
                color: "transparent",
                fontWeight: "800",
                fontSize: 20,
                ...textStyle,
              }}
            >
              sa
            </Text>
          </View>
        ) : (
          <Text
            style={{
              color: inverseColors ? Colors.tealc : "white",
              fontWeight: "800",
              fontSize: 20,
              ...textStyle,
            }}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Button;
