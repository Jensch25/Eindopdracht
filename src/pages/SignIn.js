import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../hooks/firebase';
import firebase from "firebase/compat/app";
import { validate } from '../Utils/validate';
import NavBar from "../components/NavigationBar/NavBar";
import './SignIn.css';
import Warning from '../components/Warning/Warning';
import Backdrop from '../UI/Backdrop/Backdrop';

const SignIn = () => {
    const navigate = useNavigate();
    const [list, setList] = useState([])
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(false);
    const [signInFormData, setSignInFormData] = useState({})

    const changeHandler = (e) => {
        const cloneObject = {
            ...signInFormData,
            [e.target.name]: e.target.value
        }
        setSignInFormData(cloneObject)
        Object.keys(cloneObject).forEach(k => {
            const validateFields = validate({ name: k, value: cloneObject[k] })
            setError(e => ({ ...e, ...validateFields }))
        })
    }
    const formSubmit = async (e) => {
        e.preventDefault();
        setLoader(!loader);
        try {
            const res = await auth.signInWithEmailAndPassword(signInFormData.email, signInFormData.password);
            localStorage.setItem('name', JSON.stringify(res.user.multiFactor.user.displayName));
            setLoader(!loader);
        } catch (error) {
            setList([...list, {
                id: Math.floor((Math.random() * 101) + 1),
                title: 'Danger',
                description: error.code,
            }]);
            setLoader(false);
            setTimeout(() => {
                setList([])
            },2000)
        }

    }
    const signInWithGoogleOrFacebook = async (type) => {
        setLoader(!loader);
        try {
            const res = await auth.signInWithPopup(new firebase.auth[`${type}AuthProvider`]())
            const user = res.user;
            await db.collection('users').doc(user.uid).set({
                uid: user.uid,
                email: user.email,
                authProvider: type,
                firstName: user.displayName.split(' ')[0] || '',
                lastName: user.displayName.split(' ')[1] || ''
            })
            navigate('/');
            setLoader(!loader);
        } catch (error) {
            setLoader(false);
            throw error;
        }
    }

    return (
        <div>
            <NavBar />
            <div className="login-content">
                <div className="container">
                    <div className="login-bg-blue">
                        <div className="login-main-content">
                            <h2 className="login-title">Sign In</h2>
                            <p className="login-text">Log in to your account</p>
                            <form className="login-form" onSubmit={formSubmit}>
                                <div className="form-group login-group">
                                    <img src={require("../assets/user.png")} className="login-icon" alt="" />
                                    <input type="text" className="input-form input-login" placeholder="Username" name="email" value={signInFormData.email} onChange={changeHandler} />
                                    {error?.email && (<p className="error">
                                        {error?.email}
                                    </p>)}
                                </div>
                                <div className="form-group login-group">
                                    <img src={require("../assets/password.png")} className="login-icon" alt="" />
                                    <input type="password" className="input-form input-login" placeholder="Password" name="password" value={signInFormData.password} onChange={changeHandler} />
                                    {error?.password && (<p className="error">
                                        {error?.password}
                                    </p>)}
                                </div>
                                <div className="form-btn">
                                    <button type="submit" className="submit-btn login-btn">Login</button>
                                </div>
                                <span className="forgot-psw" onClick={() => navigate('/forgot-password')}><img src={require("../assets/forgot-password.png")} alt="" /> I forgot my password</span>
                                <div className="form-btn">
                                    <button type="submit" className="submit-btn login-btn" onClick={() => navigate('/sign-up')}>Register New Account</button>
                                </div>
                            </form>
                            <p className="sign-icon">or sign In with</p>
                            <div className="social-links">
                                <div className="social-icon" onClick={() => signInWithGoogleOrFacebook('Facebook')}><img src={require("../assets/facebook.png")} alt="" /></div>
                                <div className="social-icon" onClick={() => signInWithGoogleOrFacebook('Google')}><img src={require("../assets/gmail-login.png")} alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {list.length > 0 &&   <Warning
                warningList={list}
                position={'top-right'}
            />}
            {loader && <Backdrop />}
        </div>
    )
}

export default SignIn
