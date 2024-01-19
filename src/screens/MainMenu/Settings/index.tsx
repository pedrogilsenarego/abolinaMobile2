import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { update } from "lodash";
import Dropdown from "../../../components/Inputs/DropDown";
import Toggle from "../../../components/Inputs/Toggle";
import SideModalHeader from "../../../components/SideModalHeader";
import { optionsLang } from "../../../constants/languages";
import { Colors } from "../../../constants/pallete";
import { ROUTE_PATHS } from "../../../constants/routes";
import useChangeLang from "../../../hooks/useChangeLang";
import useMainColors from "../../../hooks/useMainColors";
import {
  setDarkMode,
  setNotifications,
  updateLang,
} from "../../../slicer/general/general.actions";
import { State } from "../../../slicer/types";
import { i18n } from "../../../translations/i18n";

const Settings = () => {
  const { width } = Dimensions.get("window");
  const dispatch = useDispatch();
  const [dummyrender, setDummyrender] = useState<number>(0);
  const navigate = useNavigation();
  const darkMode = useSelector<State, boolean>(
    (state) => state.general.darkMode
  );
  const notifications = useSelector<State, boolean>(
    (state) => state.general.notifications
  );
  const { backgroundColor, textColor, barStyle } = useMainColors();
  const lang = useSelector<State, string>((state) => state.general.lang);
  const selectedOption = optionsLang.find(
    (option) => option.value === lang.toLowerCase()
  );
  const selectedValue = selectedOption
    ? selectedOption
    : { value: "pt", label: "Português" };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.blackish,
      }}
    >
      <StatusBar barStyle={barStyle as any} />
      <View
        style={{
          backgroundColor,

          height: "100%",
        }}
      >
        <SideModalHeader
          title="Definições"
          icon={
            <Ionicons name="settings-outline" size={20} color={Colors.tealc} />
          }
          onBack={
            // @ts-ignore
            () => navigate.navigate(ROUTE_PATHS.MAIN_MENU)
          }
        />
        <View
          style={{
            backgroundColor,
            alignItems: "center",
            paddingHorizontal: 20,
            rowGap: 20,
            paddingVertical: 40,
          }}
        >
          <View
            style={{
              width: "100%",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20, color: textColor }}>Notificações</Text>
            <Toggle
              isActive={notifications}
              onClick={() => {
                dispatch(setNotifications(!notifications));
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20, color: textColor }}>
              {i18n.t("modules.mainMenu.settingsMenu.darkMode")}
            </Text>
            <Toggle
              isActive={darkMode}
              onClick={() => {
                dispatch(setDarkMode(!darkMode));
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20, color: textColor }}>Língua</Text>
            <Dropdown
              options={optionsLang}
              onSelect={(value) => {
                dispatch(updateLang(value.value));
              }}
              selectedValue={selectedValue}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
