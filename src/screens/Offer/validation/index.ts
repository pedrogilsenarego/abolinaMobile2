import * as Yup from "yup";
import { i18n } from "../../../translations/i18n";

export const FORM_VALIDATION = Yup.object().shape({
  couppon: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{20}$/,
      "Alphanumeric string must be 20 characters long and contain only letters and numbers"
    )
    .required(`${i18n.t("forms.required")}`),
});
