import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Homepage from "./pages/Homepage";
import { RecipeProvider } from './context/AuthContext';
import LoadData from './components/LoadData/LoadData';
import Planner from './pages/Planner';
import FireHook from './hooks/fireHook';
import './App.css';
import "../src/components/NavigationBar/NavBar.css";


    function App() {
        const user = FireHook()
        return (
            <>
                <RecipeProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/sign-up' element={user ? <Homepage />:
                                <SignUp />}
                            />
                            <Route path='/login' element={user ? <Homepage />:
                                <SignIn />}
                            />
                            <Route path='/forgot-password' element={user ? <Homepage/>:
                                <ForgotPassword />}
                            />
                            <Route path='/' element={<Homepage/>}
                            />
                            <Route path='/next' element={<LoadData/>}
                            />
                            <Route path='/planner' element={<Planner/>}
                            />
                        </Routes>
                    </BrowserRouter>
                </RecipeProvider>
            </>
        );
    }


export default App;
