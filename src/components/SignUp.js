import React from 'react'
import '../css/SignUp.css'
import { useContext, useEffect, useState } from 'react'
import DarkModeContext from '../context/darkModeContext'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { SignUpForm } from './SignUpForm'



export default function SignUp() {
    const navigate = useNavigate()

    const { darkMode } = useContext(DarkModeContext)
    const { register, user } = useContext(UserContext)
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        check: false
    })

    const handleNameChange = (e) => {
        setCredentials({
            ...credentials,
            name: e.target.value
        })
    }
    const handleEmailChange = (e) => {
        setCredentials({
            ...credentials,
            email: e.target.value
        })
    }
    const handlePasswordChange = (e) => {
        setCredentials({
            ...credentials,
            password: e.target.value
        })
    }
    const handleConfirmPasswordChange = (e) => {
        setCredentials({
            ...credentials,
            confirmPassword: e.target.value
        })
    }

    const handleRegister = async () => {
        // e.preventDefault()
        if (credentials.password.length < 6) {
            alert("Password must be at least 6 characters");
            return

        }
        if (credentials.password !== credentials.confirmPassword) {
            alert("Passwords do not match");
            return
        }
        if (!credentials.check) {
            alert("Please accept the terms and conditions");
            return
        }
        const res = await register(credentials.name, credentials.email, credentials.password)
        if (res) {
            navigate('/')
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate])


    return (
        <div className="container mt-5">
            <section className="vg-100"  >
                <div className="mask d-flex  align-items-center h-100 ">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card">
                                    <div className={`card-body bg-${darkMode ? "dark" : "light"} rounded p-5`}>
                                        <h2 className={`text-uppercase  text-${!darkMode ? "dark" : "light"}  text-center mb-5`}>Create an account</h2>
                                        <SignUpForm darkMode={darkMode} credentials={credentials} setCredentials={setCredentials} handleNameChange={handleNameChange} handleEmailChange={handleEmailChange} handlePasswordChange={handlePasswordChange} handleConfirmPasswordChange={handleConfirmPasswordChange} handleRegister={handleRegister}></SignUpForm>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}
