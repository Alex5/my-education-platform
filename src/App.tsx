import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setUser} from "./redux/slices/userSlice/userSlice";
import {AuthRequests} from "./api/authRequests";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import AppRouter from "./router";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const userInfo = await AuthRequests.getUserInfo(uid)
                dispatch(setUser(userInfo));
            }
        });
    }, [])

    return <AppRouter/>;
}

export default App;
