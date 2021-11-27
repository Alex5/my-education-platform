import {collection, getDocs, query, where, doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../index";
import {IAuthor, ICourse, ILesson, IUser} from "../redux/types";

export const PublicRequests = {
    async getCourse(courseId: string): Promise<ICourse> {
        const docRef = doc(db, "courses", courseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as ICourse;
        } else {
            return {} as ICourse;
        }
    },
    async getCourses(direction: string): Promise<ICourse[]> {
        const q = query(collection(db, "courses"),
            where("published", "==", true),
            where("direction", "==", direction));

        const querySnapshot = await getDocs(q);

        const courses: ICourse[] = [];

        querySnapshot.forEach((doc) => {
            courses.push(doc.data() as ICourse);
        });

        if (courses.length > 0) {
            return courses;
        } else {
            return [];
        }
    },
    async getCoursesSize(direction: string): Promise<number> {
        const q = query(collection(db, "courses"),
            where("published", "==", true),
            where("direction", "==", direction));

        const querySnapshot = await getDocs(q);

        return querySnapshot.size;
    },
    async getLessons(courseId: string){
        const q = query(collection(db, "lessons"),
            where("courseId", "==", courseId))

        const querySnapshot = await getDocs(q);

        const lessons: ILesson[] = [];

        querySnapshot.forEach((doc) => {
            lessons.push(doc.data() as ILesson);
        });

        if (lessons.length > 0) {
            return lessons;
        } else {
            return [];
        }
    },
    async transformToAuthor(userId: string): Promise<IUser>{
        const userRef = doc(db, "users", userId);

        // Set the "capital" field of the city 'DC'
        await updateDoc(userRef, {
            author: true
        });

        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data() as IUser;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return {} as IUser;
        }
    }
}
