import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { auth, db } from '../hooks/firebase';
import { v4 as uuidv4 } from 'uuid';
import NavBar from "../components/NavigationBar/NavBar";
import './Planner.css';
import { useRecipes } from '../context/AuthContext';

    const Planner = () => {
        const params = Object.fromEntries(new URLSearchParams(window.location.search));
        const [id, setId] = useState('')
        const [plannerData, setPlannerData] = useState([])
         Object.keys(params).forEach(d => params[d] = decodeURI(params[d]));
        const [recipe, setRecipe] = useState(params.recipe || '');
        const [ingredients, setIngredients] = useState([]);
        const navigate = useNavigate()
        const user = auth.currentUser
        const user_document = db.collection('users').doc(user?.uid);
        const { recipeData } = useRecipes();

        const AddRecipe = (e) => {
            e.preventDefault()
            if(id) return editRecipe(id)
            user_document.collection('recipes').doc(recipe).set({
            recipe,
            id: uuidv4()
            })
            setRecipe('')
    }
        const clearRecipe = (e) => {
            e.preventDefault()
            setRecipe('')
    }
        const getRecipe = (e) => {
            user_document.collection('recipes').doc(e.target.id).get().then(d => {
            const {recipe:recipeData,id} = d.data()
            setRecipe(recipeData)
            setId(id)
        })
    }
        const editRecipe = (id) => {
            if (!recipe || !id) return;
            user_document.collection('recipes').where("id", "==", id).get().then(q => {
            q.docs.forEach(d => {
                user_document.collection('recipes').doc(d.id).update({
                    recipe
                })
            })
                setId('')
                setRecipe('')

        })


    }
        const deleteRecipe = (e) => {
            user_document.collection('recipes').where("id", "==", e.target.id).get().then(q => {
            q.docs.forEach(d => {
                d.ref.delete()
            })
        })
    }
        useEffect(() => {
            if (!user) navigate('/login')
            let unSubScribe = user_document.collection('recipes').onSnapshot((doc) => {
                let data = []
                doc.docs.forEach(d => {
                    data.push(d.data())
                })
                setPlannerData(data)
        })
            return () => unSubScribe()
        }, [user, user_document, navigate])

        useEffect(() => {
            const ingredient = recipeData.filter((item, i) => item.recipe.label === recipe);
            setIngredients(ingredient);
            }, [recipe, recipeData])

    return (
        <div>
            <NavBar />
            <div className="planner-wrapper">
                <div className="container">
                    <div className="planner-inner">
                        <div className="planner-main">
                            <h2 className="planner-title">Recipe Manager</h2>
                            <form className="planner-form">
                                <div className="form-group login-group">
                                    <input type="text" className="input-form input-login" placeholder="Add recipe" value={recipe} onChange={(e) => setRecipe(e.target.value)} name="recipe" />
                                </div>
                                <div className="manager-btn">
                                    <div className="form-btn">
                                        <button type="submit" className="submit-btn" onClick={AddRecipe}>Submit</button>
                                    </div>
                                    <div className="form-btn">
                                        <button type="submit" className="submit-btn" onClick={clearRecipe}>Clear</button>
                                    </div>
                                </div>
                            </form>
                            <div className="planner-list-manager">
                                {plannerData.map((i, k) => (
                                    <div className="planner-item" key={k}>
                                        <div className="planner-lists">{i.recipe}</div>
                                        <div className="planner-edit">
                                            <span> <img src={require('../assets/delete.png')} onClick={deleteRecipe} id={i.id} alt="" /></span>
                                            <span> <img src={require("../assets/edit.png")} onClick={getRecipe} id={i.recipe} alt="" /></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ingredients card */}
            <div className="ingredients-card">
                {ingredients.length > 0 && <img src={ingredients[0].recipe.image} alt="img" />}
                <h5>Item : {ingredients.length > 0 && ingredients[0].recipe.label}</h5>
                <h3 style={{margin: '20px 0px'}}>Ingredients: </h3>
                <ul>
                    {ingredients.length > 0 && ingredients[0].recipe.ingredientLines.map((ing, index)=> (<li key={index}>{ing}</li>))}
                </ul>
            </div>
        </div>

    )
}

export default Planner
