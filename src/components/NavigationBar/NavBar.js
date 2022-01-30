import React, {useEffect, useState} from 'react';
import { auth } from '../../hooks/firebase';
import { useNavigate } from 'react-router';
import "./NavBar.css";

const NavBar = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    const user = auth.currentUser;
    const Logout = () => {
        localStorage.clear();
        auth.signOut();
        navigate("/")
    }

    useEffect(() => {
        setUserName(JSON.parse(localStorage.getItem("name")));
    },
        []);

    return (
        <div className="top-section">
            <div className="container">
                <div className="top-section-content">
                    <div className="arrow-content">
                        <div className="prev-arrow" onClick={() => navigate(-1)}>
                            <img src={require("../../assets/chevron-left.png")} alt=""/>
                        </div>
                    </div>
                    { user &&
                    <div className="nav-profile">
                        <div className="nav-profile-items">
                            <img style={{height: "40px", width: "40px"}} src={require("../../assets/user-round.png")} alt=""/>
                            <div>
                                {userName !== "" && userName}
                            </div>
                            <button onClick={Logout} className="nav-logoutBtn">Logout</button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default NavBar


