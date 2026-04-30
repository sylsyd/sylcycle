(function () {
  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn('Storage write failed:', err);
      return false;
    }
  }

  function removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.warn('Storage remove failed:', err);
      return false;
    }
  }

  window.SylCycleStorage = {
    readJson,
    writeJson,
    removeItem
  };
})();
