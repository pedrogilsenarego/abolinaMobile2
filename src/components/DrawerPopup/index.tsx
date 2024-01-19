import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors } from "../../constants/pallete";

interface IProps {
  children: ReactNode;
  onClose?: () => void;
  openModal: boolean;
  barRef?: any;
}

const DrawerPopup = ({ children, onClose, openModal, barRef }: IProps) => {
  const [modalVisible, setModalVisible] = useState(openModal);
  const drawerAnimation = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [marginTop, setMarginTop] = useState<number>(0);

  useEffect(() => {
    if (barRef && barRef.current && openModal) {
      barRef.current.measure(
        (
          _x: any,
          _y: any,
          _width: any,
          height: any,
          _pageX: any,
          pageY: any
        ) => {
          // Calculate the top margin based on the position
          const topMargin = pageY + height;
          setMarginTop(topMargin);
        }
      );
    }
  }, [openModal, barRef, drawerAnimation]);

  useEffect(() => {
    if (openModal) {
      setModalVisible(true);
      Animated.timing(drawerAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setModalVisible(false));
    }
  }, [openModal, drawerAnimation]);

  const handlePressOutside = () => {
    if (onClose) {
      onClose();
    }
  };

  const drawerStyles = {
    transform: [
      {
        translateX: drawerAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-300, 0],
        }),
      },
    ],
    ...Platform.select({
      android: {
        elevation: drawerAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 16],
        }),
      },
      ios: {
        // Use shadow properties for iOS if needed
      },
    }),
  };

  const overlayStyles = {
    opacity: drawerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.5],
    }),
  };

  return (
    <Modal
      animationType="none" // No animation for modal itself
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "black",
                marginTop: marginTop,
                marginBottom: 80,
              },
              overlayStyles,
            ]}
          />
          <Animated.View
            style={[
              {
                backgroundColor: "transparent",
                paddingTop: marginTop,
                paddingBottom: 80,
                height: "100%",
              },
              drawerStyles,
            ]}
          >
            <View
              style={{
                height: "100%",
                width: 300,
                borderRightWidth: 2,
                borderRightColor: Colors.tealc,
              }}
            >
              {children}
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export default DrawerPopup;
