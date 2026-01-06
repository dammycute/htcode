import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/updates.json');

export async function GET() {
    try {
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read updates' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const newUpdate = await request.json();

        // Read existing data
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);

        // Add new update to the beginning of the array
        data.updates.unshift(newUpdate);

        // Write back to file
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add update' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const updatedData = await request.json();

        // Write the entire updated data to file
        fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2));

        return NextResponse.json({ success: true, data: updatedData });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}
