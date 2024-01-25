import { useFormikContext } from "formik";
import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import ButtonComponent from "./ButtonComponent";

interface Props {
  formik?: boolean;
  label: string;
  onClick?: () => void;
  inverseColors?: boolean;
  isLoading?: boolean;
  fullwidth?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const Button = ({
  formik,
  label,
  isLoading,
  onClick,
  inverseColors,
  buttonStyle,
  textStyle,
  fullwidth,
}: Props) => {
  const RenderButtonFormik = () => {
    const { submitForm } = useFormikContext();

    return (
      <ButtonComponent
        disabled={isLoading}
        isLoading={isLoading}
        onPress={submitForm}
        buttonStyle={buttonStyle}
        textStyle={textStyle}
        label={label}
        inverseColors={inverseColors}
        fullwidth={fullwidth}
      />
    );
  };
  const RenderButton = () => {
    return (
      <ButtonComponent
        disabled={isLoading}
        isLoading={isLoading}
        onPress={onClick}
        buttonStyle={buttonStyle}
        textStyle={textStyle}
        label={label}
        inverseColors={inverseColors}
        fullwidth={fullwidth}
      />
    );
  };
  return formik ? RenderButtonFormik() : RenderButton();
};

export default Button;
