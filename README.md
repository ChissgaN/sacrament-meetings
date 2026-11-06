W02 Assignment: Sacrament Meeting Planner
Overview
In this assignment, you will develop a Sacrament Meeting Planner application that uses typed data models, reusable layouts, client-side navigation, optimized fonts and images, global Tailwind CSS styling, and server-side API routes to fetch meeting data.

Description
The application helps bishoprics and branch leaders plan and review meeting agendas. It also allows members to view and print current and past programs. The application tracks announcements, prayers, ward business, hymns, musical numbers, and speakers.

Application Requirements
The app should managing sacrament meeting entries for each Sunday, with default meeting details and one of the following meeting types:
testimony
regular
stake (non-sacrament meeting)
general (non-sacrament meeting)
The app should allow leaders to:
View and navigate between a list of meeting entries and their details.
View meeting details including:
Announcements
Opening Hymn
Opening Prayer
Ward Business
Stake Business (true/false)
Sacrament Hymn
Speakers and musical numbers
Closing Hymn
Closing Prayer
The app should allow users to view and print meeting programs for the current and past weeks.

Instructions
Create the Next.js app
Create a local project folder named sacrament-meetings:
mkdir sacrament-meetings
cd sacrament-meetings
Create a new Next.js app in the current folder:
npx create-next-app@latest . --typescript --tailwind --app
Start the development server:
npm run dev
After confirming the app runs, initialize git and publish the clean scaffold to a new GitHub repository named sacrament-meetings:
git init
git add .
git commit -m "Initial Next.js scaffold"
git branch -M main
git remote add origin https://github.com/your-username/sacrament-meetings.git
git push -u origin main
Why push the scaffold to main first? This gives main a clean starting point. Your peer reviewer will compare your finished code with this baseline using a Pull Request next week, so the diff will only show the meaningful work you did, not the generated scaffold.

Immediately create a development branch and switch to it before writing any assignment code:
git checkout -b peer-code-review
All of your Week 02 work happens on this branch. Do not commit assignment code to main.

Develop the Project Structure
First, verify that you are in the peer-code-review branch of your project:
git branch
How to change branches in VS Code
Consider the following initial structure and components for the project. You don't need to follow this exactly, but it should give you an idea of how to organize your files and routes. Focus on building the core functionality.
The create-next-app scaffold includes additional files. Leave those files as they are.

