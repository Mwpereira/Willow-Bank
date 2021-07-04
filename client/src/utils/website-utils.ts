import PropertiesConstants from "@/constants/properties-constants";
import router from "@/router";
import store from "@/store";

export default class WebsiteUtils {
    /**
     * Switches current view
     *
     * @param view
     */
    public static async switchVue(view: string): void {
        await router.push(`/${view}`);
    }

    /**
     * Switches current page
     *
     * @param page
     */
    public static async switchPage(page: string): void {
        if (page === 'dashboard'){
            await store.dispatch('getPage',`/dashboard`);
        }
        else{
            await store.dispatch('getPage',`/dashboard/${page}`);
        }
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
