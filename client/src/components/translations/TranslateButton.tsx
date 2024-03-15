import React, { useState } from "react";
import i18n from "i18next";
import { MdOutlineTranslate } from "react-icons/md";

export default function TranslateButton() {
  const [language, setLanguage] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "hi" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed right-[25px] bottom-[90px] bg-green-300 p-3.5 rounded-full"
    >
      <MdOutlineTranslate size={30} />
    </button>
  );
}
