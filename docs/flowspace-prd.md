# Flowspace — Product Requirements Document

**Version:** 1.0.0  
**Status:** Implementation-Ready  
**Last Updated:** June 2026  
**Document Type:** Product Requirements Document (PRD)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision](#2-product-vision)
3. [Product Philosophy](#3-product-philosophy)
4. [Problem Statement](#4-problem-statement)
5. [Goals and Success Metrics](#5-goals-and-success-metrics)
6. [User Personas](#6-user-personas)
7. [User Stories](#7-user-stories)
8. [Information Architecture](#8-information-architecture)
9. [Navigation Structure](#9-navigation-structure)
10. [User Flows](#10-user-flows)
11. [Functional Requirements](#11-functional-requirements)
12. [Feature Specifications](#12-feature-specifications)
13. [Acceptance Criteria](#13-acceptance-criteria)
14. [Edge Cases](#14-edge-cases)
15. [Database Schema Proposal](#15-database-schema-proposal)
16. [API Design Proposal](#16-api-design-proposal)
17. [UI/UX Design Principles](#17-uiux-design-principles)
18. [Responsive Design Strategy](#18-responsive-design-strategy)
19. [Accessibility Requirements](#19-accessibility-requirements)
20. [Technical Architecture](#20-technical-architecture)
21. [Docker Deployment Strategy](#21-docker-deployment-strategy)
22. [Offline Strategy](#22-offline-strategy)
23. [Open Source Strategy](#23-open-source-strategy)
24. [Repository Structure](#24-repository-structure)
25. [MVP Scope](#25-mvp-scope)
26. [Future Roadmap](#26-future-roadmap)
27. [Risks and Mitigations](#27-risks-and-mitigations)

---

## 1. Executive Summary

Flowspace is a minimalist, self-hosted personal productivity application built for individuals who want to focus deeply on today's work — not manage long-term projects or collaborate with teams.

The application consolidates four daily productivity needs into a single unified dashboard: task management, Pomodoro-based focus sessions, personal note-taking, and local music playback. All data remains on the user's own machine. There is no authentication, no cloud, and no subscription.

Flowspace is designed to run locally via Docker Compose with minimal setup. A non-technical user should be able to download the project, run a single command, open a browser, and immediately begin working.

The product is open source, beginner-friendly for contributors, and intentionally constrained to prevent feature creep. Its philosophy can be summarized in three words: **focus on today**.

---

## 2. Product Vision

> Flowspace is the workspace you open every morning — calm, familiar, and ready — helping you answer one question: _What should I focus on right now?_

Modern productivity tools suffer from a common failure mode: they are optimized for organizational complexity rather than individual clarity. They surface long-term roadmaps, team backlogs, and notification feeds where users expected a simple place to think and work.

Flowspace rejects this model.

The vision is a personal digital desk. A quiet, distraction-free environment where users can drop into focus immediately, track what matters today, capture a thought without switching apps, and play music that supports concentration — all from one screen, with no accounts, no fees, and no data leaving their computer.

---

## 3. Product Philosophy

The following five principles govern every design and engineering decision in Flowspace. When a feature conflicts with these principles, the principles win.

### 3.1 Today First

Flowspace answers "What should I focus on today?" not "What am I managing over the next quarter?" The interface surfaces today's tasks, today's progress, and today's focus time. Long-horizon planning is not a goal of this product.

### 3.2 Dashboard First

The dashboard is the primary workspace, not a navigation page. Users should complete the majority of their daily tasks — creating and completing tasks, running Pomodoro sessions, capturing notes, controlling music — without leaving the dashboard. Page switches are the exception, not the rule.

### 3.3 Flow State

Every feature is evaluated against one question: does this help the user enter and maintain deep focus? Features that introduce noise, friction, or distraction are rejected regardless of how commonly they appear in competing tools.

### 3.4 Simplicity

No enterprise workflows. No complex configuration. No feature creep. The simplest implementation that solves the user's problem is always preferred.

### 3.5 Offline First

Core features — tasks, notes, Pomodoro, statistics, music — must work without an internet connection. The application should degrade gracefully, not break, when offline.

### 3.6 Personal Workspace

Flowspace is built for one person. There are no teams, no shared workspaces, no collaboration features, and no multi-user support. This is a deliberate, permanent constraint.

---

## 4. Problem Statement

### 4.1 The Core Problem

Knowledge workers, students, freelancers, and creators increasingly feel overwhelmed by their own productivity tools. Project management platforms designed for teams are repurposed for personal use, resulting in a mismatch: the individual user must navigate enterprise UX, maintain complex project hierarchies, and manage notification systems designed for coordination — when all they need is a clear answer to "what should I work on today?"

### 4.2 Specific Pain Points

**Cognitive overload from tool complexity.** Tools like Notion, Linear, Jira, and Asana introduce overhead — project structures, views, filters, integrations — that creates decision fatigue before a single task is completed.

**Context switching.** Users currently maintain separate apps for tasks, timers, notes, and music. Each switch disrupts focus and adds friction.

**Data privacy anxiety.** SaaS productivity tools store personal notes, task lists, and work schedules on third-party servers. Many users are uncomfortable with this arrangement but lack a self-hosted alternative with a good UX.

**Setup barriers for self-hosted tools.** Existing self-hosted alternatives often require complex configuration, database administration, or server management beyond the capability of non-technical users.

**Feature bloat.** Tools add features to serve enterprise sales requirements, resulting in interfaces cluttered with options that individual users never need.

### 4.3 What Flowspace Solves

Flowspace provides a single, calm, local workspace where a user can:

- See and manage today's tasks without navigating a project hierarchy
- Run structured focus sessions with a Pomodoro timer
- Write and retrieve quick notes without leaving the dashboard
- Play background music from a local library
- Review their daily productivity at a glance

All of this from one screen, on their own machine, with no configuration beyond `docker compose up`.

---

## 5. Goals and Success Metrics

### 5.1 Product Goals

| Goal                          | Description                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Installation simplicity**   | A non-technical user can install and launch Flowspace in under 5 minutes                             |
| **Dashboard utility**         | 80%+ of daily interactions happen on the dashboard without page navigation                           |
| **Offline reliability**       | 100% of core features function without internet access                                               |
| **Perceived calm**            | The interface feels distraction-free and intentional                                                 |
| **Contributor accessibility** | A new open-source contributor can make a meaningful contribution within one hour of cloning the repo |

### 5.2 Success Metrics

**Qualitative**

- Users describe the application as "calming," "focused," or "simple"
- Contributors report the codebase is easy to navigate
- Non-technical users successfully self-install without external help

**Quantitative (self-reported / analytics-free)**

- Time-to-first-task under 60 seconds from application launch
- Time-to-first-Pomodoro under 90 seconds from application launch
- Dashboard interaction rate vs. page navigations > 4:1

### 5.3 Anti-Goals

Flowspace explicitly does not optimize for:

- Feature parity with enterprise tools
- Team adoption metrics
- Subscription conversion
- Viral growth
- External integrations

---

## 6. User Personas

### Persona 1 — Maya, the Graduate Student

**Age:** 26  
**Technical proficiency:** Moderate (comfortable with web apps, limited server experience)  
**Context:** Maya is writing her thesis and juggling coursework, research, and part-time work. She uses Notion but finds it overwhelming. She needs a simple way to track today's tasks, focus using Pomodoro, and keep research notes.  
**Key need:** A clean daily task view and distraction-free focus sessions.  
**Frustration:** "I spend more time organizing my Notion than actually studying."

---

### Persona 2 — James, the Freelance Developer

**Age:** 33  
**Technical proficiency:** High (comfortable with Docker, CLI, self-hosting)  
**Context:** James works remotely for multiple clients. He wants a private, local tool that handles his daily work without sending data to any third-party service.  
**Key need:** Task management, Pomodoro timing, and data privacy.  
**Frustration:** "Every productivity app wants my email, my credit card, or my soul."

---

### Persona 3 — Sofia, the UX Designer

**Age:** 29  
**Technical proficiency:** Low-moderate (comfortable with software, not servers)  
**Context:** Sofia does creative work and values aesthetics. She uses Spotify while working and wants a calm, beautiful workspace she can open every morning.  
**Key need:** Dashboard-first experience with music, clean design, quick notes.  
**Frustration:** "My current setup is five apps open at once. It's chaotic."

---

### Persona 4 — Robert, the Retired Teacher (Non-Technical)

**Age:** 64  
**Technical proficiency:** Low (basic computer skills, no developer experience)  
**Context:** Robert manages personal projects, journaling, and daily routines. He wants a simple productivity tool that doesn't require an account and feels approachable.  
**Key need:** Simple tasks, notes, minimal setup.  
**Frustration:** "I don't understand why I need to create an account just to write a to-do list."

---

### Persona 5 — Layla, the Remote Product Manager

**Age:** 38  
**Technical proficiency:** Moderate  
**Context:** Layla uses project management tools all day for work. For personal focus, she wants something completely separate — her own quiet space.  
**Key need:** Pomodoro timer, personal task list, music, statistics to review end-of-day.  
**Frustration:** "I need a break from enterprise tools, not another one."

---

## 7. User Stories

### 7.1 Task Management

| ID   | As a... | I want to...                             | So that...                                          |
| ---- | ------- | ---------------------------------------- | --------------------------------------------------- |
| T-01 | user    | create a task quickly from the dashboard | I don't need to navigate away from my workspace     |
| T-02 | user    | see all my tasks for today in one view   | I know exactly what I need to accomplish            |
| T-03 | user    | mark a task as complete                  | I can track my progress through the day             |
| T-04 | user    | set a priority on a task                 | I know which tasks are most important               |
| T-05 | user    | add a description to a task              | I have context when I return to it later            |
| T-06 | user    | add an optional due date to a task       | I can plan tasks that span multiple days            |
| T-07 | user    | reorder tasks by dragging                | I can organize my work in the order I plan to do it |
| T-08 | user    | edit an existing task                    | I can refine details as my work evolves             |
| T-09 | user    | delete a task                            | I can remove tasks that are no longer relevant      |
| T-10 | user    | view completed tasks for today           | I can see my accomplishments at the end of the day  |
| T-11 | user    | view upcoming tasks                      | I can plan ahead when necessary                     |
| T-12 | user    | mark a completed task as incomplete      | I can reopen tasks that need more work              |

### 7.2 Pomodoro Focus Timer

| ID   | As a... | I want to...                                           | So that...                                               |
| ---- | ------- | ------------------------------------------------------ | -------------------------------------------------------- |
| P-01 | user    | start a Pomodoro focus session from the dashboard      | I can enter focus mode immediately                       |
| P-02 | user    | pause and resume a Pomodoro session                    | I can handle brief interruptions without losing progress |
| P-03 | user    | stop a session early                                   | I can end a session if needed                            |
| P-04 | user    | configure focus, short break, and long break durations | The timer fits my personal work rhythm                   |
| P-05 | user    | see a visual countdown on the dashboard                | I always know how much time remains                      |
| P-06 | user    | receive a clear signal when a session ends             | I know when to take a break or start a new session       |
| P-07 | user    | see how many Pomodoros I've completed today            | I can track my daily focus output                        |
| P-08 | user    | see my total focus time for today                      | I have a sense of how productive I've been               |
| P-09 | user    | view my weekly focus summary                           | I can identify patterns over time                        |
| P-10 | user    | enter full-screen focus mode                           | I can eliminate all visual distractions                  |

### 7.3 Notes

| ID   | As a... | I want to...                             | So that...                                    |
| ---- | ------- | ---------------------------------------- | --------------------------------------------- |
| N-01 | user    | create a note quickly from the dashboard | I can capture thoughts without switching apps |
| N-02 | user    | write notes with Markdown formatting     | I can structure my thoughts clearly           |
| N-03 | user    | search my notes                          | I can find specific content quickly           |
| N-04 | user    | pin important notes                      | My most-referenced notes stay visible         |
| N-05 | user    | edit a note                              | I can refine and update my thinking           |
| N-06 | user    | delete a note                            | I can remove content I no longer need         |
| N-07 | user    | see when a note was last updated         | I know how current the information is         |

### 7.4 Music

| ID   | As a... | I want to...                                             | So that...                                      |
| ---- | ------- | -------------------------------------------------------- | ----------------------------------------------- |
| M-01 | user    | upload MP3 files from my computer                        | I can build a personal music library            |
| M-02 | user    | play, pause, skip, and control volume from the dashboard | I can manage music without leaving my workspace |
| M-03 | user    | create playlists                                         | I can organize music by mood or activity        |
| M-04 | user    | shuffle and repeat tracks                                | I can let music run automatically               |
| M-05 | user    | delete tracks from my library                            | I can remove music I no longer want             |
| M-06 | user    | add and remove tracks from playlists                     | I can curate playlists over time                |
| M-07 | user    | rename and delete playlists                              | I can maintain my library                       |
| M-08 | user    | control music without an internet connection             | Music works offline like everything else        |

### 7.5 Statistics

| ID   | As a... | I want to...                               | So that...                                 |
| ---- | ------- | ------------------------------------------ | ------------------------------------------ |
| S-01 | user    | see today's focus time on the dashboard    | I have a real-time view of my productivity |
| S-02 | user    | see tasks completed today on the dashboard | I can measure my daily output              |
| S-03 | user    | see my current focus streak                | I'm motivated to maintain consistency      |
| S-04 | user    | view a weekly focus summary                | I can review my productivity patterns      |
| S-05 | user    | see completed Pomodoro sessions for today  | I have a count of my focused intervals     |

### 7.6 Settings

| ID    | As a... | I want to...                         | So that...                           |
| ----- | ------- | ------------------------------------ | ------------------------------------ |
| SE-01 | user    | configure Pomodoro durations         | The timer fits my personal rhythm    |
| SE-02 | user    | toggle between light and dark themes | The interface matches my environment |
| SE-03 | user    | set application preferences          | The app behaves the way I expect     |

---

## 8. Information Architecture

```
Flowspace
├── Landing Page
│   ├── Hero Section (tagline + CTA)
│   ├── Philosophy Section
│   ├── Features Overview
│   ├── Who It's For
│   └── Get Started CTA → Dashboard
│
└── Application
    ├── Dashboard (Primary Workspace)
    │   ├── Header Bar
    │   │   ├── Date & Greeting
    │   │   └── Quick Actions
    │   ├── Task Widget
    │   │   ├── Today's Tasks List
    │   │   ├── Quick Add Task Input
    │   │   └── Completed Tasks (collapsible)
    │   ├── Pomodoro Widget
    │   │   ├── Timer Display
    │   │   ├── Session Controls (Start / Pause / Stop)
    │   │   └── Session Progress Indicators
    │   ├── Quick Notes Widget
    │   │   ├── Recent/Pinned Notes
    │   │   └── Quick Add Note
    │   ├── Music Player Widget
    │   │   ├── Now Playing Display
    │   │   ├── Playback Controls
    │   │   └── Volume Control
    │   └── Daily Stats Widget
    │       ├── Focus Time Today
    │       ├── Tasks Completed
    │       ├── Pomodoros Completed
    │       └── Current Streak
    │
    ├── Tasks Page
    │   ├── Today's Tasks
    │   ├── Upcoming Tasks
    │   └── Completed Tasks Archive
    │
    ├── Notes Page
    │   ├── Pinned Notes
    │   ├── All Notes (sorted by updated)
    │   └── Search Bar
    │
    ├── Music Library Page
    │   ├── Upload MP3
    │   ├── All Tracks
    │   └── Playlists
    │       ├── Create Playlist
    │       ├── Playlist Detail
    │       └── Add / Remove Tracks
    │
    ├── Statistics Page
    │   ├── Today Summary
    │   ├── Weekly Chart
    │   └── Streak Display
    │
    └── Settings Page
        ├── Pomodoro Settings
        ├── Theme Settings
        └── Application Preferences
```

---

## 9. Navigation Structure

### 9.1 Sidebar Navigation

The sidebar provides access to secondary pages. It should be collapsible on desktop and drawer-style on mobile.

```
[Logo / Wordmark]

─── Primary ───
◉  Dashboard        (default)
☐  Tasks
☐  Notes
☐  Music
☐  Statistics

─── System ───
⚙  Settings
```

### 9.2 Navigation Principles

- The dashboard is the default and primary view
- The sidebar is supplemental, not the primary workflow
- Page navigation should feel like accessing a library, not a workflow step
- Current page is clearly indicated with active state styling
- The sidebar collapses to icons-only mode on narrow viewports

### 9.3 Persistent Elements

The following elements remain visible across all pages:

- Music player mini-bar (bottom of screen when music is active)
- Sidebar navigation

---

## 10. User Flows

### 10.1 First Launch Flow

```
User runs Docker Compose
        ↓
Browser opens at localhost:3000
        ↓
Landing Page loads
        ↓
User clicks "Go to Dashboard"
        ↓
Dashboard loads (empty state with onboarding hints)
        ↓
User creates first task → Immediate feedback
        ↓
User starts first Pomodoro → Timer begins
        ↓
User is in flow state
```

### 10.2 Daily Morning Flow

```
User opens browser → Dashboard loads
        ↓
Greeting: "Good morning, [Day]"
        ↓
User reviews today's task list
        ↓
User creates/reorders tasks for the day
        ↓
User starts a Pomodoro session
        ↓
User starts music playlist
        ↓
User works — completes tasks during session
        ↓
Timer ends → Break prompted
        ↓
Cycle repeats
```

### 10.3 Task Creation Flow

```
User focuses Quick Add input on Dashboard
        ↓
Types task title → Presses Enter
        ↓
Task appears in Today's list immediately
        ↓
[Optional] User clicks task to expand
        ↓
Adds description / priority / due date
        ↓
Saves task
```

### 10.4 Pomodoro Session Flow

```
User clicks "Start" on Pomodoro widget
        ↓
Timer counts down (e.g., 25:00 → 00:00)
        ↓
[Optional] User pauses → Resumes
        ↓
Session ends → Notification / visual signal
        ↓
Short break timer begins automatically
        ↓
After 4 sessions → Long break
        ↓
Statistics updated: +1 session, +focus time
```

### 10.5 Note Creation Flow (Dashboard)

```
User clicks Quick Note input
        ↓
Types note content (supports Markdown)
        ↓
Saves note → Appears in Notes Widget
        ↓
[Optional] User opens Notes page for full management
```

### 10.6 Music Upload Flow

```
User navigates to Music Library page
        ↓
Clicks "Upload MP3"
        ↓
File picker opens → User selects file(s)
        ↓
File is stored in local storage directory
        ↓
Track metadata extracted (title, duration)
        ↓
Track appears in library
        ↓
User can play, add to playlist, or delete
```

---

## 11. Functional Requirements

### 11.1 Task Management

| ID      | Requirement                                                  | Priority    |
| ------- | ------------------------------------------------------------ | ----------- |
| FR-T-01 | System shall allow users to create tasks with a title        | Must Have   |
| FR-T-02 | System shall support optional task description               | Must Have   |
| FR-T-03 | System shall support task priority levels: Low, Medium, High | Must Have   |
| FR-T-04 | System shall support task status: Active, Completed          | Must Have   |
| FR-T-05 | System shall support optional due date per task              | Must Have   |
| FR-T-06 | System shall display today's tasks on the dashboard          | Must Have   |
| FR-T-07 | System shall support task reordering via drag-and-drop       | Should Have |
| FR-T-08 | System shall support marking a task complete/incomplete      | Must Have   |
| FR-T-09 | System shall support editing task fields                     | Must Have   |
| FR-T-10 | System shall support deleting tasks                          | Must Have   |
| FR-T-11 | System shall display completed tasks separately              | Should Have |
| FR-T-12 | System shall persist tasks across browser sessions           | Must Have   |

### 11.2 Pomodoro Timer

| ID      | Requirement                                                            | Priority     |
| ------- | ---------------------------------------------------------------------- | ------------ |
| FR-P-01 | System shall provide a configurable countdown timer                    | Must Have    |
| FR-P-02 | System shall support Start, Pause, Resume, Stop controls               | Must Have    |
| FR-P-03 | System shall automatically transition to break after focus session     | Must Have    |
| FR-P-04 | System shall support configurable focus duration (default 25 min)      | Must Have    |
| FR-P-05 | System shall support configurable short break duration (default 5 min) | Must Have    |
| FR-P-06 | System shall support configurable long break duration (default 15 min) | Must Have    |
| FR-P-07 | System shall trigger long break after 4 sessions                       | Must Have    |
| FR-P-08 | System shall record session completion to statistics                   | Must Have    |
| FR-P-09 | System shall display session count on dashboard                        | Must Have    |
| FR-P-10 | System shall support a full-screen focus mode                          | Nice to Have |
| FR-P-11 | System shall play a sound or visual signal on session end              | Should Have  |

### 11.3 Notes

| ID      | Requirement                                                | Priority  |
| ------- | ---------------------------------------------------------- | --------- |
| FR-N-01 | System shall allow creating notes with title and content   | Must Have |
| FR-N-02 | System shall render Markdown in note content               | Must Have |
| FR-N-03 | System shall allow searching notes by title and content    | Must Have |
| FR-N-04 | System shall allow pinning notes                           | Must Have |
| FR-N-05 | System shall display pinned notes first                    | Must Have |
| FR-N-06 | System shall record and display created/updated timestamps | Must Have |
| FR-N-07 | System shall allow editing notes                           | Must Have |
| FR-N-08 | System shall allow deleting notes with confirmation        | Must Have |
| FR-N-09 | System shall provide a quick-note widget on the dashboard  | Must Have |

### 11.4 Music

| ID      | Requirement                                                   | Priority    |
| ------- | ------------------------------------------------------------- | ----------- |
| FR-M-01 | System shall accept MP3 file uploads                          | Must Have   |
| FR-M-02 | System shall store MP3 files in a local directory             | Must Have   |
| FR-M-03 | System shall serve MP3 files for browser-based playback       | Must Have   |
| FR-M-04 | System shall support Play, Pause, Resume, Stop                | Must Have   |
| FR-M-05 | System shall support Previous Track and Next Track            | Must Have   |
| FR-M-06 | System shall support volume control                           | Must Have   |
| FR-M-07 | System shall support Repeat One and Repeat Playlist modes     | Must Have   |
| FR-M-08 | System shall support Shuffle mode                             | Must Have   |
| FR-M-09 | System shall allow creating and naming playlists              | Must Have   |
| FR-M-10 | System shall allow adding/removing tracks from playlists      | Must Have   |
| FR-M-11 | System shall allow renaming playlists                         | Should Have |
| FR-M-12 | System shall allow deleting playlists                         | Must Have   |
| FR-M-13 | System shall allow deleting tracks from library               | Must Have   |
| FR-M-14 | System shall persist playback state (current track, position) | Should Have |
| FR-M-15 | Music playback shall work offline                             | Must Have   |

### 11.5 Statistics

| ID      | Requirement                                                    | Priority    |
| ------- | -------------------------------------------------------------- | ----------- |
| FR-S-01 | System shall track total focus time per day                    | Must Have   |
| FR-S-02 | System shall track Pomodoro sessions completed per day         | Must Have   |
| FR-S-03 | System shall track tasks completed per day                     | Must Have   |
| FR-S-04 | System shall calculate and display current focus streak (days) | Must Have   |
| FR-S-05 | System shall display a weekly focus summary                    | Should Have |
| FR-S-06 | Statistics shall be displayed on the dashboard                 | Must Have   |
| FR-S-07 | Statistics shall be available on a dedicated stats page        | Should Have |

### 11.6 Settings

| ID       | Requirement                                          | Priority  |
| -------- | ---------------------------------------------------- | --------- |
| FR-SE-01 | System shall provide light and dark theme options    | Must Have |
| FR-SE-02 | Theme preference shall persist across sessions       | Must Have |
| FR-SE-03 | Pomodoro durations shall be configurable in Settings | Must Have |
| FR-SE-04 | Settings shall persist across sessions               | Must Have |

---

## 12. Feature Specifications

### 12.1 Task Management — Detailed Spec

#### Task Object

```typescript
interface Task {
  id: string; // UUID
  title: string; // Required, max 255 chars
  description?: string; // Optional, markdown supported
  priority: "low" | "medium" | "high";
  status: "active" | "completed";
  dueDate?: Date; // Optional
  sortOrder: number; // For drag-and-drop ordering
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date; // Set when status → completed
}
```

#### Dashboard Task Widget

The dashboard task widget must:

- Display a quick-add input at the top (placeholder: "Add a task...")
- On Enter or click of add button, create task immediately
- Show active tasks below the input in sort order
- Show a collapsible "Completed Today" section below active tasks
- Each task row must show: checkbox, title, priority indicator, optional due date chip
- Clicking a task title opens an inline expansion with description and edit controls
- Reordering is available via drag handle (desktop) and long-press (mobile)

#### Priority Indicators

- **High**: Filled circle, dark
- **Medium**: Half-filled circle, medium gray
- **Low**: Empty circle, light gray

Priority is visually subtle — it should not dominate the UI.

#### Due Date Display

- Overdue tasks: show due date in a distinct (but not alarming) style
- Due today: show "Today" label
- Due this week: show day name (e.g., "Thursday")
- Due beyond this week: show date (e.g., "Jul 14")

---

### 12.2 Pomodoro Timer — Detailed Spec

#### Timer States

```
IDLE → FOCUS → BREAK → FOCUS → ... → LONG_BREAK
```

State transitions:

- **IDLE**: Default state, controls show "Start"
- **FOCUS**: Timer counting down, shows "Pause" and "Stop"
- **PAUSED**: Timer paused, shows "Resume" and "Stop"
- **BREAK**: Short or long break counting down
- **COMPLETE**: Session ended, awaiting next action

#### Timer Display

The timer is the visual anchor of the Pomodoro widget. It should be:

- Large, legible font (minimum 48px equivalent)
- MM:SS format
- Accompanied by a circular progress ring (SVG)
- Session type labeled above timer: "Focus", "Short Break", "Long Break"

#### Session Counter

Display dots or icons showing progress toward a long break:

```
● ● ○ ○   (2 of 4 sessions complete)
```

#### Audio Notifications

A subtle audio cue (single tone) plays when:

- Focus session ends
- Break ends

Audio files must be bundled with the application, not fetched from external URLs.

---

### 12.3 Notes — Detailed Spec

#### Note Object

```typescript
interface Note {
  id: string; // UUID
  title: string; // Optional, max 255 chars
  content: string; // Markdown
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Markdown Support

The following Markdown elements must be rendered:

- Headings (H1–H3)
- Bold and italic
- Unordered and ordered lists
- Inline code and code blocks
- Blockquotes
- Horizontal rules

The notes editor should support split-pane (edit | preview) or inline preview toggle.

#### Quick Notes Widget

The dashboard Quick Notes widget shows:

- Up to 3 pinned notes (truncated at ~100 chars)
- A quick-add textarea (minimum, no title required)
- A "View all notes →" link to the full Notes page

---

### 12.4 Music — Detailed Spec

#### File Storage

Uploaded MP3 files are stored in a Docker volume-mapped directory:

```
/app/storage/music/
```

Files are served via Next.js API route or static file serving within the Docker container. No external CDN. No external URLs.

#### Track Object

```typescript
interface Track {
  id: string;
  filename: string; // Original filename
  title: string; // From ID3 tags or filename
  artist?: string; // From ID3 tags if available
  duration: number; // Seconds
  fileSize: number; // Bytes
  uploadedAt: Date;
}
```

#### Playlist Object

```typescript
interface Playlist {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  tracks: PlaylistTrack[];
}

interface PlaylistTrack {
  playlistId: string;
  trackId: string;
  sortOrder: number;
}
```

#### Dashboard Music Widget

The dashboard music widget shows:

- Now Playing: track title and artist (if available)
- Progress bar (seekable)
- Controls: ⏮ ⏯ ⏭
- Volume slider
- Mode toggles: Shuffle, Repeat
- Current playlist name

#### Upload Behavior

- Accept `.mp3` files only
- Maximum file size: 50MB per file (configurable via environment variable)
- Metadata (title, artist) extracted from ID3 tags using a server-side library
- If ID3 tags are absent, derive title from filename (strip extension, replace hyphens/underscores with spaces)
- Multiple files can be selected in a single upload operation
- Upload progress is shown per file

---

### 12.5 Statistics — Detailed Spec

#### Daily Statistics Record

```typescript
interface DailyStats {
  date: Date; // UTC date, no time component
  focusMinutes: number; // Total focus time in minutes
  pomodoroSessions: number; // Sessions completed
  tasksCompleted: number; // Tasks marked complete
}
```

#### Streak Calculation

A streak is the number of consecutive calendar days on which at least one Pomodoro session was completed.

A streak is not broken if the user skips a day — it is only reset when the last active day is more than one calendar day ago.

#### Dashboard Stats Widget

Shows four stat cards:

1. Focus Time Today (e.g., "2h 30m")
2. Tasks Completed (e.g., "7")
3. Pomodoros (e.g., "6 sessions")
4. Streak (e.g., "🔥 12 days")

---

## 13. Acceptance Criteria

### 13.1 Task Management

- **Given** a user on the dashboard **When** they type in the quick-add input and press Enter **Then** a new task appears in the today's list immediately without a page reload
- **Given** a task exists **When** the user clicks the checkbox **Then** the task moves to the completed section with a strikethrough animation
- **Given** a completed task **When** the user unchecks it **Then** the task returns to the active list
- **Given** multiple tasks **When** the user drags a task to a new position **Then** the order persists after page refresh
- **Given** a task with a due date in the past **When** it is displayed **Then** the due date is visually distinct from non-overdue dates

### 13.2 Pomodoro Timer

- **Given** the timer is idle **When** the user clicks Start **Then** the countdown begins immediately from the configured duration
- **Given** the timer is running **When** the user clicks Pause **Then** the countdown freezes and the button changes to Resume
- **Given** the timer reaches 00:00 **When** the session ends **Then** a visual signal and optional audio cue are displayed, and the session is recorded in statistics
- **Given** a focus session completes **When** the break begins **Then** the session counter increments and the timer displays the break duration
- **Given** 4 sessions have been completed **When** the next break begins **Then** it is a long break, not a short break

### 13.3 Notes

- **Given** a user creates a note with Markdown content **When** viewing the note **Then** the Markdown is rendered as formatted HTML
- **Given** a note is pinned **When** viewing the Notes page **Then** it appears at the top of the list above non-pinned notes
- **Given** a user searches for a term **When** results are displayed **Then** all notes whose title or content contains the term are shown
- **Given** a note exists **When** the user clicks Delete and confirms **Then** the note is permanently removed

### 13.4 Music

- **Given** a user uploads an MP3 file **When** the upload completes **Then** the file appears in the library with title, artist (if available), and duration
- **Given** a track is playing **When** the user clicks Pause **Then** playback stops at the current position
- **Given** Shuffle is enabled **When** the track ends **Then** a random track from the playlist begins
- **Given** the application is offline **When** the user plays a track **Then** playback functions normally because files are local

### 13.5 Statistics

- **Given** a Pomodoro session completes **When** the dashboard stats widget is visible **Then** session count and focus time update immediately
- **Given** a user has completed sessions on 5 consecutive days **When** they view their streak **Then** the streak shows "5 days"
- **Given** a user has not completed any session today **When** viewing stats **Then** today's focus time shows "0m" not an error

---

## 14. Edge Cases

### 14.1 Task Edge Cases

| Scenario                                                 | Expected Behavior                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------------ |
| User creates a task with an empty title                  | Prevent submission; show inline validation message                       |
| User creates a task with a title > 255 characters        | Truncate at input or show character limit                                |
| User deletes a task that is linked to a Pomodoro session | Task is deleted; historical session records are unaffected               |
| User has 0 tasks                                         | Dashboard shows an empty state with encouraging copy, not a blank screen |
| User reorders during a slow network                      | Optimistic update shown immediately; server synced in background         |

### 14.2 Pomodoro Edge Cases

| Scenario                                           | Expected Behavior                                      |
| -------------------------------------------------- | ------------------------------------------------------ |
| User closes browser during active session          | Session is not recorded (tab closed = session lost)    |
| User sets focus duration to 0 minutes              | Input validation prevents saving; minimum 1 minute     |
| User rapidly clicks Start/Stop                     | Debounce controls; only one state transition per click |
| System clock changes during session                | Timer continues based on elapsed time delta            |
| User is on break and manually starts a new session | Break is cancelled; new focus session begins           |

### 14.3 Notes Edge Cases

| Scenario                                  | Expected Behavior                                     |
| ----------------------------------------- | ----------------------------------------------------- |
| User creates a note with no title         | Title defaults to first line of content or "Untitled" |
| User searches with no results             | Show empty state with "No notes found" message        |
| User edits a pinned note                  | Pinned status is preserved after edit                 |
| Note content is very long (>10,000 words) | Editor remains responsive; no truncation of content   |

### 14.4 Music Edge Cases

| Scenario                                       | Expected Behavior                                               |
| ---------------------------------------------- | --------------------------------------------------------------- |
| User uploads a non-MP3 file                    | File is rejected; error message shown                           |
| User uploads a file >50MB                      | File is rejected; error message with size limit shown           |
| User uploads a file with no ID3 tags           | Title derived from filename; artist shown as "Unknown"          |
| User deletes a track that is in a playlist     | Track is removed from all playlists; playlist entry removed     |
| User deletes a track that is currently playing | Playback stops; next available track loads                      |
| Music directory is not writable                | Upload fails with clear error message about storage permissions |
| Playlist has no tracks                         | Empty state shown; play button disabled                         |

### 14.5 Statistics Edge Cases

| Scenario                                                     | Expected Behavior                                          |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| No sessions recorded yet                                     | Stats show 0 values, not errors or "null"                  |
| First time launching app                                     | No streak shown (or "Start your streak today!")            |
| User's system timezone changes                               | Dates are evaluated in local timezone at time of recording |
| User completes a session at 11:59 PM and another at 12:01 AM | They are recorded on separate days                         |

---

## 15. Database Schema Proposal

Flowspace uses **SQLite** via **Prisma ORM**. The schema is defined in `prisma/schema.prisma`.

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

// ─── Tasks ────────────────────────────────────────────────

model Task {
  id          String    @id @default(uuid())
  title       String
  description String?
  priority    String    @default("medium") // "low" | "medium" | "high"
  status      String    @default("active")  // "active" | "completed"
  dueDate     DateTime?
  sortOrder   Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  completedAt DateTime?
}

// ─── Pomodoro Sessions ────────────────────────────────────

model PomodoroSession {
  id          String   @id @default(uuid())
  type        String   // "focus" | "short_break" | "long_break"
  duration    Int      // Planned duration in seconds
  elapsed     Int      // Actual elapsed seconds
  completed   Boolean  @default(false)
  startedAt   DateTime
  endedAt     DateTime?
  createdAt   DateTime @default(now())
}

// ─── Notes ────────────────────────────────────────────────

model Note {
  id        String   @id @default(uuid())
  title     String?
  content   String
  isPinned  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// ─── Music ────────────────────────────────────────────────

model Track {
  id             String          @id @default(uuid())
  filename       String          @unique
  title          String
  artist         String?
  duration       Int             // Seconds
  fileSize       Int             // Bytes
  uploadedAt     DateTime        @default(now())
  playlistTracks PlaylistTrack[]
}

model Playlist {
  id        String          @id @default(uuid())
  name      String
  createdAt DateTime        @default(now())
  updatedAt DateTime        @updatedAt
  tracks    PlaylistTrack[]
}

model PlaylistTrack {
  id         String   @id @default(uuid())
  playlistId String
  trackId    String
  sortOrder  Int      @default(0)
  addedAt    DateTime @default(now())

  playlist Playlist @relation(fields: [playlistId], references: [id], onDelete: Cascade)
  track    Track    @relation(fields: [trackId], references: [id], onDelete: Cascade)

  @@unique([playlistId, trackId])
}

// ─── Daily Statistics ─────────────────────────────────────

model DailyStats {
  id                String   @id @default(uuid())
  date              String   @unique // ISO date string: "2026-06-18"
  focusMinutes      Int      @default(0)
  pomodoroSessions  Int      @default(0)
  tasksCompleted    Int      @default(0)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

// ─── Settings ─────────────────────────────────────────────

model Setting {
  key       String   @id
  value     String
  updatedAt DateTime @updatedAt
}
```

### 15.1 Settings Key-Value Store

The `Setting` model stores application preferences as key-value pairs:

| Key                                   | Default Value | Description                     |
| ------------------------------------- | ------------- | ------------------------------- |
| `theme`                               | `"system"`    | `"light"`, `"dark"`, `"system"` |
| `pomodoro_focus_duration`             | `"1500"`      | Seconds (25 min)                |
| `pomodoro_short_break`                | `"300"`       | Seconds (5 min)                 |
| `pomodoro_long_break`                 | `"900"`       | Seconds (15 min)                |
| `pomodoro_sessions_before_long_break` | `"4"`         | Session count                   |
| `music_volume`                        | `"0.8"`       | 0.0–1.0                         |
| `music_max_upload_mb`                 | `"50"`        | Max upload size                 |

---

## 16. API Design Proposal

All API routes follow the Next.js App Router convention under `/app/api/`. All responses use `application/json`. All timestamps are ISO 8601 strings.

### 16.1 Tasks API

```
GET    /api/tasks              → List tasks (filter: status, date)
POST   /api/tasks              → Create task
GET    /api/tasks/:id          → Get single task
PATCH  /api/tasks/:id          → Update task fields
DELETE /api/tasks/:id          → Delete task
PATCH  /api/tasks/reorder      → Update sortOrder for multiple tasks
```

**Query Parameters for GET /api/tasks:**

- `status` — `active` | `completed` | `all`
- `date` — ISO date string (e.g., `2026-06-18`) to filter by due/created date

**POST /api/tasks Request Body:**

```json
{
  "title": "Write introduction",
  "description": "First draft only",
  "priority": "high",
  "dueDate": "2026-06-19T00:00:00Z"
}
```

**PATCH /api/tasks/:id Request Body (partial update):**

```json
{
  "status": "completed"
}
```

---

### 16.2 Pomodoro API

```
POST   /api/pomodoro/sessions          → Record a new session start
PATCH  /api/pomodoro/sessions/:id      → Update session (elapsed, completed, endedAt)
GET    /api/pomodoro/sessions          → List sessions (filter: date)
```

---

### 16.3 Notes API

```
GET    /api/notes              → List notes (filter: pinned, search)
POST   /api/notes              → Create note
GET    /api/notes/:id          → Get single note
PATCH  /api/notes/:id          → Update note
DELETE /api/notes/:id          → Delete note
```

**Query Parameters for GET /api/notes:**

- `pinned` — `true` | `false`
- `search` — Full-text search string

---

### 16.4 Music API

```
GET    /api/music/tracks               → List all tracks
POST   /api/music/tracks/upload        → Upload MP3 file(s) (multipart/form-data)
DELETE /api/music/tracks/:id           → Delete track and file

GET    /api/music/playlists            → List playlists
POST   /api/music/playlists            → Create playlist
PATCH  /api/music/playlists/:id        → Rename playlist
DELETE /api/music/playlists/:id        → Delete playlist

GET    /api/music/playlists/:id/tracks → List tracks in playlist
POST   /api/music/playlists/:id/tracks → Add track to playlist
DELETE /api/music/playlists/:id/tracks/:trackId → Remove track from playlist
PATCH  /api/music/playlists/:id/tracks/reorder  → Reorder tracks in playlist

GET    /api/music/stream/:id           → Stream MP3 file (supports Range requests)
```

**Notes on /api/music/stream/:id:**

- Must support HTTP Range requests for seeking
- Must set correct `Content-Type: audio/mpeg` header
- Must set `Accept-Ranges: bytes` header

---

### 16.5 Statistics API

```
GET    /api/stats/daily        → Get stats for a date (query: date)
GET    /api/stats/weekly       → Get stats for the past 7 days
GET    /api/stats/streak       → Get current and best streak
POST   /api/stats/daily        → Upsert today's stats record
```

---

### 16.6 Settings API

```
GET    /api/settings           → Get all settings as key-value map
PATCH  /api/settings           → Update one or more settings
```

**PATCH /api/settings Request Body:**

```json
{
  "theme": "dark",
  "pomodoro_focus_duration": "1500"
}
```

---

### 16.7 API Response Format

**Success Response:**

```json
{
  "data": { ... },
  "meta": { "total": 12 }
}
```

**Error Response:**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "field": "title"
  }
}
```

**Standard HTTP Status Codes:**

- `200` — Success
- `201` — Created
- `204` — Deleted (no body)
- `400` — Validation error
- `404` — Resource not found
- `413` — File too large
- `422` — Unprocessable entity
- `500` — Server error

---

## 17. UI/UX Design Principles

### 17.1 Visual Language

Flowspace uses a strict black-and-white design language.

**Color Palette:**

| Token                      | Light Mode | Dark Mode |
| -------------------------- | ---------- | --------- |
| `--color-bg`               | `#FFFFFF`  | `#0A0A0A` |
| `--color-surface`          | `#F5F5F5`  | `#141414` |
| `--color-surface-elevated` | `#EBEBEB`  | `#1E1E1E` |
| `--color-border`           | `#E0E0E0`  | `#2A2A2A` |
| `--color-text-primary`     | `#0A0A0A`  | `#F5F5F5` |
| `--color-text-secondary`   | `#6B6B6B`  | `#9B9B9B` |
| `--color-text-tertiary`    | `#A0A0A0`  | `#6B6B6B` |
| `--color-accent`           | `#0A0A0A`  | `#F5F5F5` |
| `--color-accent-subtle`    | `#F0F0F0`  | `#1A1A1A` |
| `--color-destructive`      | `#1A1A1A`  | `#E0E0E0` |

The accent is always near-black or near-white depending on theme. No colors outside this palette are introduced.

**Exception:** Priority indicators may use very subtle grayscale differences. No bright colors.

---

### 17.2 Typography

**Font:** Poppins (Google Fonts — loaded locally in the Docker container to support offline use)

| Scale       | Size | Weight | Use                          |
| ----------- | ---- | ------ | ---------------------------- |
| `text-xs`   | 12px | 400    | Metadata, timestamps         |
| `text-sm`   | 14px | 400    | Body text, task descriptions |
| `text-base` | 16px | 400    | Default body                 |
| `text-lg`   | 18px | 500    | Widget headings              |
| `text-xl`   | 20px | 600    | Section headings             |
| `text-2xl`  | 24px | 600    | Page headings                |
| `text-3xl`  | 30px | 700    | Timer display                |
| `text-5xl`  | 48px | 700    | Hero / landing               |

Line height is 1.6 for body text; 1.2 for headings.

---

### 17.3 Spacing and Layout

- Base spacing unit: 4px
- Component padding: 16px–24px
- Section gaps: 24px–48px
- Widget gaps: 16px
- Dashboard is a responsive grid with 1–3 column layouts depending on viewport

---

### 17.4 Motion and Animation

Motion should be:

- **Subtle**: Nothing distracting
- **Purposeful**: Only animate to communicate state change
- **Brief**: Duration 150–250ms for micro-interactions, 300ms for panel transitions

Avoid:

- Bouncing animations
- Decorative animations not tied to user action
- Animations that delay access to content

---

### 17.5 Empty States

Every view that can be empty must have an intentional empty state:

- A brief, human message (e.g., "No tasks yet — add one above")
- Optional: a subtle icon or illustration
- A clear call-to-action if applicable

Empty states should feel welcoming, not like errors.

---

### 17.6 Dashboard Layout (Desktop)

```
┌─────────────────────────────────────────────────────────┐
│  Sidebar  │  Header: "Good morning · Thursday, Jun 18"  │
│           │─────────────────────────────────────────────│
│  Dashboard│  ┌─────────────┐  ┌──────────┐  ┌────────┐ │
│  Tasks    │  │   Tasks     │  │ Pomodoro │  │ Stats  │ │
│  Notes    │  │             │  │          │  │        │ │
│  Music    │  │             │  │  25:00   │  │ 2h 30m │ │
│  Stats    │  │             │  │  ● ● ○ ○ │  │ 7 tasks│ │
│  Settings │  └─────────────┘  └──────────┘  └────────┘ │
│           │  ┌──────────────────────┐  ┌─────────────┐  │
│           │  │     Quick Notes      │  │    Music    │  │
│           │  │                      │  │  ▶ Track 1  │  │
│           │  └──────────────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 18. Responsive Design Strategy

### 18.1 Breakpoints

| Breakpoint | Width        | Layout                         |
| ---------- | ------------ | ------------------------------ |
| Mobile     | < 640px      | Single column, stacked widgets |
| Tablet     | 640px–1024px | Two-column grid                |
| Desktop    | > 1024px     | Three-column grid with sidebar |

### 18.2 Mobile Behavior

On mobile:

- Sidebar collapses to a bottom navigation bar or hamburger menu
- Dashboard widgets stack vertically in priority order: Pomodoro → Tasks → Music → Notes → Stats
- Touch targets are minimum 44×44px
- Drag-to-reorder uses long-press gesture
- Music controls remain accessible via a persistent bottom bar

### 18.3 Sidebar on Mobile

On mobile, the sidebar becomes a bottom sheet or slide-in drawer triggered by a menu icon in the top bar.

### 18.4 Pomodoro on Mobile

The Pomodoro timer scales to full-width with the large circular timer centered. Controls use large touch-friendly buttons.

---

## 19. Accessibility Requirements

### 19.1 Standards

Flowspace targets **WCAG 2.1 Level AA** compliance.

### 19.2 Requirements

| Category                  | Requirement                                                                |
| ------------------------- | -------------------------------------------------------------------------- |
| **Color Contrast**        | Text on background must meet 4.5:1 ratio (normal text), 3:1 (large text)   |
| **Keyboard Navigation**   | All interactive elements reachable via Tab; no keyboard traps              |
| **Focus Indicators**      | Visible focus ring on all focusable elements                               |
| **Screen Reader Support** | All meaningful UI elements have ARIA labels or semantic HTML               |
| **Motion**                | Respect `prefers-reduced-motion` media query; disable or reduce animations |
| **Form Labels**           | All inputs have associated labels (visible or `aria-label`)                |
| **Error Identification**  | Errors are described in text, not color alone                              |
| **Skip Navigation**       | "Skip to main content" link available for keyboard users                   |
| **Alt Text**              | All icons have `aria-label` or `title`                                     |

### 19.3 ARIA Patterns

- Timer: `role="timer"` with `aria-live="off"` (avoid constant announcements)
- Task checkboxes: `role="checkbox"` with `aria-checked`
- Sidebar: `role="navigation"` with `aria-label="Main navigation"`
- Modal dialogs: `role="dialog"` with focus trap
- Progress ring: `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`

---

## 20. Technical Architecture

### 20.1 Technology Stack

| Layer            | Technology              | Version       |
| ---------------- | ----------------------- | ------------- |
| Framework        | Next.js App Router      | 14.x          |
| Language         | TypeScript              | 5.x           |
| Styling          | Tailwind CSS            | 3.x           |
| State Management | Zustand                 | 4.x           |
| Database         | SQLite                  | 3.x           |
| ORM              | Prisma                  | 5.x           |
| Runtime          | Node.js                 | 20.x LTS      |
| Containerization | Docker + Docker Compose | Latest stable |

### 20.2 Directory Structure

```
flowspace/
├── app/                        # Next.js App Router
│   ├── (landing)/              # Public landing page route group
│   │   └── page.tsx
│   ├── (app)/                  # Application route group
│   │   ├── layout.tsx          # App shell: sidebar + music bar
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── tasks/
│   │   │   └── page.tsx
│   │   ├── notes/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── music/
│   │   │   └── page.tsx
│   │   ├── stats/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   ├── api/                    # API Routes
│   │   ├── tasks/
│   │   ├── pomodoro/
│   │   ├── notes/
│   │   ├── music/
│   │   ├── stats/
│   │   └── settings/
│   ├── layout.tsx              # Root layout
│   └── globals.css
│
├── components/                 # Shared UI components
│   ├── dashboard/              # Dashboard-specific widgets
│   │   ├── TaskWidget.tsx
│   │   ├── PomodoroWidget.tsx
│   │   ├── NotesWidget.tsx
│   │   ├── MusicWidget.tsx
│   │   └── StatsWidget.tsx
│   ├── tasks/
│   ├── notes/
│   ├── music/
│   ├── pomodoro/
│   └── ui/                     # Base design system components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── ...
│
├── lib/                        # Utility functions and shared logic
│   ├── db.ts                   # Prisma client singleton
│   ├── utils.ts
│   └── constants.ts
│
├── stores/                     # Zustand state stores
│   ├── taskStore.ts
│   ├── pomodoroStore.ts
│   ├── musicStore.ts
│   └── settingsStore.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│   ├── fonts/                  # Bundled Poppins font files
│   ├── sounds/                 # Bundled notification sounds
│   └── icons/
│
├── storage/                    # Runtime data (volume-mounted)
│   └── music/                  # Uploaded MP3 files
│
├── scripts/
│   └── init-db.sh              # Database initialization script
│
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### 20.3 State Management Strategy

Zustand stores handle client-side state. Server state is fetched via Next.js API routes and cached in Zustand.

```typescript
// Example: Pomodoro Store
interface PomodoroStore {
  status: "idle" | "focus" | "paused" | "break" | "long_break";
  secondsRemaining: number;
  sessionsToday: number;
  sessionType: "focus" | "short_break" | "long_break";
  currentSessionId: string | null;

  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  tick: () => void;
}
```

### 20.4 Prisma Client Singleton

```typescript
// lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### 20.5 Music Streaming Architecture

Music files are stored in `/app/storage/music/` inside the container. The streaming API route reads files from this directory and streams them with Range request support for seeking:

```
Browser → GET /api/music/stream/:id?range=... → Next.js API Route → fs.createReadStream → Audio element
```

---

## 21. Docker Deployment Strategy

### 21.1 Philosophy

The Docker setup must be simple enough for non-technical users. The goal is:

```bash
git clone https://github.com/flowspace-app/flowspace
cd flowspace
docker compose up
# Open http://localhost:3000
```

### 21.2 Dockerfile

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/scripts ./scripts

# Create storage directory
RUN mkdir -p /app/storage/music && chown -R nextjs:nodejs /app/storage

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Initialize DB and start server
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
```

### 21.3 docker-compose.yml

```yaml
version: "3.8"

services:
  app:
    build: .
    container_name: flowspace
    ports:
      - "3000:3000"
    volumes:
      - flowspace-db:/app/data
      - flowspace-music:/app/storage/music
    environment:
      - DATABASE_URL=file:/app/data/flowspace.db
      - MUSIC_STORAGE_PATH=/app/storage/music
      - MUSIC_MAX_UPLOAD_MB=50
    restart: unless-stopped

volumes:
  flowspace-db:
    driver: local
  flowspace-music:
    driver: local
```

### 21.4 Environment Variables

| Variable              | Default                       | Required | Description           |
| --------------------- | ----------------------------- | -------- | --------------------- |
| `DATABASE_URL`        | `file:/app/data/flowspace.db` | Yes      | SQLite file path      |
| `MUSIC_STORAGE_PATH`  | `/app/storage/music`          | Yes      | MP3 storage directory |
| `MUSIC_MAX_UPLOAD_MB` | `50`                          | No       | Max MP3 file size     |
| `PORT`                | `3000`                        | No       | HTTP server port      |
| `NODE_ENV`            | `production`                  | No       | Node environment      |

### 21.5 Automatic Initialization

The application handles all initialization automatically on startup:

1. `prisma migrate deploy` — Creates or migrates the SQLite database
2. Storage directory is created with correct permissions in Dockerfile
3. Default settings are seeded via a Prisma seed script on first run

No manual database setup is required.

### 21.6 Data Persistence

Two named Docker volumes ensure data survives container restarts and updates:

- `flowspace-db` — SQLite database file
- `flowspace-music` — Uploaded MP3 files

When updating to a new version:

```bash
docker compose pull
docker compose up -d
```

Data volumes are preserved automatically.

---

## 22. Offline Strategy

### 22.1 What Must Work Offline

| Feature        | Offline Status | Notes                       |
| -------------- | -------------- | --------------------------- |
| Tasks          | ✅ Full        | SQLite is local             |
| Pomodoro Timer | ✅ Full        | Client-side timer           |
| Notes          | ✅ Full        | SQLite is local             |
| Music Playback | ✅ Full        | Files stored locally        |
| Statistics     | ✅ Full        | SQLite is local             |
| Settings       | ✅ Full        | SQLite is local             |
| Fonts          | ✅ Full        | Bundled in `public/fonts/`  |
| Sounds         | ✅ Full        | Bundled in `public/sounds/` |

### 22.2 Font Bundling

Poppins font files are downloaded at build time and served from `/public/fonts/`. No Google Fonts CDN calls are made at runtime.

```css
@font-face {
  font-family: "Poppins";
  src: url("/fonts/poppins-400.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
```

### 22.3 No External Dependencies at Runtime

The application must not make any requests to external services during normal operation. This includes:

- No analytics
- No error reporting to external services
- No CDN-loaded scripts or styles
- No Google Fonts at runtime
- No telemetry

### 22.4 Music Streaming Offline

Music files are served by the Next.js server running on localhost inside Docker. The browser's audio element fetches files from `/api/music/stream/:id` — a local request that functions without internet access.

---

## 23. Open Source Strategy

### 23.1 License

**MIT License**

MIT is chosen because:

- It is the most permissive and widely understood open-source license
- It aligns with the project's philosophy of openness and individual freedom
- It allows users to fork and self-host without restriction
- It welcomes commercial use without complexity

### 23.2 Contribution Model

Flowspace uses a **maintainer-reviewed contribution model**:

- Contributions are welcome via GitHub Pull Requests
- Issues are the primary channel for bug reports and feature requests
- The project follows a **Dictatorship of Simplicity** — features that expand scope or add complexity are rejected, regardless of implementation quality
- The CONTRIBUTING guide is explicit: "If in doubt, open an issue before writing code"

### 23.3 Contribution Workflow

```
1. Fork the repository
2. Create a feature branch (git checkout -b feat/my-feature)
3. Make changes following the code style guide
4. Run tests (npm test)
5. Run linter (npm run lint)
6. Submit a Pull Request with description of changes
7. Maintainer review (aim: < 7 days)
8. Merge or feedback
```

### 23.4 Issue Labels

| Label                 | Meaning                              |
| --------------------- | ------------------------------------ |
| `good first issue`    | Suitable for first-time contributors |
| `bug`                 | Confirmed bug report                 |
| `enhancement`         | Accepted feature request             |
| `documentation`       | Docs-only change                     |
| `question`            | Community question                   |
| `wontfix`             | Out of scope by design               |
| `needs-investigation` | Requires more information            |

### 23.5 Code Quality Standards

- TypeScript strict mode (`"strict": true`)
- ESLint with Next.js config
- Prettier for formatting
- No unused dependencies
- No `any` types in production code
- PR must pass all CI checks before review

### 23.6 Documentation Strategy

```
/docs
├── getting-started.md      # Installation guide for all skill levels
├── development.md          # Local development setup
├── contributing.md         # Contribution guide
├── architecture.md         # Technical overview
├── api.md                  # API reference
├── database.md             # Schema documentation
└── roadmap.md              # Public roadmap
```

README.md must include:

- One-command installation
- Screenshot of the dashboard
- Feature list
- Link to documentation
- License

### 23.7 Community

- **GitHub Discussions** for community questions and ideas
- **GitHub Issues** for bugs and accepted feature requests
- No Discord or external community platforms (keeps maintenance low)

---

## 24. Repository Structure

```
flowspace/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Lint, type check, test on PR
│   │   └── release.yml         # Docker image publish on tag
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
│
├── app/                        # Next.js App Router (see §20.2)
├── components/
├── lib/
├── stores/
├── prisma/
├── public/
│   ├── fonts/                  # Bundled Poppins
│   ├── sounds/                 # Timer notification sounds
│   └── icons/
│
├── storage/                    # Gitignored; created at runtime
│
├── scripts/
│   └── init-db.sh
│
├── docs/
│   ├── getting-started.md
│   ├── development.md
│   ├── contributing.md
│   ├── architecture.md
│   ├── api.md
│   └── database.md
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── Dockerfile
├── docker-compose.yml
├── LICENSE
├── README.md
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 25. MVP Scope

### 25.1 MVP Definition

The MVP is the minimum feature set required for Flowspace to be genuinely useful as a daily productivity workspace. It must be stable, polished, and releasable as v1.0.

### 25.2 MVP Features (Must Ship)

| Feature           | Scope                                                           |
| ----------------- | --------------------------------------------------------------- |
| Landing Page      | Full (hero, philosophy, features, CTA)                          |
| Dashboard         | Full widget layout; all 5 widgets                               |
| Task Management   | Create, edit, delete, complete, reorder, priority, due date     |
| Pomodoro Timer    | Start, pause, resume, stop, auto-break, session counter         |
| Notes             | Create, edit, delete, pin, Markdown rendering                   |
| Music             | Upload MP3, play/pause/skip, volume, shuffle, repeat, playlists |
| Statistics        | Daily stats, streak, weekly summary                             |
| Settings          | Theme, Pomodoro durations                                       |
| Docker Deployment | Single-command install; auto DB init                            |
| Offline Support   | All features function offline                                   |
| Responsive Design | Mobile, tablet, desktop                                         |

### 25.3 Deferred to Post-MVP

| Feature                          | Reason for Deferral                                     |
| -------------------------------- | ------------------------------------------------------- |
| Full-screen focus mode           | Nice to have; not core to MVP value                     |
| Audio notification customization | Low priority; default sound is sufficient               |
| Keyboard shortcut system         | Useful but not MVP-blocking                             |
| Note export (PDF/Markdown)       | Useful but adds complexity                              |
| Task due date reminders          | Requires background process or notifications            |
| Statistics data export           | Nice to have                                            |
| Drag-to-reorder on mobile        | UX complexity; long-press workaround acceptable for MVP |

---

## 26. Future Roadmap

### 26.1 v1.1 — Focus Mode

- Full-screen Pomodoro mode (hides all UI except timer)
- Keyboard shortcuts for timer controls
- Customizable audio notification sounds

### 26.2 v1.2 — Notes Enhancement

- Note export to Markdown file
- Note tags/labels
- Split-pane Markdown editor (edit | preview side-by-side)

### 26.3 v1.3 — Statistics Enhancement

- Monthly view in statistics
- Heatmap calendar (GitHub-style contribution graph)
- Statistics export to CSV

### 26.4 v1.4 — Music Enhancement

- Support additional formats (FLAC, OGG, WAV)
- Album art display (from ID3 tags)
- Sleep timer for music

### 26.5 v2.0 — Plugin Architecture (Exploratory)

Flowspace may introduce a lightweight plugin system allowing community-contributed widgets on the dashboard. This is highly exploratory and would require:

- A stable widget contract/API
- A curated plugin registry (not open submission)
- Strict quality and philosophy review
- No plugins that require internet access or authentication

This is not committed and is subject to community demand.

### 26.6 Intentional Non-Roadmap Items

The following will **never** be added to Flowspace:

- Team collaboration
- Cloud sync
- Authentication / accounts
- Subscriptions / payments
- Mobile native apps
- Calendar integration
- Email integration
- AI features
- Advertising

---

## 27. Risks and Mitigations

### 27.1 Technical Risks

| Risk                             | Likelihood | Impact | Mitigation                                                            |
| -------------------------------- | ---------- | ------ | --------------------------------------------------------------------- |
| SQLite file corruption           | Low        | High   | Docker volume backups; documented manual backup procedure             |
| Large music library performance  | Medium     | Medium | Paginate track lists; limit library via configurable max-track count  |
| MP3 streaming seek issues        | Medium     | Low    | Implement proper Range request handling; test across browsers         |
| Timer drift on long sessions     | Low        | Low    | Use `Date.now()` delta calculation rather than pure interval counting |
| Next.js upgrade breaking changes | Medium     | Medium | Pin dependency versions; test on upgrade                              |

### 27.2 UX Risks

| Risk                                     | Likelihood | Impact | Mitigation                                                              |
| ---------------------------------------- | ---------- | ------ | ----------------------------------------------------------------------- |
| Dashboard feels cluttered                | Medium     | High   | Cap dashboard to 5 widgets; strict widget size limits                   |
| Mobile UX is poor                        | Medium     | High   | Mobile-first development pass before v1.0 release                       |
| Non-technical users struggle with Docker | Medium     | Medium | Provide video installation guide; consider pre-built binary alternative |
| Empty state feels discouraging           | Low        | Medium | Design intentional, warm empty states for all views                     |

### 27.3 Project Risks

| Risk                                    | Likelihood | Impact | Mitigation                                                                                                   |
| --------------------------------------- | ---------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| Feature creep from community requests   | High       | High   | Documented product philosophy; clear wontfix criteria                                                        |
| Maintainer burnout                      | Medium     | High   | Clear contribution path; delegate merge rights early                                                         |
| No community traction                   | Medium     | Low    | Product is designed for individual use; community is a bonus                                                 |
| Security vulnerabilities in file upload | Medium     | High   | Validate MIME type and extension; scan with `file-type` library; limit upload path to storage directory only |

### 27.4 Security Considerations

Despite having no authentication, Flowspace should follow security best practices for a locally-hosted application:

- Validate all API inputs
- Restrict file upload to allowed MIME types and extensions
- Prevent path traversal in file serving routes
- Set appropriate Content Security Policy headers
- Do not expose the storage directory via raw static file serving (use streaming API route only)
- Bind to `127.0.0.1` by default in local development (not `0.0.0.0`)

---

_End of Flowspace Product Requirements Document_

_Version 1.0.0 — Implementation-Ready_  
_All sections are complete and sufficient for engineering, design, and open-source contribution to begin immediately._
