import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { auth, db } from '../hooks/firebase';
import NavBar from "../components/NavigationBar/NavBar";
import { validate } from "../Utils/validate";
import Warning from "../components/Warning/Warning";
import Backdrop from '../UI/Backdrop/Backdrop';

    const SignUp = () => {
        const navigate = useNavigate()
        const [error,setError] = useState({});
        const [loader,setLoader] = useState(false);
        const [list,setList] = useState([])
        const [signupFormData,setSignupFormData] = useState({});

        const changeHandler = (e) => {
            const signUpClone = {
                ...signupFormData,
                [e.target.name]: e.target.value
        }
        setSignupFormData(signUpClone)
        Object.keys(signUpClone).forEach(e => {
            const validateFields = validate({name:e,value:signUpClone[e]})
            setError(err => ({...err,...validateFields}))

        });

        console.log(signupFormData);
    }

    const formSubmit = async(e) => {
        e.preventDefault();
        setLoader(!loader);
        try {
            const res = await auth.createUserWithEmailAndPassword(signupFormData.email, signupFormData.password);
            const user = await auth.currentUser;
            await user.sendEmailVerification()
            await db.collection("users").doc(user.uid).set({
                uid:res.user.uid,
                firstName:signupFormData.firstName,
                lastName:signupFormData.lastName,
                authProvider:"local",
                email:signupFormData.email
            });
            setList([...list,{
                id:Math.floor((Math.random() * 101) + 1),
                title:"Success",
                description: "SignUp Successfully",
            }])

            setTimeout(() => {
                navigate("/");
                setList([])
            },2000)

            setLoader(!loader);
        } catch (error) {
            setLoader(false);
            setList([...list,{
                id:Math.floor((Math.random() * 101) + 1),
                title:"Danger",
                description:error.message,
            }])
            setTimeout(() => {
                setList([])
            },2000);
        }

    }
    return (
        <div>
            <NavBar />
            <div className="login-content">
                <div className="container">
                    <div className="login-bg-blue">
                        <div className="login-main-content">
                            <h2 className="login-title">Sign Up</h2>
                            <p className="login-text">Register New Account</p>
                            <form className="login-form" onSubmit={formSubmit}>
                                <div className="form-group login-group">
                                    <img src={require("../assets/user.png")} className="login-icon" alt="login"/>
                                    <input type="text" className="input-form input-login" placeholder="Enter your FirstName" name="firstName" value={signupFormData.firstName} onChange={changeHandler}  />
                                    {error?.firstName && (<p className="error">
                                        {error?.firstName}
                                    </p>)}
                                </div>
                                <div className="form-group login-group">
                                    <img src={require("../assets/user.png")} className="login-icon" alt="" />
                                    <input type="text" className="input-form input-login" placeholder="Enter your LastName" name="lastName" value={signupFormData.lastName} onChange={changeHandler}  />
                                    {error?.lastName && (<p className="error">
                                        {error?.lastName}
                                    </p>)}
                                </div>
                                <div className="form-group login-group">
                                    <img src={require("../assets/user.png")} className="login-icon"  alt="login"/>
                                    <input type="text" className="input-form input-login" placeholder="Enter your Email" name="email" value={signupFormData.email} onChange={changeHandler}  />
                                    {error?.email && (<p className="error">
                                        {error?.email}
                                    </p>)}
                                </div>
                                <div className="form-group login-group">
                                    <img src={require("../assets/password.png")} className="login-icon" alt="" />
                                    <input type="password" className="input-form input-login" placeholder="Enter your Password" name="password" value={signupFormData.password} onChange={changeHandler}  />
                                    {error?.password && (<p className="error">
                                        {error?.password}
                                    </p>)}
                                </div>
                                <div className="form-btn">
                                    <button type="submit" className="submit-btn login-btn">Sign Up</button>
                                </div>
                                <p style={{marginTop:'2%'}}> This account already exists </p>
                                <div className="form-btn">
                                    <button type="submit" className="submit-btn login-btn" onClick={() => navigate('/login')}>Log In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {list.length > 0 &&  <Warning
                warningList={list}
                position={'top-right'}
            />}
            {loader && <Backdrop /> }
        </div>
    )
}

export default SignUp

