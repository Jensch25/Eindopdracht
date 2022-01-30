import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

    const Recipe = React.createContext()
    export function useRecipes() {
        return useContext(Recipe)
    }

    export function RecipeProvider({ children }) {
        const [recipeData, setRecipeData] = useState([]);
        const [error, setError] = useState('');
        async function reload(formData) {
             try {
                let res = await axios(`https://api.edamam.com/api/recipes/v2?type=public&q=${formData?.recipe}&app_id=bc276825&app_key=9e1436b660669fc26647cc40b15a5c85&health=${formData?.dietary}`)
                setRecipeData(res?.data.hits)
                localStorage.setItem('recipe', JSON.stringify(res.data.hits))
                return res?.data.hits || [];
             } catch (error) {
                 setError(error)
                 console.log(error);
             }
    }
    useEffect( () => {
        const local =  JSON.parse(localStorage.getItem('recipe'))
        setRecipeData(local)
    },[])
    return (

        <Recipe.Provider value={{reload, recipeData, error}}>
            {children}
        </Recipe.Provider>
    )
    }
