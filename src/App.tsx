import {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setFirebaseUser, setUser, setUserLoading} from "./redux/slices/userSlice/userSlice";
import {getAuth} from "firebase/auth"
import AppRouter from "./router";
import {useAuthState} from "react-firebase-hooks/auth";
import {Loading} from "@geist-ui/core";
import {firebaseApp} from "./fbconfig";
import {AuthRequests} from "./api/authRequests";

function App() {
    const dispatch = useDispatch();
    const auth = getAuth(firebaseApp);
    const [user, loading] = useAuthState(auth);

    const handleUserLoading = async () => {
        if (user) {
            dispatch(setFirebaseUser(user))

            const uid = user.uid;

            dispatch(setUserLoading(true));
            const userInfo = await AuthRequests.getUserInfo(uid);
            dispatch(setUser(userInfo));
            dispatch(setUserLoading(false));
        }
    }

    useEffect(() => {
        handleUserLoading()
    }, [user])

    return loading ? <Loading/> : <AppRouter/>;
}

export default App;
