import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server'
import { readFile } from '@/app/utils/fileReader';

export function GET(req, res) {
  try {
    // Path to the text file
    const filePath = path.join(process.cwd(), 'data', 'messages.txt');

    // Read the file content synchronously
    const fileContent = readFile( filePath );

    // Send the file content as JSON response
    return NextResponse.json( fileContent );
    
} catch (error) {
    // If an error occurs, send an error response
    //res.status(500).json({ error: 'Failed to read file' });
    return NextResponse.json({ error: "Es gab eine Fehler beim Lesen der Datei, versuchen Sie es später erneut." });
  }
}