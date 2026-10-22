import { useState } from "react";
import { Home, CalendarDays, MessagesSquare, User } from "lucide-react";
import Feed from "./screens/Feed.jsx";
import Assignment from "./screens/Assignment.jsx";
import Thread from "./screens/Thread.jsx";
import Events from "./screens/Events.jsx";
import Groups from "./screens/Groups.jsx";
import You from "./screens/You.jsx";
import Login from "./screens/Login.jsx";
import { users, initialDb } from "./data.js";
import { useStore } from "./store.js";

const TABS = [
  { id: "feed", label: "Feed", Icon: Home },
  { id: "events", label: "Events", Icon: CalendarDays },
  { id: "groups", label: "Groups", Icon: MessagesSquare, dot: true },
  { id: "you", label: "You", Icon: User },
];

export default function App() {
  const { db, setDb, session, setSession } = useStore();
  const [tab, setTab] = useState("feed");
  const [view, setView] = useState(null); // { type: "assignment" } or { type: "thread", id }

  const user = users.find((u) => u.erp === session);
  const suspended = user && db.status[user.erp] === "suspended";

  const login = (erp, pw) => {
    const u = users.find((x) => x.erp.toLowerCase() === erp.trim().toLowerCase() && x.dob === pw.trim());
    if (!u) return "ERP number or password is incorrect.";
    if (db.status[u.erp] === "suspended") return "This account is suspended. Please contact the admin.";
    setSession(u.erp); setTab("feed"); setView(null);
    return "";
  };

  if (!user || suspended) {
    return (
      <div className="phone"><main className="screen">
        <Login onLogin={login} notice={suspended ? "This account is suspended. Please contact the admin." : ""} />
      </main></div>
    );
  }

  // Rules enforced here: only staff post; only active (not muted) users comment, always as themselves.
  const actions = {
    addPost: (text) => user.role !== "student" && setDb((d) => ({
      ...d,
      posts: [{ id: Date.now(), kind: user.role === "admin" ? "official" : "course", author: user.name,
        badge: user.role === "admin" ? "OFFICIAL" : "FACULTY", audience: user.role === "admin" ? "All students" : "CS 204 · CSE, Year 2",
        time: "just now", body: text }, ...d.posts],
    })),
    addComment: (postId, text) => setDb((d) => (d.status[user.erp] || "active") !== "active" ? d : ({
      ...d, comments: [...d.comments, { id: Date.now(), postId, erp: user.erp, name: user.name, role: user.role.toUpperCase(), time: "just now", text }],
    })),
    report: (commentId) => setDb((d) => d.reports.some((r) => r.commentId === commentId && r.by === user.erp) ? d : ({
      ...d, reports: [...d.reports, { id: Date.now(), commentId, by: user.erp, status: "open" }],
    })),
    moderate: (reportId, act) => user.role === "admin" && setDb((d) => {
      const r = d.reports.find((x) => x.id === reportId);
      const c = d.comments.find((x) => x.id === r.commentId);
      const next = { ...d, reports: d.reports.map((x) => (x.id === reportId ? { ...x, status: "resolved", action: act } : x)) };
      if (act === "warn") next.warnings = { ...d.warnings, [c.erp]: (d.warnings[c.erp] || 0) + 1 };
      if (act === "mute") next.status = { ...d.status, [c.erp]: "muted" };
      if (act === "suspend") next.status = { ...d.status, [c.erp]: "suspended" };
      return next;
    }),
    reset: () => setDb(initialDb),
  };
  const shared = { user, db, actions };
  const go = (id) => { setView(null); setTab(id); };

  return (
    <div className="phone">
      <main className="screen">
        {view?.type === "assignment" ? <Assignment {...shared} onBack={() => setView(null)} />
        : view?.type === "thread" ? <Thread {...shared} post={db.posts.find((p) => p.id === view.id)} onBack={() => setView(null)} />
        : tab === "feed" ? <Feed {...shared} onOpenAssignment={() => setView({ type: "assignment" })} onOpenThread={(id) => setView({ type: "thread", id })} />
        : tab === "events" ? <Events />
        : tab === "groups" ? <Groups />
        : <You {...shared} onLogout={() => { setSession(null); setView(null); }} />}
      </main>
      <nav className="tabbar" aria-label="Main">
        {TABS.map(({ id, label, Icon, dot }) => (
          <button key={id} className={"tab" + (tab === id && !view ? " on" : "")} onClick={() => go(id)}>
            <span className="tab-ico"><Icon size={20} />{dot && <i className="pip" />}</span>{label}
          </button>
        ))}
      </nav>
    </div>
  );
}
