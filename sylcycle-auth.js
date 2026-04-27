/* ═══════════════════════════════════════════════════════════════
   sylcycle-auth.js  —  Shared auth & cloud storage for SylCycle
   Drop this script (+ Firebase CDN tags) into any SylCycle app.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Firebase config — FILL THIS IN from your Firebase console ── */
  const FIREBASE_CONFIG = {
    apiKey:            'AIzaSyBu6LWb6NJv5mOlWA_rFSMVlSRUSM-pYas',
    authDomain:        'sylcycle-f9d02.firebaseapp.com',
    projectId:         'sylcycle-f9d02',
    storageBucket:     'sylcycle-f9d02.firebasestorage.app',
    messagingSenderId: '517184337498',
    appId:             '1:517184337498:web:3dd908147cdfc081554a63'
  };

  /* ── Which localStorage keys belong to which app ── */
  const APP_KEYS = {
    studio:   ['wg_v1_prefs', 'wg_v1_drafts', 'wg_v1_templates', 'cyclestudio_history_v1', 'cyclestudio_editor_accordions_v2'],
    assess:   ['ca_v2_data', 'ca_v2_settings'],
    planning: ['cycleplanner_refactor_prefs_v1', 'cycleplanner_refactor_current_v1', 'cycleplanner_refactor_history_v1', 'cycleplanner_refactor_templates_v1']
  };

  /* ── Detect current app from the URL ── */
  function detectApp() {
    const p = location.pathname.toLowerCase();
    if (p.includes('studio'))   return 'studio';
    if (p.includes('assess'))   return 'assess';
    if (p.includes('plann'))    return 'planning';
    return null;                // launcher page
  }

  /* ── Global SylCycle object ── */
  window.SylCycle = {
    user: null, uid: null, db: null,
    app: detectApp(),
    _readyCbs: [], _ready: false,

    /** Register a callback to run once auth + cloud sync are done. */
    onReady(fn) { this._ready ? fn() : this._readyCbs.push(fn); },
    _fireReady() {
      this._ready = true;
      this._readyCbs.forEach(fn => { try { fn(); } catch (e) { console.error(e); } });
      this._readyCbs = [];
    },

    /**
     * Save a localStorage key to Firestore (fire‑and‑forget).
     * Call this AFTER writing to localStorage so reads stay synchronous.
     *   SylCycle.cloudSave('wg_v1_prefs', prefsObject);
     */
    cloudSave(lsKey, value) {
      if (!this.uid || !this.db || !this.app) return;
      this.db.collection('users').doc(this.uid)
        .collection(this.app).doc(lsKey)
        .set({
          v: typeof value === 'string' ? value : JSON.stringify(value),
          ts: firebase.firestore.FieldValue.serverTimestamp()
        })
        .catch(err => console.warn('SylCycle cloud save failed:', err));
    },

    /**
     * Pull cloud data → localStorage for the current app.
     * If cloud is empty (first ever login), push local data UP instead.
     */
    async cloudSync() {
      if (!this.uid || !this.db || !this.app) return;
      const keys = APP_KEYS[this.app] || [];
      try {
        const snap = await this.db.collection('users').doc(this.uid)
          .collection(this.app).get();

        if (snap.empty) {
          /* First‑time migration: upload whatever is in localStorage */
          console.log('[SylCycle] No cloud data — uploading local data…');
          for (const k of keys) {
            const raw = localStorage.getItem(k);
            if (raw) this.cloudSave(k, raw);   // raw is already a string
          }
        } else {
          /* Cloud → localStorage */
          snap.forEach(doc => {
            const d = doc.data();
            if (d && d.v != null) localStorage.setItem(doc.id, d.v);
          });
        }
      } catch (err) {
        console.warn('[SylCycle] Cloud sync failed — using local data:', err);
      }
    },

    logout() {
      firebase.auth().signOut().then(() => { location.href = 'index.html'; });
    },

    /** Small floating pill showing logged‑in user + logout / home links */
    _injectPill() {
      if (!this.user || document.getElementById('sc-auth-pill')) return;
      const d = document.createElement('div');
      d.id = 'sc-auth-pill';
      d.style.cssText =
        'position:fixed;top:12px;right:16px;z-index:9999;display:flex;align-items:center;gap:8px;' +
        'padding:7px 14px;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);' +
        'border:1px solid #d8e5fb;border-radius:999px;font:600 12px/1 Inter,system-ui,sans-serif;' +
        'color:#12325f;box-shadow:0 4px 16px rgba(20,65,140,.1);';
      const name = this.user.displayName || this.user.email || 'User';
      d.innerHTML =
        '<span>' + name + '</span>' +
        '<button onclick="SylCycle.logout()" style="border:none;background:#edf4ff;color:#1959c8;font:700 11px Inter,system-ui,sans-serif;padding:5px 10px;border-radius:999px;cursor:pointer;">Log out</button>' +
        '<a href="index.html" style="text-decoration:none;background:#edf4ff;color:#1959c8;font:700 11px Inter,system-ui,sans-serif;padding:5px 10px;border-radius:999px;">Home</a>';
      document.body.appendChild(d);
    }
  };

  /* ── Boot ── */
  function boot() {
    if (typeof firebase === 'undefined' || FIREBASE_CONFIG.apiKey === 'PASTE_YOUR_API_KEY') {
      console.warn('[SylCycle] Firebase not configured — running in offline/local mode.');
      SylCycle._fireReady();
      return;
    }

    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    SylCycle.db = firebase.firestore();

    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        SylCycle.user = user;
        SylCycle.uid  = user.uid;
        await SylCycle.cloudSync();
        SylCycle._injectPill();
        SylCycle._fireReady();
      } else {
        /* Not on the launcher? Redirect to login. */
        const p = location.pathname;
        const isLauncher = p.endsWith('/') || p.endsWith('index.html');
        if (!isLauncher) { location.href = 'index.html'; return; }
        SylCycle._fireReady();
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
