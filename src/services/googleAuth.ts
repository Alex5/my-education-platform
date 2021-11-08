import {Auth, AuthProvider, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

class GoogleAuth {
    async signIn(auth: Auth) {
        const provider: AuthProvider = new GoogleAuthProvider();

        return signInWithPopup(auth, provider)
            .then((result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential?.accessToken;
                return result.user;
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
}

export default new GoogleAuth();