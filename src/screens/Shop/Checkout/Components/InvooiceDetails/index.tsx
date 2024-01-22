import { useNavigation } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";
import { Formik } from "formik";
import React from "react";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../../components/Button";
import DropdownForm from "../../../../../components/Inputs/DropDownForm";
import TextField from "../../../../../components/Inputs/TextField";
import { countryList } from "../../../../../constants/countries";
import { Colors } from "../../../../../constants/pallete";
import { ROUTE_PATHS } from "../../../../../constants/routes";
import { stripeLocal, stripeProduction } from "../../../../../constants/stripe";
import useMainColors from "../../../../../hooks/useMainColors";
import { clearCart } from "../../../../../slicer/cart/cart.actions";
import { CartProduct } from "../../../../../slicer/cart/cart.types";
import { updateSuccessNotification } from "../../../../../slicer/general/general.actions";
import { State } from "../../../../../slicer/types";
import { addBookOwned } from "../../../../../slicer/user/user.actions";
import { CurrentUser } from "../../../../../slicer/user/user.types";
import { i18n } from "../../../../../translations/i18n";
import { FORM_VALIDATION } from "./Validation";

export interface InvoiceSettings {
  name: string;
  surname: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  taxId: string;
}

interface FormProps extends InvoiceSettings {
  email: string;
  phone: string;
  userId: string;
}

const InvoiceDetails = () => {
  const { textColor } = useMainColors();
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state.user.currentUser
  );
  const cartProducts = useSelector<State, CartProduct[]>(
    (state) => state.cart.cartItems
  );

  const INITIAL_FORM_STATE: FormProps = {
    email: currentUser?.email || "",
    phone: "",
    name: currentUser?.invoiceSettings?.name || "",
    surname: currentUser?.invoiceSettings?.surname || "",
    address: currentUser?.invoiceSettings?.address || "",
    city: currentUser?.invoiceSettings?.city || "",
    postalCode: currentUser?.invoiceSettings?.postalCode || "",
    country: currentUser?.invoiceSettings?.country || "",
    taxId: currentUser?.invoiceSettings?.taxId || "",
    userId: currentUser?.id,
  };

  const calculateTotalValue = () => {
    return cartProducts
      .reduce((total, product) => {
        const productValue =
          product.product.price *
          (1 - (product?.product?.discount || 0) / 100) *
          product.value;
        return total + productValue;
      }, 0)
      .toFixed(2);
  };
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const handleSubmit = async (values: FormProps) => {
    onCheckout(values);
  };

  const onCheckout = async (values: FormProps) => {
    let items: {
      title: string;
      amount: number;
      quantity: number;
      onlyOffer: boolean;
      documentId: string;
    }[] = [];
    cartProducts.forEach((item: CartProduct) => {
      items.push({
        title: `${item.product.title}-${item.product.collections}`,
        amount: Math.floor(item.product.price * 100),
        quantity: item.value,
        onlyOffer: item.onlyOffer,
        documentId: item.product.documentID,
      });
    });

    const response = await fetch(stripeProduction, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        values,
        amount: parseInt(calculateTotalValue()) * 100,
      }),
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    const initResponse = await initPaymentSheet({
      merchantDisplayName: "test_abolina",
      returnURL: "https://dpwqdwqo.com",
      paymentIntentClientSecret: paymentIntent,
      //   defaultShippingDetails: {
      //     name: values.name,
      //     phone: values.phone,
      //     address: {
      //       country: values.country,
      //       line1: values.address,
      //       postalCode: values.postalCode,
      //       city: values.city,
      //     },
      //   },
      defaultBillingDetails: {
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: {
          country: values.country,
          line1: values.address,
          postalCode: values.postalCode,
          city: values.city,
        },
      },
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert("something went wrong");
      return;
    }
    await presentPaymentSheet({});

    onCreateOrder();
  };

  const onCreateOrder = async () => {
    //@ts-ignore
    navigate.navigate(ROUTE_PATHS.SHOP);
    dispatch(clearCart());
    let booksToAdd: string[] = [];
    cartProducts.forEach((item: CartProduct) => {
      if (!item.onlyOffer) booksToAdd.push(item.product.documentID);
    });
    if (booksToAdd.length > 0) dispatch(addBookOwned(booksToAdd));
    dispatch(updateSuccessNotification("Congratulations you got new books"));
  };

  return (
    <View>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={FORM_VALIDATION}
      >
        {(props) => (
          <View style={{ rowGap: 40, marginTop: 40 }}>
            <View style={{ rowGap: 20 }}>
              <Text
                style={{ color: textColor, fontSize: 18, fontWeight: "800" }}
              >
                {i18n.t("modules.checkout.userDetails")}
              </Text>

              <TextField
                name="email"
                label={i18n.t("modules.login.email")}
                colorLabel={textColor}
              />
              <TextField
                name="phone"
                label={i18n.t("modules.checkout.form.phone")}
                colorLabel={textColor}
              />
            </View>
            <View style={{ rowGap: 20 }}>
              <Text
                style={{ color: textColor, fontSize: 18, fontWeight: "800" }}
              >
                {i18n.t("modules.checkout.invoiceDetails")}
              </Text>
              <TextField
                name="name"
                label={i18n.t("modules.checkout.form.name")}
                colorLabel={textColor}
              />
              <TextField
                name="surname"
                label={i18n.t("modules.checkout.form.surname")}
                colorLabel={textColor}
              />
              <TextField
                name="address"
                label={i18n.t("modules.checkout.form.address")}
                colorLabel={textColor}
              />
              <TextField
                name="postalCode"
                label={i18n.t("modules.checkout.form.postalCode")}
                colorLabel={textColor}
              />
              <DropdownForm
                colorLabel={textColor}
                options={countryList}
                name="country"
                label={i18n.t("modules.checkout.form.country") as string}
              />
              <TextField
                name="city"
                label={i18n.t("modules.checkout.form.city")}
                colorLabel={textColor}
              />
              <TextField
                name="taxId"
                label={i18n.t("modules.checkout.form.taxId")}
                colorLabel={textColor}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  textDecorationLine: "underline",
                  color: Colors.tealc,
                  fontSize: 20,
                }}
              >
                Total
              </Text>
              <Text style={{ fontSize: 20, color: textColor }}>
                {" "}
                €{calculateTotalValue()}
              </Text>
            </View>

            <Button
              fullwidth
              label={i18n.t("modules.checkout.payNow")}
              formik
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default InvoiceDetails;
