import {useEffect, useState} from 'react';
import { auth } from './firebase';

    const FireHook = () => {
    const [current, setCurrentUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
        })
    },[])
    return current
    }


export default FireHook
