export default class TypescriptUtils {
  /**
   * Checks if payload is a string
   *
   * @param payload
   * @return boolean
   */
  public static checkString(payload: string): boolean {
    return typeof payload === "string";
  }
}
