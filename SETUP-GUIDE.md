# SylCycle Online — Firebase Setup Guide

This guide walks you through setting up Firebase so that SylCycle stores your data in the cloud. Once done, you (and any colleagues) can log in from any device and access your worksheets, assessments, and lesson plans.

**Time needed:** ~20 minutes of clicking through Google forms. Zero code to write.

---

## Step 1 — Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com/)
2. Sign in with your Google account (any Google account — it doesn't need to be the same one you'll log in with)
3. Click **"Create a project"**
4. Name it something like `sylcycle`
5. You can disable Google Analytics when asked (you don't need it)
6. Click **Create project** → wait ~30 seconds → click **Continue**

---

## Step 2 — Enable Authentication

1. In the left sidebar, click **Build → Authentication**
2. Click **"Get started"**
3. Under **Sign-in method**, enable:
   - **Google** (toggle it on → select your email as project support → Save)
   - **Email/Password** (toggle it on → Save)
4. That's it — both sign-in methods are now live

---

## Step 3 — Create the Firestore database

1. In the left sidebar, click **Build → Firestore Database**
2. Click **"Create database"**
3. Choose a location close to you (e.g. `europe-west1` for France)
4. Start in **production mode** (we'll set the rules next)
5. Click **Create**

---

## Step 4 — Set Firestore security rules

1. In Firestore, click the **"Rules"** tab
2. Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **Publish**

This means: each logged-in user can only read and write their own data. Nobody can see anyone else's worksheets or assessments.

---

## Step 5 — Register a web app and get your config

1. Go to **Project settings** (gear icon in the left sidebar)
2. Scroll down to **"Your apps"** → click the **Web** icon (`</>`)
3. Give it a nickname like `SylCycle Web`
4. You do NOT need Firebase Hosting (uncheck if asked)
5. Click **Register app**
6. You'll see a code block with your Firebase config. It looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB1234567890abcdefg",
  authDomain: "sylcycle.firebaseapp.com",
  projectId: "sylcycle",
  storageBucket: "sylcycle.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

7. Copy these values.

---

## Step 6 — Paste the config into sylcycle-auth.js

Open `sylcycle-auth.js` and replace the placeholder values at the top:

```javascript
const FIREBASE_CONFIG = {
  apiKey:            'AIzaSyB1234567890abcdefg',       // ← your value
  authDomain:        'sylcycle.firebaseapp.com',         // ← your value
  projectId:         'sylcycle',                         // ← your value
  storageBucket:     'sylcycle.firebasestorage.app',     // ← your value
  messagingSenderId: '123456789012',                     // ← your value
  appId:             '1:123456789012:web:abc123def456'   // ← your value
};
```

Save the file.

> **Note:** Firebase API keys are safe in client-side code — they're project identifiers, not secrets. Google's own documentation confirms this.

---

## Step 7 — Deploy to Netlify

Upload all files to your Netlify site. Your file structure should be:

```
your-site/
  ├── index.html           ← launcher (login + app picker)
  ├── sylcycle-auth.js      ← shared auth module
  ├── studio.html           ← CycleStudio
  ├── assess.html           ← CycleAssess
  ├── planning.html         ← CyclePlanner
```

If you're using Netlify drag-and-drop: just drag the folder containing all 5 files.

---

## Step 8 — Add your domain to Firebase (important!)

1. Go back to Firebase Console → **Authentication → Settings → Authorized domains**
2. Click **Add domain**
3. Add your Netlify domain, e.g. `sylcycle.netlify.app` (or your custom domain)
4. Without this step, Google sign-in will be blocked by Firebase

---

## How it works (what changed in your apps)

The changes to each app are minimal:

- **4 script tags** added to each app's `<head>` (Firebase SDK + sylcycle-auth.js)
- **Save functions** got one extra line: after writing to localStorage, they also fire-and-forget a write to Firestore
- **App init** waits for cloud sync before starting (so cloud data is in localStorage before the app reads it)

The apps still use localStorage as their primary read source — Firestore is synced down to localStorage on login, and synced up on every save. This means the apps feel exactly as fast as before.

---

## Storage keys synced to Firestore

`sylcycle-auth.js` treats these localStorage keys as the cloud-sync contract. Keep this list in step with `APP_KEYS` if a tool adds or renames saved data.

| Tool | localStorage keys | What they contain |
| --- | --- | --- |
| CycleStudio | `wg_v1_prefs` | Studio settings, including the user's API key and model preferences |
| CycleStudio | `wg_v1_drafts` | Saved worksheet drafts |
| CycleStudio | `wg_v1_templates` | Saved worksheet templates |
| CycleStudio | `cyclestudio_history_v1` | Recent generated worksheet history |
| CycleStudio | `cyclestudio_editor_accordions_v2` | Editor panel open/closed preferences |
| CycleAssess | `ca_v2_data` | Students, classes, assessments, batch records, and heatmap data |
| CycleAssess | `ca_v2_settings` | Assess settings, including the user's API key and default context |
| CyclePlanner | `cycleplanner_refactor_prefs_v1` | Planner settings and preferences |
| CyclePlanner | `cycleplanner_refactor_current_v1` | The current in-progress plan |
| CyclePlanner | `cycleplanner_refactor_history_v1` | Saved planning history |
| CyclePlanner | `cycleplanner_refactor_templates_v1` | Saved planning templates |

Firestore stores each key under the signed-in user's private collection for that tool. For example, CycleAssess writes `ca_v2_data` to the current user's `assess` collection.

---

## First-time migration

The first time you log in on a device that has existing localStorage data (i.e. your laptop where you've been using the apps locally), the system detects that Firestore is empty and automatically **uploads** your local data to the cloud. After that, any new device you log in on will pull that data down.

---

## FAQ

**Q: Do my colleagues need their own Anthropic API key?**
Yes — each user's API key is stored per-user in their preferences. The key is never shared between accounts.

**Q: Is there a cost?**
Firebase's free tier (Spark plan) includes 1 GB Firestore storage, 50,000 reads/day, and 20,000 writes/day. For a school team, you'll never come close to these limits.

**Q: Can I go back to local-only mode?**
Yes. If `sylcycle-auth.js` can't reach Firebase (or the config is left as placeholders), the apps fall back to localStorage exactly as before. Nothing breaks.

**Q: Can users share templates with each other?**
Not yet — each user's data is private. This could be added later as a "shared library" feature if you want it.

**Q: What about the SylCycle badge/IFS logo?**
The launcher logo lives at `assets/sylcycle-logo.svg`, and `index.html` references it from the header.
