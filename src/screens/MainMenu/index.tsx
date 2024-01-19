import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../../constants/pallete";
import { ROUTE_PATHS } from "../../constants/routes";
import useMainColors from "../../hooks/useMainColors";
import useNavBottom from "../../hooks/useNavBottom";
import { signOut } from "../../services/user";
import { setEditMode } from "../../slicer/homeFilters/homeFilters.actions";
import { i18n } from "../../translations/i18n";

const MainMenu = () => {
  const { width } = Dimensions.get("window");
  const dispatch = useDispatch();
  const navigate = useNavigation();
  useNavBottom({ show: true });
  const { backgroundColor, textColor, barStyle } = useMainColors();

  const Option = ({
    label,
    icon,
    link,
    onPress,
  }: {
    label: string;
    icon: any;
    link?: string;
    onPress?: any;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // @ts-ignore
          if (link) navigate.navigate(link);
          if (onPress) onPress();
        }}
      >
        <View
          style={{
            width: width * 0.8,
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
          }}
        >
          {icon}
          <Text style={{ fontSize: 20, color: textColor }}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };
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
          alignItems: "center",
          height: "100%",
          rowGap: 20,
          paddingVertical: 40,
        }}
      >
        <Option
          label={"Editar A Minha Biblioteca"}
          icon={<Ionicons name="create-outline" size={20} color={textColor} />}
          link={ROUTE_PATHS.SHELVES_CONFIG}
          //onPress={() => dispatch(setEditMode("shelf"))}
        />
        <Option
          label={i18n.t("modules.mainMenu.settings")}
          icon={
            <Ionicons name="settings-outline" size={20} color={textColor} />
          }
          link={ROUTE_PATHS.SETTINGS}
        />
        <Option
          label={i18n.t("modules.mainMenu.faq")}
          icon={<Ionicons name="chatbox-outline" size={20} color={textColor} />}
        />
        <Option
          label={i18n.t("modules.mainMenu.informations")}
          icon={
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={textColor}
            />
          }
        />
        <Option
          label={i18n.t("modules.mainMenu.about")}
          icon={<Ionicons name="happy-outline" size={20} color={textColor} />}
        />

        <Option
          label={"Sair da Aplicação"}
          icon={<Ionicons name="log-out-outline" size={20} color={textColor} />}
          onPress={signOut}
        />
      </View>
    </SafeAreaView>
  );
};

export default MainMenu;
