# Quick Guide: Managing Your Monthly Portfolio

## 🎯 Quick Links

- **Homepage**: http://localhost:3000
- **Monthly Updates Feed**: http://localhost:3000/updates
- **Admin Panel**: http://localhost:3000/admin

## ✅ What's Been Set Up

### Branding
- ✅ **&lt;Ht-code/&gt;** with `>_` logo icon
- ✅ Copyright year: **2026**
- ✅ Updated contact email

### Social Links
- ✅ **Email**: damilolaolawoore03@gmail.com
- ✅ **GitHub**: https://github.com/dammycute
- ✅ **LinkedIn**: https://www.linkedin.com/in/htcode/
- ✅ **Twitter/X**: https://x.com/ht__code

### Projects
- ✅ **CurateD**: https://github.com/dammycute/CuratED.git
- ✅ **FYSI (Greenhouse)**: https://github.com/Techies-Collab-and-Upskill-Live-Project/greenhouse-backend.git
- ✅ Resume download link working

### Monthly Tracking System
- ✅ Feed-style updates page with sidebar filters
- ✅ Add new projects to current month
- ✅ Edit project status (Planned → In Progress → Complete)
- ✅ Delete projects you don't need
- ✅ Archive old months and start fresh
- ✅ **NO DATABASE** - everything in `src/data/monthly-updates.json`

## 📝 How to Use Monthly Tracking

### 1. Add a New Project
1. Go to http://localhost:3000/admin
2. Fill out the form:
   ```
   Week Label: Week 14
   Date Range: Jan 1 - Jan 7, 2026
   Status: In Progress
   Title: Your Project Title
   Description: What the project does
   
   Optional Sections:
   - Progress: What you've done
   - Challenges: Problems you faced
   - Solutions: How you solved them
   - Learnings: What you learned
   
   Tech Stack: Solidity, Hardhat, Chainlink
   Tags: #Web3, #SmartContracts
   ```
3. Click "Add Project to Current Month"

### 2. Update Project Status
1. Go to http://localhost:3000/updates
2. Find your project
3. Use the dropdown to change status:
   - **Planned** → Not started yet
   - **In Progress** → Currently working on it (gets highlighted!)
   - **Complete** → Finished ✅

### 3. Delete a Project
1. On the Updates page
2. Click the 🗑️ icon next to the project
3. Confirm deletion

### 4. Archive a Month
When the month is over:
1. Go http://localhost:3000/updates
2. Click "Archive & Start New Month"
3. Old projects get archived
4. Fresh new month starts automatically

## 🎨 Feed Features

### Sidebar Filters
Click on any filter to view:
- **All Updates** - Everything
- **In Progress** - Active projects (highlighted)
- **Completed** - Finished work
- **Planned** - Upcoming projects

### Visual Status
- **In Progress**: Yellow pulsing dot + primary border
- **Complete**: Green checkmark
- **Planned**: Blue text

### Project Sections
You can add these optional sections:
- 📈 **Progress** - What you accomplished
- ⚠️ **Challenges** - Problems you encountered  
- ✅ **Solutions** - How you fixed them
- 💡 **Learnings** - Key takeaways

## 📂 Direct File Editing

You can also edit `src/data/monthly-updates.json` directly:

```json
{
  "currentMonth": "January 2026",
  "monthlyProjects": [
    {
      "id": "month-01-2026",
      "month": "January 2026",
      "status": "active",
      "projects": [
        {
          "weekNumber": "Week 14",
          "dateRange": "Jan 1 - Jan 7, 2026",
          "status": "in-progress",
          "title": "Your Project",
          "description": "Project description",
          "sections": {
            "progress": "What you did",
            "challenges": "Problems faced",
            "solutions": "How you solved them",
            "learnings": "What you learned"
          },
          "techStack": ["Tech1", "Tech2"],
          "tags": ["#tag1"]
        }
      ]
    }
  ]
}
```

## 🗓️ Monthly Workflow

### Week 1-4: Add Projects
- Use `/admin` to add new projects
- Update status as you progress
- Mark complete when done

### End of Month:
1. Review all projects
2. Mark remaining as complete/planned
3. Click "Archive & Start New Month"
4. Begin fresh for next month

## 🎯 Common Tasks

### Change Project Status
- Updates page → Status dropdown → Select new status

### Remove Old Project
- Updates page → Delete icon → Confirm

### Start Fresh Month
- Updates page → "Archive & Start New Month" button

### View Only Active Work
- Updates page → Click "In Progress" filter

## 💡 Pro Tips

- Use **In Progress** status for current focus (gets visual highlight!)
- Fill in Progress/Challenges/Solutions for better documentation
- Archive months regularly to keep feed clean
- Use filters to quickly find specific project types
- Tags help categorize projects (e.g., #AI, #Web3, #Backend)

## 🆘 Need Help?

- Check main README.md for detailed docs
- All data in `src/data/monthly-updates.json`
- Restart dev server if needed: `npm run dev`
- Updates appear instantly - no build needed!

---

Happy coding! 🚀
