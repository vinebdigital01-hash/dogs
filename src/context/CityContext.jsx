import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CITIES } from "../config/config.js";

const CityContext = createContext(null);
const KEY = "madhav_kennal_city_v1";

export function CityProvider({ children }) {
  const [city, setCityState] = useState(() => {
    try {
      return localStorage.getItem(KEY) || "Delhi NCR";
    } catch {
      return "Delhi NCR";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, city);
    } catch {
      /* ignore */
    }
  }, [city]);

  const setCity = (next) => {
    if (CITIES.includes(next)) setCityState(next);
  };

  const value = useMemo(() => ({ city, setCity, cities: CITIES }), [city]);
  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
}

export function useCity() {
  const ctx = useContext(CityContext);
  if (!ctx) return { city: "Delhi NCR", setCity: () => {}, cities: CITIES };
  return ctx;
}
