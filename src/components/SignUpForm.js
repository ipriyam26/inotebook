import React from 'react';
import { Link } from 'react-router-dom';

export function SignUpForm(props) {
    return (<form>
        <div className="form-outline mb-4">
            <input type="text" id="form3Example1cg" placeholder='Your Name' onChange={props.handleNameChange} className="form-control form-control-lg" />
        </div>

        <div className="form-outline mb-4">
            <input type="email" id="form3Example3cg" placeholder='Your Email' onChange={props.handleEmailChange} className="form-control form-control-lg" />
        </div>

        <div className="form-outline mb-4">
            <input type="password" id="form3Example4cg" placeholder='Password' onChange={props.handlePasswordChange} className="form-control form-control-lg" />
        </div>

        <div className="form-outline mb-4">
            <input type="password" id="form3Example4cdg" placeholder='Confirm Password' onChange={props.handleConfirmPasswordChange} className="form-control form-control-lg" />
        </div>

        <div className="form-check d-flex justify-content-center mb-5">
            <input className="form-check-input me-2" type="checkbox" value={props.credentials.check} onClick={() => {
                props.setCredentials({
                    ...props.credentials,
                    check: !props.credentials.check
                });
            }} id="form2Example3cg" />
            <label className={`form-check-label text-${!props.darkMode ? "dark" : "light"}`} htmlFor="form2Example3g">
                I agree all statements in <a href="#!" className={`text-body text-${!props.darkMode ? "dark" : "light"}`}><u className={`text-${!props.darkMode ? "dark" : "light"}`}>Terms of service</u></a>
            </label>
        </div>

        <div className="d-flex justify-content-center">
            <button type="button" className={`btn btn-${!props.darkMode ? "dark" : "light"} text-${props.darkMode ? "dark" : "light"} btn-block btn-lg`} onClick={props.handleRegister}>Register</button>
        </div>

        <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login" className={`fw-bold  text-${!props.darkMode ? "dark" : "light"}`}><u>Login here</u></Link></p>

    </form>);
}
