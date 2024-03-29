import * as Yup from "yup";
import { i18n } from "../../../../translations/i18n";

export const FORM_VALIDATION = Yup.object().shape({
  shelfTitle: Yup.string()
  .required(`${i18n.t("forms.required")}`),
});
