import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../constants/pallete";
import { clearNotification } from "../../slicer/general/general.actions";

interface SnackbarState {
  open: boolean;
  message: string;
  type: null | "success" | "fail";
  color: string;
  bgcolor: string;
  icon: any;
}

const INITIALSTATE = {
  open: false,
  message: "",
  type: null,
  icon: null,
  color: Colors.tealc,
  bgcolor: Colors.white,
};

const Snackbar = () => {
  const mapState = (state: any) => ({
    general: state.general,
  });
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    ...INITIALSTATE,
  });

  const translateY = useSharedValue(0);

  const { general } = useSelector(mapState);
  const { notificationMessage, notificationType } = general;

  const getSnackbarElements = (type: string) => {
    switch (type) {
      case "information":
        return {
          icon: (
            <Ionicons
              name="arrow-back-outline"
              size={17}
              color={Colors.tealc}
            />
          ),
        };
      case "fail":
        return {
          icon: <Ionicons name="warning-outline" size={20} color="red" />,
        };
      case "success":
        return {
          icon: (
            <Ionicons name="checkbox-outline" size={24} color={Colors.tealc} />
          ),
        };
      default:
        return {
          icon: <Ionicons name="arrow-back-outline" size={17} color="white" />,
        };
    }
  };

  useEffect(() => {
    if (notificationType !== null) {
      const { icon } = getSnackbarElements(notificationType);
      setSnackbar({
        ...snackbar,
        open: true,
        icon: icon,
        message: notificationMessage,
        type: notificationType,
      });

      translateY.value = withSpring(
        -120,
        { damping: 8, stiffness: 100 },
        (isFinished) => {
          if (isFinished) {
            translateY.value = withSpring(
              200,
              { damping: 10, stiffness: 100 },
              (isFinished) => {
                if (isFinished) {
                  runOnJS(handleClose)();
                }
              }
            );
          }
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [general]);

  const handleClose = () => {
    translateY.value = withSpring(0);
    dispatch(clearNotification());
    setSnackbar({ ...INITIALSTATE });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <>
      {snackbar.open && (
        <Animated.View
          style={[
            {
              position: "absolute",
              borderRadius: 6,
              borderWidth: 2,
              borderColor: Colors.tealc,
              zIndex: 2000,
              bottom: 0,
              right: 20,
              left: 20,
              backgroundColor: snackbar.bgcolor,
              padding: 16,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              shadowColor: "#00000066",
              shadowOpacity: 0.4,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 2,
              elevation: 4,
            },
            animatedStyle,
          ]}
        >
          <Text style={{ color: Colors.tealc, marginRight: 8 }}>
            {snackbar.icon}
          </Text>
          <Text style={{ color: Colors.tealc, marginTop: 0, fontSize: 18 }}>
            {snackbar.message}
          </Text>
        </Animated.View>
      )}
    </>
  );
};

export default Snackbar;
