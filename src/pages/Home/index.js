import React, { useContext } from "react";

import { LOCALES } from "../../constants/enum";
import { AppContext } from "../../contexts/AppContext";

import "./style.scss";

const Home = () => {
  const { locale, setLocale } = useContext(AppContext);

  const handleLocaleChange = () => {
    if (locale === LOCALES.vi_VN) {
      setLocale(LOCALES.en_US);
    }
    if (locale === LOCALES.en_US) {
      setLocale(LOCALES.fr_FR);
    }
    if (locale === LOCALES.fr_FR) {
      setLocale(LOCALES.ms_MY);
    }
    if (locale === LOCALES.ms_MY) {
      setLocale(LOCALES.vi_VN);
    }
  };

  return (
    <>
      <h1 className="hello">Hello world</h1>
      <p>
        <button onClick={handleLocaleChange}>{locale}</button>
      </p>
    </>
  );
};

export default Home;
