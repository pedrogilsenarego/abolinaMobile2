import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/pallete";

type Props = {
  onChange?: (value: boolean) => void;
  isChecked?: boolean;
  disabled?: boolean;
  disableStyles?: boolean;
};

const Checkbox = ({
  onChange,
  isChecked = false,
  disabled,
  disableStyles,
}: Props) => {
  const handleToggle = () => {
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handleToggle}
      style={disableStyles ? undefined : styles.container}
    >
      <Ionicons
        name={isChecked || disabled ? "checkbox" : "square-outline"}
        size={24}
        color={disabled ? Colors.grey : Colors.darkGrey}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    marginLeft: 10,
  },
});

export default Checkbox;
