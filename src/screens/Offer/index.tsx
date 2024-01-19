import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import TextField from "../../components/Inputs/TextField";
import { Colors } from "../../constants/pallete";
import useMainColors from "../../hooks/useMainColors";
import { checkCoupon, convertCoupons } from "../../services/books";
import { Book } from "../../slicer/books/books.types";
import { State } from "../../slicer/types";
import { addBookOwned } from "../../slicer/user/user.actions";
import { CurrentUser } from "../../slicer/user/user.types";
import { i18n } from "../../translations/i18n";
import { FORM_VALIDATION } from "./validation";

interface FORM {
  couppon: string;
}
const Offer = () => {
  const INITIAL_STATE: FORM = {
    couppon: "",
  };
  const { backgroundColor, textColor, barStyle } = useMainColors();
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state.user.currentUser
  );
  const [resultConvert, setResultConvert] = useState<string>("");
  const [bookFound, setBookFound] = useState<Book | null>(null);
  const dispatch = useDispatch();

  const handleConvert = async (values: FORM, formikProps: any) => {
    setResultConvert("");
    try {
      const result = await convertCoupons(
        values.couppon,
        currentUser.id,
        currentUser.booksOwned
      );
      setResultConvert(result);
      setBookFound(null);
      if (bookFound) dispatch(addBookOwned([bookFound?.documentID]));
      formikProps.resetForm();
    } catch (error: any) {
      setResultConvert(error as string);
    }
  };

  const handleSubmit = async (values: FORM) => {
    setResultConvert("");
    try {
      const book = await checkCoupon(values.couppon);
      setBookFound(book);
      if (currentUser?.booksOwned.includes(book?.documentID))
        setResultConvert("You already have this book");
      // const result = await convertCoupons(
      //   values.couppon,
      //   currentUser.id,
      //   currentUser.booksOwned
      // );
      // setResultConvert(result);
      Keyboard.dismiss();
    } catch (error: any) {
      setResultConvert(error as string);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.blackish }}>
      <StatusBar barStyle={barStyle as any} />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          backgroundColor,
        }}
      >
        <View
          style={{
            marginTop: 30,
            marginLeft: 30,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
          }}
        >
          <SimpleLineIcons name={"present"} size={24} color={Colors.tealc} />
          <Text
            style={{ color: Colors.tealc, fontSize: 20, fontWeight: "700" }}
          >
            {i18n.t("modules.offer.title")}
          </Text>
        </View>
        <Text
          style={{
            marginLeft: 40,
            marginRight: 40,
            marginTop: 30,
            textAlign: "justify",
            fontSize: 16,
            color: textColor,
          }}
        >
          {i18n.t("modules.offer.mainText")}
        </Text>
        <Formik
          initialValues={{ ...INITIAL_STATE }}
          onSubmit={
            bookFound && resultConvert !== "You already have this book"
              ? (values, formikProps) => handleConvert(values, formikProps)
              : (values) => handleSubmit(values)
          }
          validationSchema={FORM_VALIDATION}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              rowGap: 20,
              marginTop: 30,
            }}
          >
            <TextField
              onChange={() => {
                if (bookFound) setBookFound(null);
                if (resultConvert) setResultConvert("");
              }}
              name="couppon"
              placeholder={i18n.t("modules.offer.placeholder")}
            />
            {bookFound && (
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 20,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                  paddingLeft: 40,
                  paddingRight: 40,
                }}
              >
                <Image
                  style={{
                    width: "33.3%",
                    aspectRatio: 1,
                    borderRadius: 6,
                  }}
                  source={{ uri: bookFound?.coverPage[0].toString() }}
                />
                <Text style={{ color: textColor }}>{bookFound.title}</Text>
              </View>
            )}
            {resultConvert !== "You already have this book" && (
              <Button
                label={bookFound ? "Adicionar livro" : "Verificar cupão"}
                formik
                fullwidth
              />
            )}
            <Text style={{ fontSize: 20, color: "red" }}>{resultConvert}</Text>
          </View>
        </Formik>
        {!bookFound && (
          <Text
            style={{
              marginLeft: 80,
              marginRight: 80,
              marginTop: 30,
              textAlign: "center",
              fontSize: 16,
              color: textColor,
            }}
          >
            {i18n.t("modules.offer.secondText")}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Offer;
