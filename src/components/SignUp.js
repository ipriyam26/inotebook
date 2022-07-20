import React from 'react'
import '../css/SignUp.css'
import { useContext } from 'react'
import DarkModeContext from '../context/darkModeContext'
import { Link } from 'react-router-dom'


export default function SignUp() {

    const { darkMode } = useContext(DarkModeContext)


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
                                        <form>
                                            <div className="form-outline mb-4">
                                                <input type="text" id="form3Example1cg" placeholder='Your Name' className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="email" id="form3Example3cg" placeholder='Your Email' className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="form3Example4cg" placeholder='Password' className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="form3Example4cdg" placeholder='Confirm Password' className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                                                <label className={`form-check-label text-${!darkMode ? "dark" : "light"}`} htmlFor="form2Example3g">
                                                    I agree all statements in <a href="#!" className={`text-body text-${!darkMode ? "dark" : "light"}`}><u className={`text-${!darkMode ? "dark" : "light"}`}>Terms of service</u></a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="button"
                                                    className={`btn btn-${!darkMode ? "dark" : "light"} text-${darkMode ? "dark" : "light"} btn-block btn-lg`}>Register</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login"
                                                className={`fw-bold  text-${!darkMode ? "dark" : "light"}`}><u>Login here</u></Link></p>

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
