/* ============================================================
   FIREBASE CONFIG — EDIT THIS FILE ONLY
   Paste your Firebase project's config below (see README.md
   "Setup" section for how to get these values). Both
   admin.html and checkin.html load this same file, so you
   only need to set it up once.
   ============================================================ */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDBgw7w2N1cXo61kcttb6IdpPr0_qcSSa0",
  authDomain: "par-attendance.firebaseapp.com",
  projectId: "par-attendance",
  storageBucket: "par-attendance.firebasestorage.app",
  messagingSenderId: "380205444705",
  appId: "1:380205444705:web:b812ea83342d7f21890420"
};

/* ============================================================
   STAFF LIST
   Used to populate the staff dropdown and to group events by
   staff (then by month) in the Events tab.
   ============================================================ */
const STAFF_LIST = [
  "Phorn Sokchea",
  "Leak Lida",
  "Hien Piphup",
  "Soy Bunthoeurt",
  "Sim Sokveng",
  "Leap Sophy",
  "Di Dinna",
  "Heang Muoyly",
  "Nguon Phani"
];

/* ============================================================
   PAR EXPORT COLUMNS
   Exact column order/labels written to the exported .xlsx.
   Deliberately excludes Wing ID / Wing Name — those live in the
   partner profile for reference but are NOT part of the real
   PAR upload template.
   ============================================================ */
const PAR_EXPORT_COLUMNS = [
  { key: "no",       label: "No" },
  { key: "name",     label: "Name" },
  { key: "sex",      label: "Sex" },
  { key: "age",      label: "age" },
  { key: "role",     label: "role" },
  { key: "title",    label: "Title" },
  { key: "village",  label: "village" },
  { key: "commune",  label: "commune" },
  { key: "wing",     label: "Wing" },
  { key: "tele",     label: "Tele" },
  { key: "rc",       label: "RC" },
  { key: "disabled", label: "Disabled" },
  { key: "mvc",      label: "MVC" },
  { key: "other",    label: "other" },
  { key: "remark",   label: "remark" }
];

// Partner master-list fields (kept broader than the export — wingId/wingName
// still stored on the partner profile for reference, just not exported).
const PARTNER_FIELDS = ["name","sex","age","role","village","commune","wing",
  "tele","rc","disabled","mvc","other","remark","wingId","wingName",
  "hasWing","authName","authWing"];
