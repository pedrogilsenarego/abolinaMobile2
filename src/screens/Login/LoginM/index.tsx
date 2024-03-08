import AsyncStorage from "@react-native-async-storage/async-storage";
//import * as Google from "expo-auth-session/providers/google";

//import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import Button from "../../../components/Button";
import TextField from "../../../components/Inputs/TextField";
import { auth } from "../../../config/firebaseConfig";
import { FORM_VALIDATION } from "./validation";

import {
  emailSignInStart,
  signUpUserStart,
} from "../../../slicer/user/user.actions";

import { i18n } from "../../../translations/i18n";

//WebBrowser.maybeCompleteAuthSession();

interface FORM {
  email: string;
  password: string;
}

const LoginM = () => {
  const dispatch = useDispatch();
  // // const [request, response, promptAsync] = Google.useAuthRequest({
  // //   iosClientId:
  // //     "217751325798-3nlluau81916va60l5dmk6f4r2g20mho.apps.googleusercontent.com",
  // //   androidClientId:
  // //     "217751325798-o8f0daf23438t1smrg1d7lpii36g3295.apps.googleusercontent.com",
  // // });
  // // const handleGoogleSigniIn = () => {
  // //   promptAsync();
  // // };

  // useEffect(() => {
  //   if (response?.type == "success") {
  //     const { id_token } = response.params;
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(auth, credential);
  //   }
  // }, [response]);

  const INITIAL_STATE: FORM = {
    email: "",
    password: "",
  };
  const handleSubmit = (values: FORM) => {
    dispatch(emailSignInStart(values));
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
            <TextField name="email" label={i18n.t("modules.login.email")} />
            <TextField
              name="password"
              label={i18n.t("modules.login.password")}
              password
            />

            {/* <TouchableOpacity
              onPress={handleGoogleSigniIn}
              style={{
                marginTop: 30,
                alignItems: "center",
                backgroundColor: "red",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
                width: "100%",
              }}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                {i18n.t("modules.login.google")}
              </Text>
            </TouchableOpacity> */}
            <View style={{ marginTop: 40, width: "100%" }}>
              <Button
                inverseColors
                label="Login"
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

export default LoginM;
