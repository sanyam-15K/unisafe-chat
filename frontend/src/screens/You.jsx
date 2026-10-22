import { ShieldCheck, LogOut, RotateCcw, Flag } from "lucide-react";
import { users } from "../data.js";
import Avatar from "../components/Avatar.jsx";

export default function You({ user, db, actions, onLogout }) {
  const status = db.status[user.erp] || "active";
  const open = db.reports.filter((r) => r.status === "open");
  const who = (erp) => users.find((u) => u.erp === erp);

  return (
    <>
      <header className="top"><h1>You</h1><small>Signed in with your ERP number</small></header>
      <section className="panel">
        <article className="card row gap">
          <Avatar name={user.name} size={52} />
          <div><b>{user.name}</b><small className="block">{user.erp} · {user.role}</small><small className="block">{user.branch}</small></div>
        </article>
        {status !== "active" && <div className="warn">Your account status: {status}</div>}
        <div className="note">
          <b><ShieldCheck size={14} /> Verified account</b>
          <p>Your name and ERP number show on every comment you write. This keeps the campus safe and accountable.</p>
        </div>

        {user.role === "admin" && (
          <>
            <h3>Reported comments ({open.length})</h3>
            {open.length === 0 && <p className="empty">No open reports. Reported comments appear here.</p>}
            {open.map((r) => {
              const c = db.comments.find((x) => x.id === r.commentId);
              if (!c) return null;
              return (
                <article className="card" key={r.id}>
                  <div className="who"><Flag size={13} /><b>{c.name}</b><small>{c.erp}</small></div>
                  <p className="body">“{c.text}”</p>
                  <small>Reported by {who(r.by)?.name || r.by}</small>
                  <div className="acts">
                    <button onClick={() => actions.moderate(r.id, "warn")}>Warn</button>
                    <button onClick={() => actions.moderate(r.id, "mute")}>Mute</button>
                    <button className="danger" onClick={() => actions.moderate(r.id, "suspend")}>Suspend</button>
                    <button onClick={() => actions.moderate(r.id, "dismiss")}>Dismiss</button>
                  </div>
                </article>
              );
            })}
            <button className="btn full ghost" onClick={() => window.confirm("Reset all demo posts, comments and moderation?") && actions.reset()}><RotateCcw size={16} /> Reset demo data</button>
          </>
        )}
        <button className="btn full ghost" onClick={onLogout}><LogOut size={16} /> Log out</button>
      </section>
    </>
  );
}
