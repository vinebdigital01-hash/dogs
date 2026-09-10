import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/** Soft fade when navigating between pages */
export default function PageTransition({ children }) {
  const { pathname } = useLocation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div
      key={pathname}
      className={`transition-opacity duration-500 ease-out ${show ? "opacity-100" : "opacity-0"}`}
    >
      <div className="animate-fade-up">{children}</div>
    </div>
  );
}
