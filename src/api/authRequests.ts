import {
    Auth,
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../fbconfig";
import { IUser } from "../redux/slices/userSlice/types";

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
                        uid: result.user.uid
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

    public static async checkUserExist(uid: string): Promise<boolean> {
        const docSnap = await getDoc(doc(db, "users", uid))
        return docSnap.exists() ? true : false;
    }

    public static async createUser(uid: string): Promise<IUser> {
        await setDoc(doc(db, 'users', uid), {
            author: false,
        })

        const docSnap = await getDoc(doc(db, "users", uid))

        return docSnap.data() as IUser;
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