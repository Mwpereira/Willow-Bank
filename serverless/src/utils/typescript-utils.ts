export default class TypescriptUtils{
    /**
     * Checks if payload is a string
     *
     * @param payload
     * @return boolean
     */
    public static checkString(payload: string): boolean {
        return typeof payload === 'string';
    }

    // /**
    //  * Checks if payload is a number
    //  *
    //  * @param payload
    //  * @return assertion
    //  */
    // public static checkNumber(payload: number): boolean {
    //     return typeof payload === 'number';
    // }
}