sacrament-meetings/
            ├── app/
            │   ├── api/
            │   │   └── meetings/
            │   │       ├── route.ts              → GET /api/meetings (POST is optional stretch)
            │   │       └── [id]/
            │   │           └── route.ts          → GET /api/meetings/[id]
            │   ├── meetings/
            │   │   ├── layout.tsx                (meetings section layout)
            │   │   ├── loading.tsx               (loading UI for meetings routes)
            │   │   ├── page.tsx                  (all meetings list)
            │   │   ├── current/
            │   │   │   └── page.tsx              (redirects to current Sunday's meeting)
            │   │   └── [id]/
            │   │       └── page.tsx              (single meeting detail + print mode)
            │   ├── globals.css
            │   ├── layout.tsx                    (root layout)
            │   └── page.tsx                      (landing page)
            │
            ├── components/
            │   ├── Header.tsx                    (ward name + current date)
            │   ├── Footer.tsx
            │   ├── NavLinks.tsx                  (active-link navigation)
            │   ├── MeetingCard.tsx               (summary card for list view)
            │   └── MeetingDetail.tsx             (full agenda detail view)
            │
            ├── lib/
            │   ├── types.ts                      (TypeScript interfaces)
            │   └── meetings-db.ts                (temporary in-memory data this week)
            │
            ├── public/
            └── package.json
Define TypeScript types and in-memory data
Create lib/types.ts with interfaces that fully model the app specifications:
export type MeetingType =
  | 'testimony'
  | 'regular'
  | 'stake'
  | 'general';

export interface Hymn {
  number: number;
  title: string;
}

export interface SpeakerItem {
  name: string;
  topic: string;
  type: 'speaker' | 'musical-number';
}

export interface WardBusinessItem {
  description: string;
}

export interface SacramentMeeting {
  id: number;
  date: string;              // ISO date string: 'YYYY-MM-DD'
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  announcements?: string[];
  openingHymn: Hymn;
  openingPrayer: string;
  wardBusiness: WardBusinessItem[];
  stakeBusiness: boolean;
  sacramentHymn: Hymn;
  speakers: SpeakerItem[];
  closingHymn: Hymn;
  closingPrayer: string;
}
Create lib/meetings-db.ts as an in-memory data module. It should hold at least five meeting records and export query functions.
The in-memory data module is a temporary scaffold. Mutation functions for adding, updating, or deleting meetings are optional this week and will be implemented in later weeks. Print views, however, are part of the required user experience.

Example structure for lib/meetings-db.ts
Ensure all component props and API return values use explicit types — avoid any.
Build global styling and reusable UI
Use app/globals.css to define shared styling tokens (colors, spacing, or typography defaults).
Use Tailwind utility classes in your components for layout and presentation consistency.
Create reusable components:
Header and Footer — Keep app/layout.tsx focused on composition. The header should show ward name and current date.
MeetingCard — Summary card used in the meetings list. Accepts a SacramentMeeting prop and links to the detail page.
MeetingDetail — Full agenda view for a single meeting. Renders all fields from the SacramentMeeting interface, including hymns, prayers, speakers, musical numbers, and ward business.
NavLinks — Client Component that renders navigation links and applies an active style to the current route using usePathname.
Use optimized fonts and images
In app/layout.tsx, load at least one Google Font using next/font/google and apply it globally.
Replace plain <img> tags with next/image for at least one hero or section image.
Set correct alt, width, and height attributes to avoid layout shifts.
Create nested layouts and navigation
Define a root layout in app/layout.tsx and compose app-level Header, route content, and Footer.
Add a section layout in app/meetings/layout.tsx for meetings-specific navigation.
Create routes:
/ — landing/home page
/meetings — list of all meetings
/meetings/[id] — full agenda detail for a single meeting
/meetings/current — auto-redirect to the current Sunday's meeting
Help: finding the most recent Sunday
Use Link for internal navigation and verify active-link styles update correctly.
Add loading.tsx to app/meetings/ to implement a route-level loading state.
Your loading state may not be visible with in-memory data; that is expected. In-memory reads resolve too quickly for the UI to display the fallback. The loading state will become meaningful when database queries introduce latency.

Build API routes and fetch data
Implement collection handlers in app/api/meetings/route.ts:
GET /api/meetings using getMeetings() from lib/meetings-db.ts (optional ?date= filter).
// /api/meetings
// /api/meetings?date=2026-05-03
Help: reading query parameters in a route handler
Implement an item handler in app/api/meetings/[id]/route.ts using getMeetingById(). Return:
GET: returns 200 with the matching meeting when the ID is valid and found
400 when the id parameter is not a valid number
404 when no meeting with the given ID exists
Fetch from your API routes in meeting pages and render the results using typed components:
app/meetings/page.tsx fetches /api/meetings and renders MeetingCard for each result.
app/meetings/[id]/page.tsx fetches /api/meetings/[id] and renders MeetingDetail.
Required quality and accessibility checks
Run local checks before submission:
npm run lint
npm run build
Run accessibility checks on the main user-facing routes:
Verify keyboard navigation works for links and any buttons.
Ensure form inputs have clear labels and interactive elements have accessible names.
Confirm images use meaningful alt text and headings follow a logical order.
Recommended: Run Lighthouse in Chrome DevTools on key pages and review all categories for mobile and desktop. Address issues such as color contrast, missing labels, or incorrect semantic structure as time permits.

Use AI to review your code for implementation issues before submitting. Ask it to focus on bugs, accessibility, incorrect routing or API behavior, type-safety problems, and missing assignment requirements rather than style preferences.
Example prompt
Manually verify these routes in the browser:
/meetings
/meetings/1 (or any valid id from your data)
/meetings/current (should redirect to this Sunday)
/api/meetings
/api/meetings?date=2026-05-03
/api/meetings/1
/api/meetings/abc (should return 400)
Create a Pull Request for Code Review
At the start of this assignment you committed the generated Next.js scaffold to main and then branched off to do all your work on peer-code-review. Because both branches share that same scaffold as their common ancestor, a Pull Request from peer-code-review → main produces a diff that shows only the code you wrote — nothing from the generated scaffold. That diff is what your peer reviewer will evaluate.

This Pull Request is for code review only — do not merge it. Leave it open until the peer review is complete.

How to Create a Pull Request
Make sure all your work is committed on the peer-code-review branch:
git add .
git commit -m "Sacrament meeting planner assignment"
git push -u origin peer-code-review
Navigate to your sacrament-meetings GitHub repository.
Click Compare & pull request (GitHub shows this banner after a branch is pushed), or go to the Pull requests tab and click New pull request.
Set base to main and compare to peer-code-review.
Verify the Files changed tab shows your entire implementation to date. If it shows no changes, you may have committed work to main instead of the branch — ask your instructor for help.
The diff between main (scaffold only) and peer-code-review (your finished work) is exactly what your peer reviewer will use to evaluate your code next week.

Add a meaningful title (for example, "W2 Sacrament Meeting Planner") and a short description, then click Create pull request.
Connect the Repository to Vercel
sacrament-meetings is a new repository, so it needs its own Vercel project — importing it does not reuse the settings from your Week 01 portfolio project.

In vercel.com, select Add New → Project and import your sacrament-meetings repository.
Confirm the framework preset is detected as Next.js, then click Deploy.
Once the main deployment finishes, push your peer-code-review branch (see the next section) so Vercel generates a matching preview deployment.
Open Settings → Deployment Protection and turn off Vercel Authentication.
This is a per-project setting. Every new Vercel project defaults to requiring a Vercel login to view any deployment, including previews. Disabling it in your Week 01 project does not carry over to this one. If you skip this step, your grader and teammates will not be able to open your peer-code-review preview URL and you'll likely be asked to resubmit. Because the setting applies to the whole project, disabling it once here covers main, peer-code-review, and every deployment you push in later weeks — you do not need to stay on main to avoid this, and doing so would defeat the purpose of the branch-based peer review.

Verify the fix by opening your peer-code-review preview URL in a private/incognito browser window — it should load the app directly, with no Vercel login prompt.
Update Team Membership Document
Update your line in the team membership document (team-membership.docx) in Microsoft Teams to identify your assigned code-review teammate.

Provide your Pull Request URL in the next line below your name.
Provide the Vercel preview URL for the peer-code-review branch.
Your membership file update should look something like this:

1. Jeff White
    Week 01: https://github.com/jeff-white/wdd430-portfolio
    Week 02: https://github.com/jeff-white/sacrament-meetings/pull/1
    Week 02: https://sacrament-meetings-peer-code-review-jeff-white.vercel.app/  
2. Adriana Cuevas  - https://github.com/adriana28218/wdd430-portfolio
3. Wisdom Bentum - https://github.com/bentumwi/wdd430-portfolio
Submission Instructions
Submit the following items in the text entry area provided in Canvas:

Project Links
GitHub repository URL for your sacrament-meetings repository.
Pull Request URL — the link to your open Pull Request on GitHub.
Vercel preview URL for your peer-code-review branch. When you push a branch to GitHub, Vercel automatically generates a unique preview deployment for it. Find the URL in your Vercel project dashboard under Deployments — look for the entry tagged with peer-code-review. Do not submit the production URL, as that points to the empty scaffold on main.
Before submitting, open this URL in a private/incognito window. If it prompts you to log in to Vercel, your Deployment Protection is still on — go back and disable Vercel Authentication in your project's Settings, or your grader will not be able to view your app.

Reflection
Describe one architectural or component decision you made: what alternatives did you consider, and why did you choose your approach?
Provide a brief summary of any challenges you encountered in the assignment.