import { promises as fs } from 'fs';

export class FileUtils {
    async appendToFile(text, filename = 'file.txt') {
        await fs.appendFile(filename, text);
    }

    async readFile(filename = 'file.txt') {
        return await fs.readFile(filename, 'utf-8');
    }
}