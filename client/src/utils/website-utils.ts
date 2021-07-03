import PropertiesConstants from "@/constants/properties-constants";
import router from "@/router";

export default class WebsiteUtils {
    /**
     * Switches current view
     *
     * @param view
     */
    public static switchVue(view: string): void {
        router.push(`/${view}`);
    }

    /**
     * Switches current page
     *
     * @param page
     */
    public static switchPage(page: string): void {
        log(`/dashboard/${page}`);
    }

    /**
     * Updates page title
     *
     * @param prefix
     */
    public static updatePageTitle(prefix: string): void {
        const title =
            prefix.substr(0, 1).toUpperCase() +
            prefix.substr(1) +
            PropertiesConstants.titleSuffix;

        if (document.title !== title) {
            document.title = title;
        }
    }
}
