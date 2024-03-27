import React from "react";
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

import Button from "../../../components/Button";

import { Formik } from "formik";
import TextField from "../../../components/Inputs/TextField";
import { FORM_VALIDATION } from "./validation";

import { recoverPassword } from "../../../slicer/user/user.actions";

import { i18n } from "../../../translations/i18n";

interface FORM {
  email: string;
}

const RecoverPwd = () => {
  const dispatch = useDispatch();

  const INITIAL_STATE: FORM = {
    email: "",
  };
  const handleSubmit = (values: FORM) => {
    Keyboard.dismiss();
    dispatch(recoverPassword(values.email));
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Formik
          initialValues={{ ...INITIAL_STATE }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={FORM_VALIDATION}
        >
          {(props) => (
            <View style={{ flex: 1, rowGap: 10, alignItems: "center" }}>
              <TextField name="email" label={i18n.t("modules.login.email")} />
              <View style={{ marginTop: 80, width: "100%" }}>
                <Button
                  inverseColors
                  label="Recover Password"
                  formik
                  fullwidth
                  buttonStyle={{ borderWidth: 0 }}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RecoverPwd;
