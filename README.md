# &lt;Ht-code/&gt; Portfolio

A modern, dynamic portfolio website with monthly project tracking and professional experience showcase.

## 🚀 Features

- **Monthly Project Tracking** - Track projects month by month with detailed progress logs
- **Feed-Style Updates** - Beautiful feed layout inspired by modern dev platforms
- **Full CRUD Operations** - Add, edit status, delete projects, and archive months
- **No Database Required** - Uses JSON file storage for simplicity
- **Sidebar Filters** - Filter projects by status (All, In Progress, Complete, Planned)
- **Modern Design** - Dark mode, clean UI, smooth transitions
- **Fully Responsive** - Works perfectly on all devices

## 📁 Project Structure

```
jan-builds/
├── src/
│   ├── app/
│   │   ├── page.js                    # Homepage
│   │   ├── updates/page.js            # Monthly updates feed
│   │   ├── admin/page.js              # Admin panel to add projects
│   │   ├── api/
│   │   │   └── monthly-updates/       # API route for CRUD operations
│   │   ├── layout.js                  # Root layout
│   │   └── globals.css                # Global styles
│   └── data/
│       └── monthly-updates.json       # Monthly project data
└── public/
    └── Damilola-Olawoore-Resume.pdf  # Your resume
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Fonts**: Inter + JetBrains Mono
- **Icons**: Material Symbols
- **Data Storage**: JSON files (no database!)

## 📝 Managing Monthly Updates

### Adding a New Project
1. Go to `/admin`
2. Fill in project details:
   - Week label (e.g., "Week 14")
   - Date range
   - Status (Planned/In Progress/Complete)
   - Title and description
   - Optional: Progress, Challenges, Solutions, Learnings
   - Tech stack and tags
3. Click "Add Project to Current Month"

### Editing Project Status
1. Go to `/updates`
2. Find the project you want to update
3. Use the status dropdown to change between Planned/In Progress/Complete
4. Changes save automatically

### Deleting a Project
1. Go to `/updates`
2. Click the delete icon (🗑️) next to the project
3. Confirm deletion

### Archiving a Month
When a month is complete:
1. Go to `/updates`
2. Click "Archive & Start New Month" button
3. The current month becomes archived
4. A fresh new month is created automatically

## 🎨 Features of the Feed Design

### Sidebar Filters
- **All Updates** - View everything
- **In Progress** - See active projects
- **Completed** - Review finished work
- **Planned** - Check upcoming projects

### Status Indicators
- **In Progress** - Yellow pulsing dot + highlighted border
- **Complete** - Green checkmark
- **Planned** - Blue label

### Visual Sections
Each project can include:
- 📈 **Progress** - What you accomplished
- ⚠️ **Challenges** - Problems encountered
- ✅ **Solutions** - How you solved them
- 💡 **Learnings** - Key takeaways

## 🔗 Social Links

- **Email**: damilolaolawoore03@gmail.com
- **GitHub**: https://github.com/dammycute
- **LinkedIn**: https://www.linkedin.com/in/htcode/
- **Twitter/X**: https://x.com/ht__code

## 🚀 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📦 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with one click!

## 📄 License

MIT License - feel free to use this for your own portfolio!

---

Built with ❤️ by Damilola Olawoore (Ht-code)
