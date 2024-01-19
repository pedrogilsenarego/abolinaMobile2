import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../slicer/types";
import { i18n } from "../translations/i18n";

const useChangeLang = () => {
  const lang = useSelector<State, string>((state) => state?.general?.lang);

  useEffect(() => {
    console.log("changing to", lang);
    i18n.changeLanguage(lang.toLowerCase() || "pt");
  }, [lang]);
  return {};
};

export default useChangeLang;
