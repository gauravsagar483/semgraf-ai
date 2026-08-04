import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to hash targets — React Router Link to="/#id" does not scroll by default. */
export default function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = decodeURIComponent(hash.replace("#", ""));
    const go = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    if (go()) return;

    // Landing sections may mount a tick later after route change
    const t = window.setTimeout(go, 50);
    return () => window.clearTimeout(t);
  }, [pathname, hash, key]);

  return null;
}
