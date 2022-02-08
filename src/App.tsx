import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setFirebaseUser, setUser, setUserLoading } from "./redux/slices/userSlice/userSlice";
import { getAuth } from "firebase/auth"
import AppRouter from "./router/AppRouter";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loading } from "@geist-ui/core";
import { firebaseApp } from "./fbconfig";
import { AuthRequests } from "./api/authRequests";
import AppLoader from './components/shared/AppLoader';

function App() {
    const dispatch = useDispatch();
    const auth = getAuth(firebaseApp);
    const [user, loading] = useAuthState(auth);

    const handleUserLoading = async () => {
        if (user) {
            dispatch(setFirebaseUser({
                uid: user.uid,
                photoURL: user.photoURL || '',
                email: user.email || '',
                displayName: user.displayName || ''
            }))

            const { uid} = user;

            dispatch(setUserLoading(true));
            const userExist = await AuthRequests.checkUserExist(uid);

            const userInfo = userExist
                ? await AuthRequests.getUserInfo(uid)
                : await AuthRequests.createUser(uid)

            dispatch(setUser(userInfo));
            dispatch(setUserLoading(false));
        }
    }

    useEffect(() => {
        handleUserLoading()
    }, [user])

    return loading ? <AppLoader/> : <AppRouter />;
}

export default App;
