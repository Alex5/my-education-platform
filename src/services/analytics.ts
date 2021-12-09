import { logEvent } from "firebase/analytics";
import {analytics, auth} from "../fbconfig";

export const AnalyticsLogs = {
    pageView(page_path: string, page_title: string, course_id: string){
        const uid = auth.currentUser?.uid
        logEvent(analytics, 'page_view', {
            page_location: `${window.origin}${page_path}`, //"https://example.com/about",
            page_path: page_path, // "/about",
            page_title: page_title, // "About",
            user_id: uid,
            course_id: course_id
        });
        debugger
    }
}