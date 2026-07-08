---
# Flowspace — Product Requirements Document

**Version:** 1.1.0

**Status:** Implementation-Ready

**Last Updated:** June 2026

**Document Type:** Product Requirements Document (PRD)

---

## Table of Contents

1. [Executive Summary](https://www.google.com/search?q=%231-executive-summary)
2. [Product Vision](https://www.google.com/search?q=%232-product-vision)
3. [Product Philosophy](https://www.google.com/search?q=%233-product-philosophy)
4. [Problem Statement](https://www.google.com/search?q=%234-problem-statement)
5. [Goals and Success Metrics](https://www.google.com/search?q=%235-goals-and-success-metrics)
6. [User Personas](https://www.google.com/search?q=%236-user-personas)
7. [User Stories](https://www.google.com/search?q=%237-user-stories)
8. [Information Architecture](https://www.google.com/search?q=%238-information-architecture)
9. [Navigation Structure](https://www.google.com/search?q=%239-navigation-structure)
10. [User Flows](https://www.google.com/search?q=%2310-user-flows)
11. [Functional Requirements](https://www.google.com/search?q=%2311-functional-requirements)
12. [Feature Specifications](https://www.google.com/search?q=%2312-feature-specifications)
13. [Acceptance Criteria](https://www.google.com/search?q=%2313-acceptance-criteria)
14. [Edge Cases](https://www.google.com/search?q=%2314-edge-cases)
15. [Database Schema Proposal](https://www.google.com/search?q=%2315-database-schema-proposal)
16. [API Design Proposal](https://www.google.com/search?q=%2316-api-design-proposal)
17. [UI/UX Design Principles](https://www.google.com/search?q=%2317-uiux-design-principles)
18. [Responsive Design Strategy](https://www.google.com/search?q=%2318-responsive-design-strategy)
19. [Accessibility Requirements](https://www.google.com/search?q=%2319-accessibility-requirements)
20. [Technical Architecture](https://www.google.com/search?q=%2320-technical-architecture)
21. [Docker Deployment Strategy](https://www.google.com/search?q=%2321-docker-deployment-strategy)
22. [Offline Strategy](https://www.google.com/search?q=%2322-offline-strategy)
23. [Open Source Strategy](https://www.google.com/search?q=%2323-open-source-strategy)
24. [Repository Structure](https://www.google.com/search?q=%2324-repository-structure)
25. [MVP Scope](https://www.google.com/search?q=%2325-mvp-scope)
26. [Future Roadmap](https://www.google.com/search?q=%2326-future-roadmap)
27. [Risks and Mitigations](https://www.google.com/search?q=%2327-risks-and-mitigations)

---

## 1. Executive Summary

Flowspace is a minimalist, self-hosted personal productivity application built for individuals who want to focus deeply on today's work. The application consolidates task management, Pomodoro-based focus sessions, personal note-taking, and local music playback into a single unified dashboard.

To support different contexts of a user's life (e.g., Work vs. Personal), Flowspace implements strict isolated **Workspaces**. All data remains on the user's own machine. There is no authentication, no cloud, and no subscription.

---

## 2. Product Vision

> Flowspace is the workspace you open every morning — calm, familiar, and ready — helping you answer one question: _What should I focus on right now?_

Flowspace rejects the complex models of enterprise tools. The vision is a personal digital desk with distinct contexts (Workspaces) where users can drop into focus immediately, track what matters today, capture a thought, and play music — all from one screen, on their own computer.

---

## 3. Product Philosophy

### 3.1 Today First

Flowspace answers "What should I focus on today?".

### 3.2 Dashboard First

The dashboard is the primary workspace. Page switches are the exception.

### 3.3 Flow State

Every feature must help the user enter and maintain deep focus.

### 3.4 Simplicity

No enterprise workflows. No complex configuration. Features like Timeboxing are handled as lightweight metadata rather than complex calendar interfaces.

### 3.5 Offline First

100% functionality without an internet connection.

### 3.6 Personal Workspace

Built for one person. Workspaces separate contexts (e.g., Work, Personal), not users.

---

## 4. Problem Statement

Knowledge workers, students, freelancers, and creators increasingly feel overwhelmed by their own productivity tools. Project management platforms designed for teams are repurposed for personal use, resulting in a mismatch: the individual user must navigate enterprise UX, maintain complex project hierarchies, and manage notification systems designed for coordination — when all they need is a clear answer to "what should I work on today?"

---

## 5. Goals and Success Metrics

- **Installation simplicity:** A non-technical user can install and launch Flowspace in under 5 minutes.
- **Dashboard utility:** 80%+ of daily interactions happen on the dashboard.
- **Offline reliability:** 100% of core features function without internet access.

---

## 6. User Personas

- **Maya (26):** Graduate Student. Needs a clean daily task view and distraction-free focus sessions.
- **James (33):** Freelance Developer. Needs task management, Pomodoro timing, and data privacy.
- **Sofia (29):** UX Designer. Needs a dashboard-first experience with music, clean design, quick notes.
- **Robert (64):** Retired Teacher. Needs simple tasks, notes, minimal setup without accounts.

---

## 7. User Stories

### 7.1 Workspace Management

| ID   | As a... | I want to...                                      | So that...                                      |
| ---- | ------- | ------------------------------------------------- | ----------------------------------------------- |
| W-01 | user    | create multiple workspaces (e.g., Personal, Work) | I can separate my contexts completely           |
| W-02 | user    | switch between workspaces from the dashboard      | I can shift my focus without mixing data        |
| W-03 | user    | have one default workspace                        | The app opens to my primary context immediately |

### 7.2 Task Management

| ID                                                                               | As a... | I want to...                                       | So that...                                                  |
| -------------------------------------------------------------------------------- | ------- | -------------------------------------------------- | ----------------------------------------------------------- |
| T-01                                                                             | user    | create a task quickly from the dashboard           | I don't need to navigate away from my workspace             |
| T-13                                                                             | user    | assign a start and end time to a task (Timeboxing) | I can structure my day (UI implementation planned for v1.2) |
| _(Other standard task stories: edit, delete, complete, reorder, add due dates)._ |         |                                                    |                                                             |

---

## 8. Information Architecture

```text
Flowspace
├── Landing Page
└── Application
    ├── Workspace Selector (Dropdown in Header)
    ├── Dashboard (Primary Workspace)
    │   ├── Task Widget
    │   ├── Pomodoro Widget
    │   ├── Quick Notes Widget
    │   ├── Music Player Widget
    │   └── Daily Stats Widget
    ├── Tasks Page
    ├── Notes Page
    ├── Music Library Page
    ├── Statistics Page
    └── Settings Page (Workspace-specific settings)

```

---

## 9. Navigation Structure

- The dashboard is the default and primary view.
- Persistent elements: Music player mini-bar and Sidebar navigation (with Workspace Switcher).

---

## 10. User Flows

**(First Launch Flow)** User runs Docker Compose -> Browser opens -> Landing Page -> User clicks "Go to Dashboard" -> User creates first task in Default Workspace -> User starts first Pomodoro.

---

## 11. Functional Requirements

### 11.1 Workspaces

| ID      | Requirement                                                       | Priority  |
| ------- | ----------------------------------------------------------------- | --------- |
| FR-W-01 | System shall initialize a "Default" workspace on first launch     | Must Have |
| FR-W-02 | System shall allow creation, renaming, and deletion of workspaces | Must Have |
| FR-W-03 | System shall strictly isolate ALL data by active workspace        | Must Have |

### 11.2 Task Management

| ID      | Requirement                                                                 | Priority  |
| ------- | --------------------------------------------------------------------------- | --------- |
| FR-T-13 | Database shall support `startTime` and `endTime` for lightweight timeboxing | Must Have |

---

## 12. Feature Specifications

### 12.1 Workspace Isolation (Core System Spec)

All data in Flowspace is strictly partitioned by `workspaceId`. When a user switches workspaces, the Zustand `WorkspaceStore` updates the `activeWorkspaceId`, which causes all dashboard widgets to refetch their data.

### 12.2 Task Management

**Task Object:** `id`, `workspaceId`, `title`, `description`, `priority`, `status`, `dueDate`, `startTime`, `endTime`, `sortOrder`, `createdAt`, `updatedAt`, `completedAt`.

---

## 13. Acceptance Criteria

- **Workspaces:** Given a user is in "Work" workspace When they create a task and switch to "Personal" workspace Then the task is no longer visible.

---

## 14. Edge Cases

- **Workspace Deletion:** Deleting a workspace cascades and deletes ALL associated data (Tasks, Notes, Files).
- **Last Workspace:** The system prevents the user from deleting the last remaining workspace.

---

## 15. Database Schema Proposal

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Workspace {
  id        String   @id @default(uuid())
  name      String
  isDefault Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  tasks            Task[]
  pomodoroSessions PomodoroSession[]
  notes            Note[]
  tracks           Track[]
  playlists        Playlist[]
  dailyStats       DailyStats[]
  settings         Setting[]
}

model Task {
  id          String    @id @default(uuid())
  title       String
  description String?
  priority    String    @default("medium")
  status      String    @default("active")
  dueDate     DateTime?
  startTime   DateTime? // Foundation for v1.2 Timeboxing
  endTime     DateTime? // Foundation for v1.2 Timeboxing
  sortOrder   Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  completedAt DateTime?

  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
}

model PomodoroSession {
  id          String   @id @default(uuid())
  type        String
  duration    Int
  elapsed     Int
  completed   Boolean  @default(false)
  startedAt   DateTime
  endedAt     DateTime?
  createdAt   DateTime @default(now())

  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
}

model Note {
  id        String   @id @default(uuid())
  title     String?
  content   String
  isPinned  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
}

model Track {
  id             String          @id @default(uuid())
  filename       String
  title          String
  artist         String?
  duration       Int
  fileSize       Int
  uploadedAt     DateTime        @default(now())
  playlistTracks PlaylistTrack[]

  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  @@unique([filename, workspaceId])
}

model Playlist {
  id        String          @id @default(uuid())
  name      String
  createdAt DateTime        @default(now())
  updatedAt DateTime        @updatedAt
  tracks    PlaylistTrack[]

  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
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

model DailyStats {
  id                String   @id @default(uuid())
  date              String
  focusMinutes      Int      @default(0)
  pomodoroSessions  Int      @default(0)
  tasksCompleted    Int      @default(0)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  @@unique([date, workspaceId])
}

model Setting {
  id        String   @id @default(uuid())
  key       String
  value     String
  updatedAt DateTime @updatedAt

  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id], onDelete: Cascade)

  @@unique([key, workspaceId])
}

```

---

## 16. API Design Proposal (Server Actions)

Because we are using Next.js 14 App Router and Pragmatic Clean Architecture, we rely heavily on **Server Actions** instead of traditional REST APIs for internal application logic.

**Server Actions (`src/server/actions/`)**:

- `WorkspaceActions`: createWorkspace, deleteWorkspace, switchWorkspace.
- `TaskActions`: createTask, updateTask, deleteTask, reorderTasks. (Always scoped by `workspaceId`).
- `NoteActions`: createNote, updateNote, deleteNote.
- `PomodoroActions`: saveSession, getStats.

**HTTP Route Handlers (`src/app/api/`)**:

- `GET /api/music/stream/[id]`: Stream MP3 file (supports Range requests).

---

## 17-24. Design, Architecture & Docker Strategy

_(Remains identical to v1.0.0. Focuses on strict black-and-white minimalist UI, local SQLite with Docker volumes, `output: 'standalone'` in Next.js build, and an Offline First approach)._

---

## 25. MVP Scope

- **Workspaces:** Create, switch, and delete workspaces. Strict data isolation.
- **Tasks:** Basic CRUD. _(Note: Task Timeboxing UI is explicitly deferred to v1.2 to maintain MVP velocity, though DB schema is ready)._
- **Pomodoro:** Basic timer and session counting.
- **Music & Notes:** Local file upload/playback and markdown notes.

---

## 26. Future Roadmap

### 26.1 v1.1 — Focus Mode

- Full-screen Pomodoro mode.

### 26.2 v1.2 — Timeboxing & Advanced Tasks

- **Lightweight Timeboxing:** UI to set `startTime` and `endTime` on tasks.
- **Browser Notifications:** Alert user when a timeboxed task is scheduled to begin.
- Note export and tagging.

---

## 27. Risks and Mitigations

- **Feature creep:** Documented product philosophy; clear wontfix criteria.
- **Large music library performance:** Limit library via configurable max-track count.

---
