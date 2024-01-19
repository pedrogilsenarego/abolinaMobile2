import { Ionicons } from "@expo/vector-icons";
import { useField } from "formik";
import React, { useState } from "react";
import {
  Dimensions,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { personalConfig } from "../../../config/personalConfig";
import { Colors } from "../../../constants/pallete";
import useMainColors from "../../../hooks/useMainColors";
import { State } from "../../../slicer/types";

interface Props {
  label?: string | null;
  name: string;
  password?: boolean;
  colorLabel?: string;
  placeholder?: string | null;
  variant?: "default";
  onChange?: (values?: any) => void;
  inputStyle?: any; // Additional style for the TextInput
  labelStyle?: any; // Additional style for the label
}

const TextField = ({
  label,
  name,
  password,
  colorLabel,
  placeholder,
  variant,
  onChange,
  inputStyle,
  labelStyle,
}: Props) => {
  const [field, meta, helper] = useField(name ?? "");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { width } = Dimensions.get("window");
  const { textColor } = useMainColors();
  const dakrMode = useSelector<State, boolean>(
    (state) => state.general.darkMode
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOutsidePress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{ width: "100%", alignItems: "center" }}>
        {label && (
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 18,
                color: colorLabel || "white",
                textAlign: "left",
                ...labelStyle, // Apply additional label styles
              }}
            >
              {label}
            </Text>
          </View>
        )}
        <TextInput
          placeholderTextColor={
            dakrMode && variant === "default" ? "white" : undefined
          }
          secureTextEntry={password && !showPassword}
          value={meta.value}
          placeholder={placeholder || ""}
          onChangeText={(e) => {
            helper.setValue(e);
            if (onChange) onChange(e);
          }}
          underlineColorAndroid="transparent"
          selectionColor={Colors.darkGrey}
          style={{
            color: variant === "default" ? textColor : undefined,
            borderWidth: variant === "default" ? 0 : 2,
            borderColor: variant === "default" ? Colors.grey : Colors.darkGrey,
            backgroundColor:
              variant === "default" ? "transparent" : Colors.grey,
            borderRadius: variant === "default" ? 0 : 10,
            marginTop: 5,
            borderBottomWidth: variant === "default" ? 2 : undefined,
            paddingHorizontal: 20,
            paddingVertical: 10,
            fontSize: personalConfig.pedroMode ? 14 : 18,
            width: "100%",
            ...inputStyle, // Apply additional input styles
          }}
        />
        {password && (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 10,
              top: "69%",
              transform: [{ translateY: -12 }],
              zIndex: 1,
            }}
            onPress={handleClickShowPassword}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={23}
              color={Colors.darkGrey}
            />
          </TouchableOpacity>
        )}

        {meta.touched && meta.error && (
          <Text style={{ color: "red" }}>{meta.error}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TextField;
