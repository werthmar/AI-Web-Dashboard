import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server'
import { readFile } from '@/app/utils/fileReader';

// To prevent only old messages from beeing shown in production build
export const dynamic = 'force-dynamic';

export function GET(req, res) {
  try {
    // Path to the text file
    const filePath = path.resolve(process.cwd(), 'data/messages.txt');

    // Read the file content synchronously
    const fileContent = readFile( filePath );

    // Send the file content as JSON response
    const response = NextResponse.json( fileContent );
    // Prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    return response;

} catch (error) {
    // If an error occurs, send an error response
    //res.status(500).json({ error: 'Failed to read file' });
    return NextResponse.json({ error: "Es gab eine Fehler beim Lesen der Datei, versuchen Sie es später erneut." });
  }
}