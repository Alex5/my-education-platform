import {getAuth} from "firebase/auth";
import {doc, getDoc, setDoc, updateDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../index";
import {ICourseStatus} from "../redux/types";

export const UserRequests = {
    async startCourse(courseId: string): Promise<ICourseStatus> {
        const {currentUser} = await getAuth();

        if (!currentUser) {
            return Promise.reject('not_authorized');
        }

        await setDoc(doc(db, "courses", courseId, "members", currentUser.uid), {
            startDate: serverTimestamp(),
            start: true,
            viewedLessons: []
        });

        const memberRef = doc(db, "courses", courseId, "members", currentUser.uid);
        const memberSnap = await getDoc(memberRef)

        return memberSnap.data() as ICourseStatus;
    },
    async getCourseStatus(courseId: string): Promise<ICourseStatus> {
        const {currentUser} = await getAuth();

        if (!currentUser) {
            return Promise.reject('not_authorized');
        }

        const memberRef = doc(db, "courses", courseId, "members", currentUser.uid);
        const memberSnap = await getDoc(memberRef)

        return memberSnap.data() as ICourseStatus;
    },
    async nextLesson(courseId: string, newViewedLessonId: string): Promise<ICourseStatus>{
        const {currentUser} = await getAuth();

        if (!currentUser) {
            return Promise.reject('not_authorized');
        }

        const memberRef = doc(db, "courses", courseId, "members", currentUser.uid);
        const prevSnap = await getDoc(memberRef);
        const prevData = prevSnap.data() as ICourseStatus;

        await updateDoc(memberRef, {
            viewedLessons: [...prevData.viewedLessons, newViewedLessonId],
            updatedDate: serverTimestamp()
        });

        const memberSnap = await getDoc(memberRef)

        return memberSnap.data() as ICourseStatus;
    }
}