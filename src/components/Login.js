import React from 'react'
import '../css/SignUp.css'
import { useContext } from 'react'
import DarkModeContext from '../context/darkModeContext'
import { Link } from 'react-router-dom'


export default function Login() {

    const { darkMode } = useContext(DarkModeContext)


    return (


        <div className="container mt-5" >


            <section className="vg-100"  >
                <div className="mask d-flex  align-items-center h-100 " >
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" >
                                    <div className={`card-body bg-${darkMode ? "dark" : "light"} rounded p-5`}>
                                        <h2 className={`text-uppercase  text-${!darkMode ? "dark" : "light"}  text-center mb-5`}>Login</h2>
                                        <form>

                                            <div className="form-outline mb-4">
                                                <input type="email" id="form3Example3cg" placeholder='Your Email' className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="form3Example4cg" placeholder='Password' className="form-control form-control-lg" />
                                            </div>
                                            <div className="mb-5">
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button type="button"
                                                    className={`btn btn-${!darkMode ? "dark" : "light"} text-${darkMode ? "dark" : "light"} btn-block btn-lg`}>Register</button>

                                            </div>
                                            <p className="text-center text-muted mt-5 mb-0">Don't have an account? <Link to="/signup"
                                                className={`fw-bold  text-${!darkMode ? "dark" : "light"}`}><u>Create here</u></Link></p>

                                        </form>

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
