import { useState } from "react";
import { Search, Landmark, Database, Code2, ShieldCheck } from "lucide-react";
import { groups } from "../data.js";

const FILTERS = ["Enrolled", "Official", "Unread"];
const ICON = { 1: Landmark, 2: Database, 3: Code2 };

export default function Groups() {
  const [filter, setFilter] = useState("Enrolled");
  const [q, setQ] = useState("");

  const list = groups.filter((g) => {
    const f = filter === "Enrolled" ? g.enrolled : filter === "Official" ? g.type === "official" : g.unread > 0;
    return f && (g.name + g.last).toLowerCase().includes(q.toLowerCase());
  });
  const count = (f) => groups.filter((g) => (f === "Enrolled" ? g.enrolled : f === "Official" ? g.type === "official" : g.unread > 0)).length;

  return (
    <>
      <header className="top">
        <h1>Groups</h1>
        <small>Course groups assigned automatically from your enrollment.</small>
        <label className="search"><Search size={16} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search enrolled courses & faculty posts" /></label>
        <div className="chips">
          {FILTERS.map((f) => <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>{f} <span className="n">{count(f)}</span></button>)}
        </div>
      </header>

      <section className="panel">
        {list.length === 0 && <p className="empty">No groups here yet. Your course groups appear after enrollment.</p>}
        {list.map((g) => {
          const I = ICON[g.id];
          return (
            <article className="group" key={g.id}>
              <span className="org-ico"><I size={20} /></span>
              <div className="grow">
                <div className="row between"><b>{g.name}</b><small>{g.time}</small></div>
                <span className={"badge " + (g.badge === "OFFICIAL" ? "off" : "fac")}>{g.badge}</span>
                <small className="block">{g.sub}</small>
                <p className="body">{g.last}</p>
                {g.comments && <small>{g.comments} comments · <span className="link">{g.unread} unread</span></small>}
              </div>
              {g.unread > 0 && <span className="unread">{g.unread}</span>}
            </article>
          );
        })}
        <div className="note">
          <b><ShieldCheck size={14} /> Automatic assignment</b>
          <p>Your enrolled course groups are assigned automatically at login. No invitations or manual joining needed.</p>
          <p>Only faculty admins publish posts. Students can read and comment.</p>
        </div>
      </section>
    </>
  );
}
