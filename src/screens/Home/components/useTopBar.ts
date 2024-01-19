import { useState } from "react";

const useTopBar = () => {
  const [openShelfsPopup, setOpenShelfsPopup] = useState(false);
  return {
    openShelfsPopup,
    setOpenShelfsPopup,
  };
};

export default useTopBar;
