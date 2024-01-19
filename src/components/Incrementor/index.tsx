import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/pallete";
import useMainColors from "../../hooks/useMainColors";

interface Props {
  minimumOne?: boolean;
  initialValue?: number;
  updateValue?: (value: number) => void;
  maxValue?: number;
  forceSetValue?: number;
}

const Incrementor = ({
  minimumOne,
  initialValue,
  updateValue,
  maxValue,
  forceSetValue,
}: Props) => {
  const [value, setValue] = useState<number>(initialValue || 0);
  const { textColor } = useMainColors();
  useEffect(() => {
    if (forceSetValue) {
      setValue(forceSetValue);
    }
  }, [forceSetValue]);

  const handleValue = (signal: "minus" | "plus") => {
    let newValue = value;
    if (signal === "minus" && newValue > (minimumOne ? 1 : 0)) {
      newValue -= 1;
    } else if (signal === "plus") {
      if (!maxValue) {
        newValue += 1;
      } else if (maxValue > value) newValue += 1;
    }

    setValue(newValue);

    if (updateValue) {
      updateValue(newValue);
    }
  };

  // Use the initialValue prop as the initial value for the state
  // value of the incrementor
  useEffect(() => {
    setValue(initialValue || 0);
  }, [initialValue]);

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={{
          borderWidth: 2,
          borderColor:
            value === (minimumOne ? 1 : 0) ? Colors.grey : Colors.tealc,

          width: 35,
          height: 35,
          backgroundColor:
            value === (minimumOne ? 1 : 0) ? Colors.grey : Colors.tealc,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 3,
        }}
        onPress={(e) => {
          e.preventDefault();
          handleValue("minus");
        }}
      >
        <Text style={{ color: "white" }}>-</Text>
      </TouchableOpacity>
      <View
        style={{
          width: 35,
          height: 35,

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ paddingTop: 2, color: textColor }}>{value}</Text>
      </View>
      <TouchableOpacity
        style={{
          width: 35,
          height: 35,
          borderColor: value === maxValue ? Colors.grey : Colors.tealc,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 3,
          backgroundColor: value === maxValue ? Colors.grey : Colors.tealc,
        }}
        onPress={(e) => {
          e.preventDefault();
          handleValue("plus");
        }}
      >
        <Text style={{ color: "white" }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Incrementor;
