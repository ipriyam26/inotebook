import { useState } from "react";
import DarkModeContext from "./darkModeContext";

const DarkModeState = (props) => {

    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
    
    const toggleDarkMode = () => {
        localStorage.setItem("darkMode", !darkMode);
        if (!darkMode){
            document.body.style.backgroundColor = "#202020";
        }
        else {
            document.body.style.backgroundColor = "#F5F5F5"
        }
        setDarkMode(!darkMode);

    }
    
    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
        {props.children}
        </DarkModeContext.Provider>
    );
}

export default DarkModeState;