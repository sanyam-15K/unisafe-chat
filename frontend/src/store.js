import { useEffect, useState } from "react";
import { initialDb } from "./data.js";

const DB = "unisafe-db-v2", SESSION = "unisafe-session-v1";
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } };

// Prototype storage lives in this browser only. The backend will replace this later.
export function useStore() {
  const [db, setDb] = useState(() => load(DB, initialDb));
  const [session, setSession] = useState(() => load(SESSION, null));
  useEffect(() => save(DB, db), [db]);
  useEffect(() => save(SESSION, session), [session]);
  return { db, setDb, session, setSession };
}
