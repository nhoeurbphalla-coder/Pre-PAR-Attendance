# PAR Attendance System

Replaces the "one Google Form + Sheet per activity, then copy-paste into PAR" workflow with:

- **One partner database** (Firestore) shared by every activity — upload your list once, add more anytime.
- **Staff create an event** (activity + date) in `admin.html` → get a QR code / link instantly.
- **Partners scan the QR**, type their phone number, their info auto-fills from the database (still editable), they pick **Participant** or **Facilitator**, confirm, and get their participant number.
- **Staff export** the event's attendance straight to an Excel file with the exact same columns as your `Talam.xlsx` PAR template — ready to upload, no retyping.

Two pages, one shared database:
- `admin.html` — staff use: manage partners, create events, watch live check-ins, export.
- `checkin.html` — partner use: opened by scanning an event's QR code.

---

## 1. Set up Firebase (one-time, ~10 minutes)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** (free "Spark" plan is enough).
2. Once created, click the **`</>`** (web) icon to register a web app. Give it any nickname (e.g. "PAR Attendance"). You don't need Firebase Hosting — you'll use GitHub Pages.
3. Firebase shows you a `firebaseConfig` object. Copy those values into **`firebase-config.js`** in this folder, replacing the `PASTE_YOUR_...` placeholders.
4. In the left menu, go to **Build → Firestore Database → Create database**. Choose **Production mode**, pick a region close to Cambodia (e.g. `asia-southeast1`).
5. Go to the **Rules** tab and paste this to start:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /partners/{phone} {
      allow read, write: if true;
    }
    match /events/{eventId} {
      allow read, write: if true;
      match /attendance/{phone} {
        allow read, write: if true;
      }
    }
  }
}
```

**Important trade-off:** these rules are open — anyone who has your Firebase web config (visible in the page source, unavoidable for a login-free tool) could technically read or write the database. This matches how your other field tools currently work (no login) and is fine to start with. If you'd like real access control later (e.g. a staff PIN before `admin.html` can edit anything, so random visitors can only check in, not edit partners), I can add Firebase Authentication on top of this — just ask.

---

## 2. Host the files

Same pattern as your other tools:

1. Create a GitHub repo (e.g. `par-attendance`).
2. Upload all 4 files: `admin.html`, `checkin.html`, `firebase-config.js`, `shared.js`.
3. Settings → Pages → deploy from the `main` branch, root folder.
4. Your admin page will be at `https://<you>.github.io/par-attendance/admin.html`, and check-in links are generated automatically as `.../checkin.html?event=<id>`.

---

## 3. First-time use

1. Open `admin.html`. Type your name in the "Staff" box top-right (remembered on this device).
2. **Partners tab → Import partner master list** → upload `Talam.xlsx` (or any file with the same columns). This seeds the shared database, matched by phone number. Re-upload anytime to add more partners — existing ones are updated, not duplicated.
3. **Events tab → Create a new event**: type the activity name and date → **Create event & generate QR**. A QR code and link appear immediately.
4. Print or display the QR at the meeting. Partners scan it, enter their phone number, check their auto-filled details, choose Participant/Facilitator, and confirm.
5. Back in `admin.html → Events → Open`, you'll see check-ins arrive live, editable inline if something needs correcting.
6. Click **Export PAR Excel** to download a `.xlsx` file with the same columns, order, and header text as your PAR template — upload it directly.

---

## Notes

- **New partners**: if a phone number isn't in the database yet, the check-in page lets that person fill in their own details on the spot — it registers them both for this event and into the shared partner database, so they auto-fill at every future activity too.
- **Same partner, different roles**: Participant vs Facilitator is chosen fresh at every event, not stored on the partner profile, since the same person might be a Facilitator one day and a Participant another.
- **Multiple staff, same day, different activities**: each event has its own QR/link, so staff never collide — no more separate Sheets per activity.
- **Offline**: this version needs an internet connection (Firestore is cloud-based) — like your RC Location Map PWA, true offline caching could be added later if needed.
