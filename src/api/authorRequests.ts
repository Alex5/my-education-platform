import {
    collection,
    doc,
    getDocs,
    query,
    where,
    deleteDoc,
    addDoc,
    updateDoc,
    writeBatch, getDoc, serverTimestamp, setDoc
} from "firebase/firestore";
import {db} from "../fbconfig";
import {getAuth} from "firebase/auth";
import {nanoid} from 'nanoid'
import {ICourse, ICourseStatus, ILesson} from "../redux/slices/coursesSlice/types";
import {IAccount} from "../redux/slices/userSlice/types";

export class AuthorRequests {
    public static async getAuth() {
        const {currentUser} = await getAuth();
        return currentUser;
    }

    public static async getCourses(uid: string): Promise<ICourse[]> {
        const q = query(collection(db, "courses"), where("ownerId", "==", uid));

        try {
            const querySnapshot = await getDocs(q);
            const docs: ICourse[] = [];
            querySnapshot.forEach((doc) => {
                docs.push(doc.data() as ICourse);
            });
            return docs;
        } catch (e) {
            return Promise.reject(e);
        }

    }

    public static async getLessons(courseId: string): Promise<ILesson[]> {
        const user = await this.getAuth()

        if (user) {
            const q = query(collection(db, "lessons"), where("courseId", "==", courseId));
            const querySnapshot = await getDocs(q);

            const docs: ILesson[] = [];

            querySnapshot.forEach((doc) => {
                docs.push(doc.data() as ILesson);
            });
            return docs;
        } else {
            // No user is signed in.
            return [];
        }
    }

    public static async saveLessons(lessons: ILesson[], courseId: string) {
        const q = query(collection(db, "lessons"), where("courseId", "==", courseId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref);
            });
        }

        const batch = writeBatch(db);

        lessons.forEach(lesson => {
            const lessonRef = doc(db, "lessons", nanoid());
            batch.set(lessonRef, {
                ...lesson,
                lessonId: lessonRef.id,
                videoId: lesson.videoLink.split("embed/")[1] || ''
            }, {merge: true});
        })

        await batch.commit();

        const newLessons = await this.getLessons(lessons[0].courseId)

        await this.updateCourseLessons(newLessons, courseId);

        return newLessons;
    }

    public static async updateCourseLessons(lessons: ILesson[], courseId: string) {
        const courseRef = doc(db, "courses", courseId);

        await updateDoc(courseRef, {
            lessons: lessons.map(lesson => ({
                lessonId: lesson.lessonId,
                name: lesson.name,
                position: lesson.position
            }))
        })
    }

    public static async addCourse(course: ICourse): Promise<ICourse[]> {
        const docRef = await addDoc(collection(db, "courses"), {...course, createdAt: serverTimestamp()});
        const courseRef = doc(db, "courses", docRef.id);

        await updateDoc(courseRef, {
            courseId: courseRef.id
        });

        await this.saveLessons([{
            lessonId: '',
            name: 'Пример урока 1',
            courseId: courseRef.id,
            description: 'Описание урока.',
            homeWorks: [{
                code: '-',
                description: `Описание домашнего задания.`
            }],
            videoLink: '',
            videoId: '',
            position: 1
        }], courseRef.id);

        return await this.getCourses(course.ownerId);
    }

    public static async deleteCourse(courseId: string, uid: string): Promise<ICourse[]> {
        await deleteDoc(doc(db, "courses", courseId));

        const q = query(collection(db, "lessons"), where("courseId", "==", courseId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });

        return this.getCourses(uid).then((courses) => {
            return courses;
        })
    }

    public static async updateCourse(courseId: string, key: string, data: string | boolean | number | {}): Promise<ICourse> {
        const courseRef = doc(db, "courses", courseId);

        await updateDoc(courseRef, {
            [key]: data,
            updatedAt: serverTimestamp()
        });

        const docSnap = await getDoc(courseRef)

        if (docSnap.exists()) {
            return docSnap.data() as ICourse
        } else {
            return {} as ICourse;
        }
    }

    public static async addAccount(account: IAccount): Promise<IAccount[]> {
        const {currentUser} = await getAuth();

        if (!currentUser) {
            return Promise.reject('not_authorized');
        }

        const docId = nanoid();

        await setDoc(doc(db, "users", currentUser.uid, "accounts", docId), {...account, id: docId});

        return this.getAccounts();
    }

    public static async getAccounts(): Promise<IAccount[]>{
        const {currentUser} = await getAuth();

        if (!currentUser) {
            return Promise.reject('not_authorized');
        }

        const querySnapshot = await getDocs(collection(db, "users", `${currentUser.uid}/accounts`));

        const accounts: IAccount[] = [];
        querySnapshot.forEach((doc) => {
            accounts.push(doc.data() as IAccount)
        });

        return accounts;
    }
}