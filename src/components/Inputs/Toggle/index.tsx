import React, { useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/pallete";

export type ToggleProps = {
  isActive: boolean;
  onClick?: () => void;
  label?: string;
  disabled?: boolean;
};

const Toggle = ({
  label,
  isActive = false,
  onClick,
  disabled = false,
}: ToggleProps) => {
  const animatedSwitchValue = useRef(new Animated.Value(0)).current;

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    if (onClick) {
      onClick();
    }
  };

  const toggleSwitchAnimation = () => {
    Animated.timing(animatedSwitchValue, {
      toValue: isActive ? 1 : 0,
      duration: 300, // Adjust the duration as needed
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    toggleSwitchAnimation();
  }, [isActive]);

  const switchTranslateX = animatedSwitchValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30], // Adjust the values based on your switch width and knob width
  });

  return (
    <View>
      {label && <Text>{label}</Text>}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleToggle}
        disabled={disabled}
      >
        <View style={styles.toggleSwitch}>
          <Animated.View
            style={[
              styles.toggleKnob,
              isActive && styles.activeToggleKnob,
              { transform: [{ translateX: switchTranslateX }] },
            ]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleSwitch: {
    width: 60,
    height: 30,
    backgroundColor: Colors.grey,
    borderRadius: 100,
    position: "relative",
  },

  toggleKnob: {
    width: 20,
    height: 20,
    backgroundColor: "#fafafa",
    position: "absolute",
    left: 5,
    top: 5,
    borderRadius: 70,
  },
  activeToggleKnob: {
    backgroundColor: Colors.tealc,
  },
});

export default Toggle;
