import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "../index";
import {ICourse, ICourseInfo, ILessonInfo} from "../redux/types";
import {getAuth} from "firebase/auth";


export class FirestoreQueries {
    public static async getAuth(){
        const {currentUser} = await getAuth();
        return currentUser;
    }

    public static async getCourses() {
        const user = await this.getAuth()

        if (user) {
            const q = query(collection(db, "courses"), where("ownerId", "==", user.uid));

            const querySnapshot = await getDocs(q);
            const docs: ICourse[] = [];
            querySnapshot.forEach((doc) => {
                docs.push(doc.data() as ICourse);
            });
            return docs;
        } else {
            // No user is signed in.
            return [];
        }
    }

    public static async getCourseInfo(courseId: string){
        const docRef = doc(db, "courses-info", courseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as ICourseInfo;
        } else {
            return {} as ICourseInfo;
        }
    }

    public static async getLessonInfo(lessonId: string){
        const docRef = doc(db, "lessons-info", lessonId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as ILessonInfo;
        } else {
            console.log("No such document!");
            return {} as ILessonInfo;
        }
    }
}