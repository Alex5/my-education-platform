import {collection, getDocs, query, where, doc, getDoc, updateDoc, orderBy, limit, setDoc} from "firebase/firestore";
import {EStatus} from "../redux/enums";
import {IYouTubeComment} from "../components/Testimonials/types";
import {ICourse, ILesson} from "../redux/slices/coursesSlice/types";
import {IUser} from "../redux/slices/userSlice/types";
import {db} from "../fbconfig";
import {IArticle} from "../redux/slices/articlesSlice/articles.types";
import {Collections} from "./types";
import {IAccount} from "../redux/slices/authorSlice/author.types";

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
    async getLesson(lessonId: string): Promise<ILesson> {
        const lessonRef = doc(db, "lessons", lessonId);
        const lessonSnap = await getDoc(lessonRef);

        if (lessonSnap.exists()) {
            return lessonSnap.data() as ILesson;
        } else {
            return {} as ILesson;
        }
    },
    async transformAccount(userId: string, status: string | number): Promise<IUser> {
        const userRef = doc(db, "users", userId);

        await updateDoc(userRef, {
            author: status === EStatus.author
        });

        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            return docSnap.data() as IUser;
        } else {
            return {} as IUser;
        }
    },
    async getTestimonials(videoId: string): Promise<IYouTubeComment[]> {
        const apiUrl = 'https://youtube.googleapis.com/youtube/v3/commentThreads'

        return fetch(`${apiUrl}?part=snippet&videoId=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=5`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data.items;
            });
    },
    async getCoursesByTag(tagName: string): Promise<ICourse[]> {
        const q = query(collection(db, "courses"), where(`tags`, 'array-contains', tagName))

        const querySnapshot = await getDocs(q);

        const courses: ICourse[] = [];

        querySnapshot.forEach((doc) => {
            const docData = doc.data() as ICourse;
            if (docData.published) {
                courses.push(docData);
            }
        });

        if (courses.length > 0) {
            return courses;
        } else {
            return [];
        }
    },
    async getTags(): Promise<string[]> {
        const querySnapshot = await getDocs(collection(db, "courses"));

        const tags: string[] = [];

        querySnapshot.forEach((doc) => {
            if (doc.id !== '--coursesNames--') {
                const docData = doc.data() as ICourse;
                docData.published && tags.push(...docData.tags);
            }
        });

        return tags;
    },
    async getNewCourses(courseLimit: number): Promise<ICourse[]> {
        const q = query(collection(db, "courses"),
            where("published", "==", true),
            orderBy("createdAt", "desc"),
            limit(courseLimit))

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
    async getArticles() {
        const q = query(collection(db, Collections.ARTICLES), where("published", "==", true))

        const querySnapshot = await getDocs(q);

        const articles: IArticle[] = [];

        querySnapshot.forEach((doc) => {
            articles.push(doc.data() as IArticle);
        });

        if (articles.length > 0) {
            return articles;
        } else {
            return [];
        }
    },
    async getArticleById(articleId: string): Promise<IArticle> {
        const articleRef = doc(db, Collections.ARTICLES, articleId);
        const articleSnap = await getDoc(articleRef);

        if (articleSnap.exists()) {
            return articleSnap.data() as IArticle;
        } else {
            return {} as IArticle;
        }

    },
    async getAuthorAccount(uid: string, accountId: string): Promise<IAccount> {
        const docRef = doc(db, `users/${uid}/accounts`, accountId);
        const docSnap = await getDoc(docRef);
        return docSnap.data() as IAccount;
    },
}
