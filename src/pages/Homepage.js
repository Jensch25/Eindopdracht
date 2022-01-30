import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { auth } from "../hooks/firebase";
import { useRecipes } from "../context/AuthContext";
import { validate } from "../Utils/validate";
import Backdrop from "../UI/Backdrop/Backdrop";
import "./Homepage.css";
import SideDrawer from "../UI/SideDrawer/HamburgerMenu/SideDrawer";
import HamburgerMenu from "../UI/SideDrawer/HamburgerMenu/Hamburger";

    const Homepage = () => {
        const [recipeData, setRecipeData] = useState({ health: "" })
        const navigate = useNavigate()
        const [error, setError] = useState({})
        const [loader, setLoader] = useState(false);
        const [userName, setUserName] = useState('');
        const [openSideBar, setOpenSideBar] = useState(false);

        const user = auth.currentUser
        const { reload } = useRecipes();

        useEffect(() => {
            setUserName(JSON.parse(localStorage.getItem('name')));
        }, []);

    let data = [
        "alcohol-cocktail",
        "alcohol-free",
        "celery-free",
        "crustacean-free",
        "dairy-free",
        "DASH",
        "egg-free",
        "fish-free",
        "fodmap-free",
        "gluten-free",
        "immuno-supportive",
        "keto-friendly",
        "kidney-friendly",
        "kosher",
        "low-fat-abs",
        "low-potassium",
        "low-sugar",
        "lupine-free",
        "Mediterranean",
        "mollusk-free",
        "mustard-free",
        "no-oil-added",
        "paleo",
        "peanut-free",
        "pescatarian",
        "pork-free",
        "red-meat-free",
        "sesame-free",
        "shellfish-free",
        "soy-free",
        "sugar-conscious",
        "sulfite-free",
        "tree-nut-free",
        "vegan",
        "vegetarian",
        "wheet-free",
    ]
    const formSubmit = async (e) => {
        setLoader(!loader)
        e.preventDefault()
        await reload({ recipe: recipeData.search, dietary: recipeData.health })
        navigate(`/next?recipe=${recipeData.search}&dietary=${recipeData.health}`)

        setLoader(!loader)
    }
    const changeHandler = (e) => {
        const cloneRecipe = {
            ...recipeData,
            [e.target.name]: e.target.value,
        }
        setRecipeData(cloneRecipe)
        Object.keys(cloneRecipe).forEach((k) => {
            const validateFields = validate({ name: k, value: cloneRecipe[k] })
            setError((e) => ({ ...e, ...validateFields }))
        })
    }
    const Logout = () => {
        auth.signOut()
        localStorage.clear()
        navigate("/")
    };


    const sideBarHandler = ()=> {
        setOpenSideBar(!openSideBar);
    }


    const homeComponent = user ? (
        <div className="recipe-input-list-content">
            <div
                style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px",}}
            >
                <div className="back-home">
                    <div className="back-home-text">
                        {" "}
                        Back to{" "}
                        <img
                            src={require("../assets/home.png")}
                            onClick={() => navigate(-1)}
                            alt=""
                        />
                    </div>
                </div>
                <div className="login-bg-blue">
                    <div className="login-main-content">
                        <div className="input-list">
                            <form className="login-form" onSubmit={formSubmit}>
                                <div className="form-group login-group">
                                    <input type="text" className="input-form input-login" placeholder="Search ingredient here.." name="search" value={recipeData.search} onChange={changeHandler}/>
                                </div>
                                <div className="form-group login-group">
                                    <select className="input-form input-login" aria-label="Default select example" onChange={changeHandler} name="health">
                                        <option value="Open this select menu">Open this select menu</option>
                                        {data.map((i, d) => (
                                            <option value={i} key={d}>
                                                {i}
                                            </option>
                                        ))}
                                    </select>
                                    {recipeData.health && (
                                        <div className="recipe-select-list">
                                            {data.map((h, i) => (
                                                <div className="recipe-check-box">
                                                    <input type="radio" id={h} name={h} value={h} checked={h === recipeData.health} key={i} onChange={changeHandler} className="form-check-input"/>
                                                    <label id={h}>{h}</label> <br />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="form-btn">
                                    <button type="submit" className="submit-btn login-btn">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="user-profile">
                    <div className="profile-items">
                        <img style={{height: "40px", width: "40px"}} src={require("../assets/user-round.png")} alt="" />
                        <p>{userName !== '' && userName}</p>
                        <button className="logoutBtn" onClick={Logout}>
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <header className="header">
                <div className="container">
                    <div className="nav">
                        <input type="checkbox" id="nav-check" />
                        <div className="nav-btn">
                            <label htmlFor="nav-check">
                                <span />
                                <span />
                                <span />
                            </label>
                        </div>
                        <HamburgerMenu openSideBar={sideBarHandler}/>
                        <div className="nav-links left-side">
                            <Link to="/" className="nav-item">
                                Home
                            </Link>
                            <Link to="/about" className="nav-item">
                                About
                            </Link>
                            <Link to="/planner" className="nav-item">
                                Recipe Manager
                            </Link>
                            <Link to="/contact" className="nav-item">
                                Contact
                            </Link>
                        </div>
                        <div className="right-side nav-links">
                            <Link to="/sign-up" className="nav-item">
                                Sign Up
                            </Link>
                            <Link to="/login" className="nav-item">
                                Sign In
                            </Link>
                            <Link to="/" className="nav-item user-img">
                                <img style={{height: "30px", width: "30px"}} src={require("../assets/user-round.png")} alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <section className="main-content">
                <div className="container">
                    <div className="recipe-manager-content">
                        <div className="recipe-form">
                            <h2 className="recipe-title">Dietary Recipe Manager</h2>
                            <p className="recipe-para">
                                Create your finest food and plan your every day recipies, like
                                never before.
                            </p>
                            <h4 className="recipe-subtitle">Start your creations!</h4>
                            <form className="recipe-form-content" onSubmit={formSubmit}>
                                <div className="form-group">
                                    <input placeholder="Search ingrediënt here ..." type="text" className="input-form" name="search" value={recipeData.search} onChange={changeHandler} required/>
                                    {error?.search && <p className="error">{error?.search}</p>}
                                </div>
                                <div className="form-group">
                                    <select onChange={changeHandler} className="input-form" name="health">
                                        <option value="">Open this select menu</option>
                                        {data.map((i, d) => (
                                            <option value={i} key={d}>
                                                {i}
                                            </option>
                                        ))}
                                    </select>
                                    {error?.health && <p className="error">{error?.health}</p>}
                                </div>
                                <div className="form-btn">
                                    <button type="submit" className="submit-btn">
                                        Submit
                                        <span className="submit-img">
                                            <img src={require("../assets/bright-button.png")} alt=""/>
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

    return (
        <div>
            {loader && <Backdrop />}
            {homeComponent}
            <SideDrawer show={openSideBar} handler={sideBarHandler}/>
        </div>
    )
}

export default Homepage
