import {
    collection,
    doc,
    getDocs,
    query,
    where,
    deleteDoc,
    addDoc,
    updateDoc,
    writeBatch, getDoc
} from "firebase/firestore";
import {db} from "../index";
import {ICourse, ILesson, IUser} from "../redux/types";
import {getAuth} from "firebase/auth";
import {nanoid} from 'nanoid'

export class AuthorRequests {
    public static async getAuth() {
        const {currentUser} = await getAuth();
        return currentUser;
    }

    public static async getCourses(): Promise<ICourse[]> {
        const user = await this.getAuth()

        if (user) {
            const q = query(collection(db, "courses"), where("ownerId", "==", user.uid));

            const querySnapshot = await getDocs(q);
            const docs: ICourse[] = [];
            querySnapshot.forEach((doc) => {
                docs.push(doc.data() as ICourse);
            });
            return docs;
        }  else {
            return [];
        }
        // else {
        //     const q = query(collection(db, "courses"), where("published", "==", true));
        //
        //     const querySnapshot = await getDocs(q);
        //     const docs: ICourse[] = [];
        //     querySnapshot.forEach((doc) => {
        //         docs.push(doc.data() as ICourse);
        //     });
        //     return docs;
        // }
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

    public static async addLessons(lessons: ILesson[], courseId: string) {
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
            batch.set(lessonRef, {...lesson, lessonId: lessonRef.id}, {merge: true});
        })

        await batch.commit();

        return this.getLessons(lessons[0].courseId).then((lessons) => {
            return lessons;
        })
    }

    public static async addCourse(course: ICourse): Promise<ICourse[]> {
        const docRef = await addDoc(collection(db, "courses"), course);
        const courseRef = doc(db, "courses", docRef.id);

        await updateDoc(courseRef, {
            courseId: courseRef.id
        });

        await this.addLessons([{
            lessonId: '',
            name: 'Пример урока 1',
            courseId: courseRef.id,
            description: 'Краткое описание урока',
            homeWorks: [{
                code: '-',
                description: `Отобразите сообщение «Я люблю ${course.name}!».`
            }],
            videoLink: 'https://www.youtube.com/embed',
        }], courseRef.id);

        return this.getCourses().then((courses) => {
            return courses;
        })
    }

    public static async deleteCourse(courseId: string) {
        await deleteDoc(doc(db, "courses", courseId));
        const q = query(collection(db, "lessons"), where("courseId", "==", courseId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
        return this.getCourses().then((courses) => {
            return courses;
        })
    }

    public static async updateCourse(courseId: string, key: string, data: string | boolean | number | {}): Promise<ICourse> {
        const courseRef = doc(db, "courses", courseId);

        await updateDoc(courseRef, {
            [key]: data
        });

        const docSnap = await getDoc(courseRef)

        if (docSnap.exists()) {
            return docSnap.data() as ICourse
        } else {
            return {} as ICourse;
        }
    }
}