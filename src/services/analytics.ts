import { logEvent } from "firebase/analytics";
import {analytics} from "../index";

export const AnalyticsLogs = {
    pageView(page_path: string, page_title: string){
        logEvent(analytics, 'page_view', {
            page_location: `${window.origin}${page_path}`, //"https://example.com/about",
            page_path: page_path, // "/about",
            page_title: page_title // "About"
        });
    }
}