import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import DarkModeContext from '../context/darkModeContext'
import UserContext from '../context/UserContext';

export default function NavBar() {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext)
    const [active, setActive] = useState(window.location.pathname)
    const { user,logout,getUser,userDetails } = useContext(UserContext)

    const navigate = useNavigate()

    const handleDarkMode = () => {
        toggleDarkMode()
    }
    useEffect(() => {
if (localStorage.getItem("access_token")) {
    getUser()
}
    }, [])
    


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
                            {
                                user ?
                                <li className="nav-item">
                                    <Link className={`nav-link ${active === "/login" ? "active" : ""}`} onClick={
                                        () => {
                                            logout()
                                            setActive("/login")
                                        }
                                    } to="/login">Logout</Link>
                                </li>
                                :
                            <li className="nav-item">
                                <Link className={`nav-link ${active === "/signup" ? "active" : ""}`} onClick={
                                    () => setActive("/signup")
                                } to="/signup">Signup</Link>
                            </li>

                            }        
                             
                        </ul>
                        
                        <div className={`form-check form-switch text-${!darkMode ? "dark" : "light"}`}>
                            <input className="form-check-input" type="checkbox" value={darkMode} id="flexSwitchCheckDefault" onClick={handleDarkMode} />
                        </div>
                        <h6 className='nav-item align-center' >
                            {userDetails ? `${userDetails.name}` : ""}
                        </h6>
                    </div>
                </div>
            </nav>
        </div>
    )
}
