import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { stylesScreens } from "../screens/styles";

interface Props {
  show: boolean;
}

const useNavBottom = ({ show = true }: Props) => {
  const navigation = useNavigation();

  useFocusEffect(() => {
    //@ts-ignore
    navigation?.getParent().setOptions({
      tabBarStyle: show
        ? {
            display: "flex",
            ...stylesScreens.shadow,
          }
        : {
            display: "none",
          },
    });
  });

  return {};
};

export default useNavBottom;
