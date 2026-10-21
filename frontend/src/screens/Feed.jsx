import { useState } from "react";
import { Bell, ChevronDown, ShieldCheck, Landmark, Sparkles, MessageCircle, ClipboardList, Clock, ArrowUpRight, Pin } from "lucide-react";
import { APP, me, posts } from "../data.js";

export const Avatar = ({ name, size = 40 }) => (
  <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.38 }}>
    {name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
  </span>
);

const FILTERS = [["foryou", "For you"], ["official", "Official"], ["course", "My courses"]];

export default function Feed({ onOpenAssignment, commentCount }) {
  const [filter, setFilter] = useState("foryou");
  const list = posts.filter((p) => filter === "foryou" || p.kind === filter);

  return (
    <>
      <header className="top">
        <div className="brand">
          <span className="logo"><ShieldCheck size={22} /></span>
          <div><h1>{APP.name}</h1><small>{APP.institute}</small></div>
          <button className="icon-btn bell" aria-label="Notifications"><Bell size={20} /><i className="pip" /></button>
          <Avatar name={me.name} size={34} />
        </div>
        <div className="row between">
          <button className="plain">{APP.campus} <ChevronDown size={14} /></button>
          <span className="chip-static">{me.branch}</span>
        </div>
        <div className="seg">
          {FILTERS.map(([id, label]) => (
            <button key={id} className={filter === id ? "on" : ""} onClick={() => setFilter(id)}>{label}</button>
          ))}
        </div>
      </header>

      <section className="stack">
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
                <div className="hero">
                  <span className="date-tile"><small>{p.month}</small><b>{p.day}</b></span>
                </div>
                <p className="body">{p.event}</p>
              </>
            )}

            <div className="row between foot">
              {p.comments ? <span className="muted"><MessageCircle size={14} /> {p.assignment ? commentCount : p.comments} comments</span> : <a className="link" href="#" onClick={(e) => e.preventDefault()}>{p.link} →</a>}
              {p.seen ? <small>{p.seen}</small> : p.note ? <small>{p.note}</small> : null}
              {p.link && p.comments && <a className="link" href="#" onClick={(e) => e.preventDefault()}>{p.link} →</a>}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
