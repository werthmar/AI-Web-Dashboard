// Save Messages to a txt file on the server
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { readFile } from '../../utils/fileReader';

export async function POST(req) {

    

    try {
        const body = await req.json();
        const { data } = body;

        const dirPath = path.join(process.cwd(), 'data');
        //const filePath = path.join(dirPath, 'messages.txt');
        const filePath = path.resolve(process.cwd(), 'data/messages.txt');

        // Create the directory if it doesn't exist
        if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        }

        // Read the saved data from the saved messages and append the new data to it
        var allMessages = readFile( filePath );
        data.forEach(message => {
        allMessages.push( message );
        });
        // Transform data to a json string for save in txt file
        var jsonString = JSON.stringify( allMessages );

        fs.writeFileSync( filePath, jsonString );

        // Set response values
        const response = NextResponse.json({ message: 'Nachrichten erfolgreich gespeichert!' });
        // Prevent caching
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        response.headers.set('Surrogate-Control', 'no-store');
        return response;

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
    }
}