import { useSelector } from "react-redux";
import { Colors } from "../constants/pallete";
import { State } from "../slicer/types";

const useMainColors = () => {
  const darkMode = useSelector<State, boolean>(
    (state) => state.general.darkMode
  );
  const backgroundColor = darkMode ? Colors.blackish : Colors.white;
  const textColor = darkMode ? Colors.grey : Colors.darkGrey;
  const menuColor = darkMode ? Colors.blackisher : Colors.tealc;
  const barStyle = "light-content"; //darkMode ? "light-content" : "dark-content";
  const modalColor = darkMode ? Colors.tealc : Colors.white;
  return { backgroundColor, textColor, menuColor, barStyle, modalColor };
};

export default useMainColors;
