import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();


/* =====================================================
   THEME PROVIDER
   Manages site-wide dark / light mode.
   Applies data-theme attribute on <html> so every
   CSS file's var(--bg), var(--text) etc. switch
   automatically, no per-component overrides needed.
====================================================== */

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState(() => {

    const saved = localStorage.getItem("comzone-theme");

    return saved === "light" ? "light" : "dark";

  });


  useEffect(() => {

    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("comzone-theme", theme);

  }, [theme]);


  function toggleTheme() {

    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  }


  return (

    <ThemeContext.Provider value={{ theme, toggleTheme }}>

      {children}

    </ThemeContext.Provider>

  );

}


export function useTheme() {

  return useContext(ThemeContext);

}
