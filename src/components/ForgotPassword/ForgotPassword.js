import React, { useState } from 'react';
import NavBar from "../NavigationBar/NavBar";
import {useNavigate} from 'react-router'
import { auth } from '../../hooks/firebase';
import "./ForgotPassword.css";


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate()
    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            await auth.sendPasswordResetEmail(email)
            setTimeout(() => {
                navigate("/login")
            },2000)


        } catch (error) {

        }
    }
    return (

        <div>
            <NavBar />
            <div className="login-content">
                <div className="container">
                    <div className="login-bg-blue">
                        <div className="login-main-content">
                            <h2 className="login-title">Forgot Password</h2>
                            <form className="login-form" onSubmit={formSubmit} style={{marginTop:"4%"}}>
                                <div className="form-group login-group">
                                    <img src={require("../../assets/user.png")} className="login-icon" alt="login" />
                                    <input type="text" className="input-form input-login" placeholder="Username" name="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
                                </div>
                                <div className="form-btn">
                                    <button type="submit" className="submit-btn login-btn">Forgot Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
