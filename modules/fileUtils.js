var fs = require('fs');

export class FileUtils {
    async appendToFile(text, filename = 'file.txt') {
        await fs.promises.appendFile(filename, text);
    }

    async readFile(filename = 'file.txt') {
        return await fs.promises.readFile(filename, 'utf-8');
    }
}