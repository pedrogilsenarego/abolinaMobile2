import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../components/Inputs/DropDown";
import { optionsLang } from "../../constants/languages";
import { Colors } from "../../constants/pallete";
import useMainColors from "../../hooks/useMainColors";
import { updateLang } from "../../slicer/general/general.actions";
import { State } from "../../slicer/types";
import { i18n } from "../../translations/i18n";
import LoginM from "./LoginM";
import RecoverPwd from "./RecoverPwd";
import Register from "./Register";

const Login = () => {
  const [state, setState] = useState<"login" | "register" | "recoverPassword">(
    "login"
  );
  const { barStyle } = useMainColors();
  const dispatch = useDispatch();
  const lang = useSelector<State, string>((state) => state.general.lang);
  const selectedOption = optionsLang.find(
    (option) => option.value === lang.toLowerCase()
  );
  const selectedValue = selectedOption
    ? selectedOption
    : { value: "pt", label: "Português" };

  let renderComponent;
  switch (state) {
    case "login":
      renderComponent = <LoginM />;
      break;
    case "register":
      renderComponent = <Register />;
      break;
    case "recoverPassword":
      renderComponent = <RecoverPwd />;
      break;
    default:
      renderComponent = null;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexGrow: 1,
        backgroundColor: Colors.tealc,
        flexDirection: "column",
        rowGap: 20,
        alignItems: "center",
        position: "relative",
      }}
    >
      <StatusBar barStyle={barStyle as any} />
      <View style={{ position: "absolute", top: 80, right: 30 }}>
        <Dropdown
          options={optionsLang}
          onSelect={(value) => {
            dispatch(updateLang(value.value));
          }}
          selectedValue={selectedValue}
          icon={
            <Ionicons name={"globe-outline"} size={28} color={Colors.grey} />
          }
        />
      </View>
      <Image
        style={{ width: 150, height: 150, marginTop: 100 }}
        source={require("../../assets/images/initialLogo.jpg")}
      />
      <View style={{ width: "85%" }}>{renderComponent}</View>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => setState(state === "login" ? "register" : "login")}
      >
        <Text style={{ color: "white", fontSize: 16 }}>
          {state === "login" ? "Register" : "Login"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => setState("recoverPassword")}
      >
        <Text style={{ color: "#ffffffab", fontSize: 16 }}>
          {i18n.t("modules.login.recoverPassword")}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
