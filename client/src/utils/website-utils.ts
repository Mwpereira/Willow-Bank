import PropertiesConstants from "@/constants/properties-constants";

export default class WebsiteUtils {
  public static updatePageTitle(prefix: string) {
    document.title =
      prefix.substr(0, 1).toUpperCase() +
      prefix.substr(1) +
      PropertiesConstants.titleSuffix;
  }
}
