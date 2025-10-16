# Pretty Planner — Campus Life Task Organizer
Author: Waliyat Badmus
 Theme: Campus Life Planner
 Goal: To help students efficiently manage their academic and social activities through an accessible, responsive planner that tracks classes, assignments, and events.
Live Demo - 
YouTube Demo - https://youtu.be/bqxPCly4KHw

Wireframe - https://www.canva.com/design/DAG1cFxBQB0/d0mQSH8Cr96sPzEDYmC06w/edit?utm_content=DAG1cFxBQB0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
Project Overview
Pretty Planner is a responsive and accessible web app built using vanilla HTML, CSS, and JavaScript.
 It allows students to organize their tasks, assignments, and events while tracking their time and completion progress.
The app includes data persistence via localStorage, regex-based input validation, live search, JSON import/export, and mobile-first responsiveness.
# Pages & Core Features
Page
Description
About Page
Overview of the app + “Explore” button linking to Signup
Signup Page
Register new users with regex validation (email + password)
Dashboard
Displays summary stats (tasks completed, hours logged, top tags)
Tasks & Events
Shows categorized task cards with live regex search
Add Task
Add new records with form validation and localStorage save
Settings
Manage duration unit, tags, import/export data, clear storage


# Tech Stack
HTML
CSS
JavaScript

# Data Model Example
{
  "id": "task_001",
  "title": "Frontend Assignment",
  "duration": 90,
  "tag": "Assignment",
  "date": "2025-10-12",
  "createdAt": "2025-10-10T14:32:00Z",
  "updatedAt": "2025-10-12T10:00:00Z"
}

All records are auto-saved to localStorage.

# Regex Validation Catalog
Field
Pattern
Description
Task Title / Name
/^\S(?:.*\S)?$/
No leading/trailing spaces
Duration (minutes)
`/^(0
[1-9]\d*)(.\d{1,2})?$/`
Date
`/^\d{4}-(0[1-9]
1[0-2])-(0[1-9]
Category / Tag
/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/
Letters, spaces, hyphens
Email
/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
Valid email format
Password (Advanced Regex)
/^(?=.*\d)(?=.*[A-Za-z]).{6,}$/
Must contain at least one number and one letter (lookahead)
Regex Search Features
Regex-based live search in the Tasks & Events page
Case-insensitive, safe compiler using try/catch
Highlights matches dynamically
Example queries:
/frontend/i → finds “Frontend Development Class”
/\b\d{2}:\d{2}\b/ → finds time patterns like 09:00
/@tag:\w+/ → find tagged tasks



# Dashboard Stats
The dashboard auto-syncs with the Tasks page and displays:
Total Completed Tasks
Hours Logged
Top Tags / Categories
Updates automatically when new tasks are added or marked complete.

# Data Persistence & Settings
localStorage: Saves all records, updates, and stats automatically
Import Data: Loads tasks from seed.json or other JSON files (with validation)
Export Data: Downloads stored data as JSON
Clear Buttons:
Clear All Tasks → Wipes task records
Clear Settings → Resets preferences
Pop-up notifications confirm success or errors.

# Responsive Design
The app follows a mobile-first design with three breakpoints:
Screen
Layout
≤360px (mobile)
Single-column layout, stacked forms/cards
768px (tablet)
Two-column layout for tasks & settings
≥1024px (desktop)
Balanced grid layout, full header & sidebar


# Accessibility (a11y)
Semantic HTML: <header>, <main>, <nav>, <section>, <footer>
Labeled form fields (<label for="">)
ARIA live regions for success/error popups
High-contrast text and focus outlines
Full keyboard navigation (Tab, Enter)
Responsive menu toggle with focus trapping

# Testing & Validation Checklist
Test
Expected Result
Invalid email input
Popup: “Please enter a valid email”
Password missing number
Popup: “Password must include at least one number”
Empty form field
Popup: “Please fill all required fields”
Add valid task
Task added + popup success
Search invalid keyword
Popup: “No tasks found”
Export with no data
Popup: “No data to export”
Import valid JSON
Popup: “Data imported successfully”
Clear All Tasks
Removes all tasks and confirms
Resize window
Layout adapts (mobile/tablet/desktop)
Keyboard-only navigation
Full flow works with visible focus


#Learning Outcomes Demonstrated
Regex mastery for validation and search
DOM manipulation for task rendering and stats updates
Responsive UI with 3 breakpoints
localStorage persistence
Modular JS code for validation, UI, and data handling
Accessibility compliance
Import/export with validation


# Deployment
Hosted via GitHub Pages
Tested on Chrome, Safari, and Edge
Compatible across desktop and mobile devices.







