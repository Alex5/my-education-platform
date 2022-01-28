import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {initializeAppCheck, ReCaptchaV3Provider} from "firebase/app-check"

const firebaseApp = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

// @ts-ignore
window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_KEY || ''),
    isTokenAutoRefreshEnabled: true
});

export const db = getFirestore(firebaseApp);
export const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);
