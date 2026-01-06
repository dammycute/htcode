import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/monthly-updates.json');

// GET - Fetch all monthly updates
export async function GET() {
    try {
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read updates' }, { status: 500 });
    }
}

// POST - Add new project to current month
export async function POST(request) {
    try {
        const newProject = await request.json();

        // Read existing data
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);

        // Find current month or create new one
        let currentMonth = data.monthlyProjects.find(m => m.status === 'active');

        if (!currentMonth) {
            // Create new month
            currentMonth = {
                id: `month-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
                month: data.currentMonth,
                status: 'active',
                projects: []
            };
            data.monthlyProjects.unshift(currentMonth);
        }

        // Add new project to current month
        currentMonth.projects.unshift(newProject);

        // Write back to file
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
    }
}

// PUT - Update existing project or month
export async function PUT(request) {
    try {
        const { monthId, projectIndex, updatedProject, action } = await request.json();

        // Read existing data
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);

        if (action === 'archive-month') {
            // Archive current month and create new one
            const currentMonth = data.monthlyProjects.find(m => m.id === monthId);
            if (currentMonth) {
                currentMonth.status = 'archived';
            }

            // Create new month
            const now = new Date();
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            const newMonthName = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

            const newMonth = {
                id: `month-${now.getMonth() + 1}-${now.getFullYear()}`,
                month: newMonthName,
                status: 'active',
                projects: []
            };

            data.currentMonth = newMonthName;
            data.monthlyProjects.unshift(newMonth);
        } else {
            // Update specific project
            const month = data.monthlyProjects.find(m => m.id === monthId);
            if (month && month.projects[projectIndex]) {
                month.projects[projectIndex] = updatedProject;
            }
        }

        // Write back to file
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}

// DELETE - Remove a project
export async function DELETE(request) {
    try {
        const { monthId, projectIndex } = await request.json();

        // Read existing data
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);

        // Find month and remove project
        const month = data.monthlyProjects.find(m => m.id === monthId);
        if (month && month.projects[projectIndex] !== undefined) {
            month.projects.splice(projectIndex, 1);
        }

        // Write back to file
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
