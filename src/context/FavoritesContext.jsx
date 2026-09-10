import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "madhav_kennal_favorites_v1";
const FavoritesContext = createContext(null);

const readStored = () => {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(readStored);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* ignore quota / private mode */
    }
  }, [ids]);

  const isFavorite = useCallback((id) => ids.includes(id), [ids]);

  const toggleFavorite = useCallback((id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const value = useMemo(
    () => ({ ids, count: ids.length, isFavorite, toggleFavorite }),
    [ids, isFavorite, toggleFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    return {
      ids: [],
      count: 0,
      isFavorite: () => false,
      toggleFavorite: () => {},
    };
  }
  return ctx;
}
