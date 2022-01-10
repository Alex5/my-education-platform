import {getAuth} from "firebase/auth";
import {doc, getDoc, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../fbconfig";
import {nanoid} from "nanoid";
import {PublicRequests} from "./publicRequests";
import {ICourseStatus, ITestimonial} from "../redux/slices/coursesSlice/types";

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
    async nextLesson(courseId: string, newViewedLessonId: string): Promise<ICourseStatus> {
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
    },
    async markLessonViewed(courseId: string, lessonId: string): Promise<ICourseStatus> {
        const {currentUser} = await getAuth();

        if (!currentUser) {
            return Promise.reject('not_authorized');
        }

        const memberRef = doc(db, "courses", courseId, "members", currentUser.uid);
        const snapshot = await getDoc(memberRef);
        const memberData = snapshot.data() as ICourseStatus;

        await updateDoc(memberRef, {
            viewedLessons: memberData.viewedLessons.includes(lessonId)
                ? [...memberData.viewedLessons.filter(lesson => lesson !== lessonId)]
                : [...memberData.viewedLessons, lessonId],
            updatedDate: serverTimestamp()
        });

        const memberSnap = await getDoc(memberRef)

        return memberSnap.data() as ICourseStatus;
    },
    async addTestimonial(courseId: string, testimonial: ITestimonial) {
        const {currentUser} = await getAuth();

        if (!currentUser) {
            return Promise.reject('not_authorized');
        }

        await setDoc(doc(db, "courses", courseId, "testimonials", currentUser.uid), {
            date: serverTimestamp(),
            name: testimonial.name,
            text: testimonial.text,
            id: nanoid()
        });

        return await PublicRequests.getTestimonials(courseId)
    }
}