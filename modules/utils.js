export class Utils {
    static getDate() {
        const date = new Date();
        return date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }) + " (Pacific Standard Time)";
    }
}