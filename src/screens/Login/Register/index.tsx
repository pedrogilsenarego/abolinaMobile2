import React from "react";
import { Keyboard, View } from "react-native";

import Button from "../../../components/Button";

import { Formik } from "formik";
import { useDispatch } from "react-redux";
import TextField from "../../../components/Inputs/TextField";
import { signUpUserStart } from "../../../slicer/user/user.actions";
import { i18n } from "../../../translations/i18n";
import { FORM_VALIDATION } from "./validation";

interface FORM {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const dispatch = useDispatch();

  const INITIAL_STATE: FORM = {
    name: "",
    email: "",
    password: "",
  };
  const handleSubmit = (values: FORM) => {
    dispatch(signUpUserStart(values));
    Keyboard.dismiss();
  };
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <Formik
        initialValues={{ ...INITIAL_STATE }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={FORM_VALIDATION}
      >
        {(props) => (
          <View style={{ flex: 1, rowGap: 10, alignItems: "center" }}>
            <TextField name="name" label={i18n.t("modules.login.name")} />
            <TextField name="email" label={i18n.t("modules.login.email")} />
            <TextField
              name="password"
              label={i18n.t("modules.login.password")}
              password
            />
            <View style={{ marginTop: 20, width: "100%" }}>
              <Button
                inverseColors
                label="Register"
                formik
                fullwidth
                buttonStyle={{ borderWidth: 0 }}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Register;
