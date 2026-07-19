/* Shared helpers for the PAR Attendance System */

// Normalize a phone number to a stable Firestore doc key:
// strips spaces/dashes, keeps leading zero as typed.
function normalizePhone(raw) {
  return String(raw || "").trim().replace(/[\s\-]/g, "");
}

// Firebase init (compat SDK, loaded via <script> tags before this file)
let _fbApp, _db;
function initFirebase() {
  if (!_fbApp) {
    _fbApp = firebase.initializeApp(FIREBASE_CONFIG);
    _db = firebase.firestore();
  }
  return _db;
}

// Simple toast notification
function toast(msg, type = "info") {
  let el = document.getElementById("__toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "__toast";
    el.style.cssText = `
      position:fixed;left:50%;bottom:24px;transform:translateX(-50%);
      z-index:9999;padding:12px 20px;border-radius:10px;font-size:14px;
      font-family:inherit;color:#fff;box-shadow:0 6px 20px rgba(0,0,0,.2);
      max-width:90vw;text-align:center;transition:opacity .3s;`;
    document.body.appendChild(el);
  }
  const colors = { info: "#1CABE2", success: "#2E9E4C", error: "#D0393B" };
  el.style.background = colors[type] || colors.info;
  el.textContent = msg;
  el.style.opacity = "1";
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.opacity = "0"; }, 2800);
}

// Build a blank partner record shell
function blankPartner() {
  const p = {};
  PARTNER_FIELDS.forEach(k => p[k] = "");
  return p;
}

// Normalize sex values to English, whatever form they arrive in
// (handles Khmer from legacy imports, and already-English values).
function normalizeSex(v) {
  const s = String(v || "").trim();
  if (s === "ស្រី" || /^f(emale)?$/i.test(s)) return "Female";
  if (s === "ប្រុស" || /^m(ale)?$/i.test(s)) return "Male";
  return s;
}
