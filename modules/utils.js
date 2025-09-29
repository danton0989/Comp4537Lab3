export class Utils {
    static getDate() {
        const date = new Date();
        return date.toString(); // This gives format like "Wed Sep 28 2025 12:52:14 GMT-0800 (Pacific Standard Time)"
    }
}