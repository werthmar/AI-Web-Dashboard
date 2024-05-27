import fs from 'fs';
import path from 'path';

export function readFile(filePath) {
  try {
    // Read the file synchronously
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    throw new Error('Failed to read file');
  }
}
