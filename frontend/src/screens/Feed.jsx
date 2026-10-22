import { useState } from "react";
import { Bell, ChevronDown, ShieldCheck, Landmark, Sparkles, MessageCircle, ClipboardList, Clock, ArrowUpRight, Pin, AlertTriangle } from "lucide-react";
import { APP } from "../data.js";
import Avatar from "../components/Avatar.jsx";

const FILTERS = [["foryou", "For you"], ["official", "Official"], ["course", "My courses"]];

export default function Feed({ user, db, actions, onOpenAssignment, onOpenThread }) {
  const [filter, setFilter] = useState("foryou");
  const [draft, setDraft] = useState("");
  const staff = user.role !== "student";
  const list = db.posts.filter((p) => filter === "foryou" || p.kind === filter);
  const count = (id) => db.comments.filter((c) => c.postId === id).length;
  const warns = db.warnings[user.erp] || 0;
  const publish = () => { if (draft.trim()) { actions.addPost(draft.trim()); setDraft(""); } };

  return (
    <>
      <header className="top">
        <div className="brand">
          <span className="logo"><ShieldCheck size={22} /></span>
          <div><h1>{APP.name}</h1><small>{APP.institute}</small></div>
          <button className="icon-btn bell" aria-label="Notifications"><Bell size={20} /><i className="pip" /></button>
          <Avatar name={user.name} size={34} />
        </div>
        <div className="row between">
          <button className="plain">{APP.campus} <ChevronDown size={14} /></button>
          <span className="chip-static">{user.branch}</span>
        </div>
        <div className="seg">
          {FILTERS.map(([id, label]) => (
            <button key={id} className={filter === id ? "on" : ""} onClick={() => setFilter(id)}>{label}</button>
          ))}
        </div>
      </header>

      <section className="stack">
        {warns > 0 && <div className="warn"><AlertTriangle size={15} /> You have {warns} warning{warns > 1 ? "s" : ""} from the admin. Please follow the campus rules.</div>}
        {staff ? (
          <div className="card">
            <textarea className="ta" rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Share a notice with students…" aria-label="New post" />
            <div className="row between"><small>Posting as {user.name}</small><button className="btn sm" onClick={publish}>Post</button></div>
          </div>
        ) : (
          <div className="hint"><ShieldCheck size={14} /> Only faculty and admins can post. You can read and comment.</div>
        )}

        {list.length === 0 && <p className="empty">No posts here yet.</p>}
        {list.map((p) => (
          <article className="card" key={p.id}>
            {p.pinned && <div className="pin"><Pin size={11} /> Pinned · University update</div>}
            <div className="row gap">
              {p.kind === "official" ? <span className="org-ico">{p.pinned ? <Landmark size={20} /> : <Sparkles size={20} />}</span> : <Avatar name={p.author} />}
              <div className="grow">
                <div className="who"><b>{p.author}</b><span className={"badge " + (p.badge === "FACULTY" ? "fac" : "off")}>{p.badge}</span></div>
                <small>{p.audience} · {p.time}</small>
              </div>
            </div>
            {p.title && <h2>{p.title}</h2>}
            {p.body && <p className="body">{p.body}</p>}
            {p.assignment && (
              <button className="asg-card" onClick={onOpenAssignment}>
                <span className="row between"><span className="asg-tag"><ClipboardList size={14} /> Assignment 04</span><b>20 points</b></span>
                <strong>SQL joins & subqueries</strong>
                <span className="due"><Clock size={13} /> Tomorrow, Oct 20 · 11:59 PM</span>
                <span className="row between open">Open assignment <ArrowUpRight size={16} /></span>
              </button>
            )}
            {p.event && (
              <>
                <div className="hero"><span className="date-tile"><small>{p.month}</small><b>{p.day}</b></span></div>
                <p className="body">{p.event}</p>
              </>
            )}
            <div className="row between foot">
              <button className="muted" onClick={() => (p.assignment ? onOpenAssignment() : onOpenThread(p.id))}><MessageCircle size={14} /> {count(p.id)} comments</button>
              {p.seen ? <small>{p.seen}</small> : p.note ? <small>{p.note}</small> : null}
              {p.link && <a className="link" href="#" onClick={(e) => e.preventDefault()}>{p.link} →</a>}
            </div>
            {count(p.id) > 0 && (
              <div className="preview">
                {db.comments.filter((c) => c.postId === p.id).slice(-2).map((c) => (
                  <div className="pv" key={c.id}>
                    <Avatar name={c.name} size={26} />
                    <div><div className="who"><b>{c.name}</b><small>{c.erp}</small></div><p className="body">{c.text}</p></div>
                  </div>
                ))}
                {count(p.id) > 2 && <button className="link tl" onClick={() => (p.assignment ? onOpenAssignment() : onOpenThread(p.id))}>View all {count(p.id)} comments →</button>}
              </div>
            )}
          </article>
        ))}
      </section>
    </>
  );
}
