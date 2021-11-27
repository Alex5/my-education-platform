import {
    Auth,
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider
} from "firebase/auth";
import {doc, setDoc, getDoc} from "firebase/firestore";
import {db} from "../index";
import {IUser} from "../redux/types";

export class AuthRequests {
    public static async signIn(auth: Auth, providerName: keyof typeof provider): Promise<IUser> {
        const provider = {
            'google': new GoogleAuthProvider(),
            'github': new GithubAuthProvider(),
        }

        return signInWithPopup(auth, provider[providerName])
            .then(async (result) => {
                const docSnap = await getDoc(doc(db, "users", result.user.uid))

                if (docSnap.exists()) {
                    return docSnap.data()
                } else {
                    await setDoc(doc(db, 'users', result.user.uid), {
                        appointment: '',
                        author: false,
                    })

                    const docSnap = await getDoc(doc(db, "users", result.user.uid))

                    return docSnap.data()
                }
            }).catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                // const email = error.email;
                // const credential = GoogleAuthProvider.credentialFromError(error);
                if (errorMessage) {
                    return error.message;
                }
            });
    }

    public static async getUserInfo(uid: string): Promise<IUser> {
        const docSnap = await getDoc(doc(db, "users", uid))

        if (docSnap.exists()) {
            return docSnap.data() as IUser
        } else {
            return {} as IUser;
        }
    }
}