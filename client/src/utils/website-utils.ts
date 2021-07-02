import PropertiesConstants from "@/constants/properties-constants";
import router from "@/router";

export default class WebsiteUtils {
  /**
   * Switches current view
   *
   * @param view
   */
  public static switchPage(view: string): void {
    router.push(`/${view}`);
  }

  /**
   * Updates page title
   *
   * @param prefix
   */
  public static updatePageTitle(prefix: string): void {
    document.title =
      prefix.substr(0, 1).toUpperCase() +
      prefix.substr(1) +
      PropertiesConstants.titleSuffix;
  }
}
