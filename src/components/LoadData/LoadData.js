import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../../context/AuthContext';
import { auth } from '../../hooks/firebase';
import NavBar from "../NavigationBar/NavBar";
import { validate } from '../../Utils/validate';
import "./LoadData.css";
import Backdrop from '../../UI/Backdrop/Backdrop';

const LoadData = () => {
    const { recipeData, reload } = useRecipes();
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const queryParams = Object.fromEntries(new URLSearchParams(window.location.search))
    const [formData, setFormData] = useState(queryParams);
    const [error,setError] = useState({});
    const [loader,setLoader] = useState(false);
    const user = auth.currentUser
    const setPlanner = (e) => {
        e.preventDefault()
        if (!user || !Object.keys(formData).length) return;
        navigate(`/planner?dietary=${formData.dietary}&recipe=${e.target.id}`);
    }
    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const cloneObject = {
            ...formData,
            [name]:value
        }
        setFormData(cloneObject)
        Object.keys(cloneObject).forEach(k => {
            const validateFields = validate({name:k,value:cloneObject[k]})
            setError(e => ({...e,...validateFields}))
        })
    }
    const formSubmit = async (e) => {
        e.preventDefault();
        setLoader(!loader);
        try {
            let r = await reload(formData);
            if(r){
                setLoader(false);
                setData(r);
            }
        } catch (error) {
            setLoader(false);
        }

    }
    useEffect(() => {
        if (recipeData.length) setData(recipeData)
    }, [recipeData]);


    return (
        <div>
            <NavBar />
            <div className="recipe-content">
                <div className="container">
                    <div className="recipe-list-content">
                        <form className="recipe-form-search">
                            <div className="form-group login-group">
                                <input type="text" className="input-form input-login" placeholder="Enter an" value={formData?.recipe} onChange={changeHandler} name="recipe" />
                                {error?.recipe && (<p className="error">
                                    {error?.recipe}
                                </p>)}
                            </div>
                            <div className="form-group login-group">
                                <input type="text" className="input-form input-login" placeholder="Paleo" value={formData?.dietary} onChange={changeHandler} name="dietary" />
                                {error?.dietary && (<p className="error">
                                    {error?.dietary}
                                </p>)}
                            </div>
                            <div className="form-btn">
                                <button type="submit" onClick={formSubmit} className="submit-btn login-btn">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <div className="grid-wrapper">
                            {data.map((d, i) => (
                                <div className="grid-item" onClick={setPlanner} id={d.recipe.label} key={i}>
                                    <div className="recipe-list-img">
                                        <img src={d.recipe.image} id={d.recipe.label} alt="" />
                                    </div>
                                    <div className="recipe-list-title">
                                        <p id={d.recipe.label}>{d.recipe.label}</p>
                                    </div>
                                    <div className="hover-effect" id={d.recipe.label} onClick={setPlanner}>View <br /> Recipe</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {loader && <Backdrop />}
        </div>

    )
}

export default LoadData

