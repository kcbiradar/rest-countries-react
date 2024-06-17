import React, { useState } from "react";

const ThemeContext = React.createContext();

export default function ThemeContext() {
    const [darkTheme , setDarkTheme] = useState(false);

    function toggleTheme() {
        setDarkTheme(!darkTheme);
    }

}
