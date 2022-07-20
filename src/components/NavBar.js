import React from 'react';
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import DarkModeContext from '../context/darkModeContext'

export default function NavBar() {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext)
    const [active, setActive] = useState(window.location.pathname)
    console.log(active)
    const handleDarkMode = () => {
        console.log(darkMode)
        toggleDarkMode()
        console.log(darkMode)
    }

    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-${darkMode ? "dark" : "light"} bg-${darkMode ? "dark" : "light"}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" onClick={
                        () => setActive("/")
                        } to="/">MyNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${active === "/" ? "active" : ""} `} aria-current="page" onClick={
                                    () => setActive("/")
                                } to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${active === "/about" ? "active" : ""}`} onClick={
                                    () => setActive("/about")
                                } to="/about">About</Link>
                            </li>                   
                             <li className="nav-item">
                                <Link className={`nav-link ${active === "/signup" ? "active" : ""}`} onClick={
                                    () => setActive("/signup")
                                } to="/signup">Signup</Link>
                            </li>
                        </ul>
                        <div className={`form-check form-switch text-${!darkMode ? "dark" : "light"}`}>
                            <input className="form-check-input" type="checkbox" value={darkMode} id="flexSwitchCheckDefault" onClick={handleDarkMode} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">DarkMode</label>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
