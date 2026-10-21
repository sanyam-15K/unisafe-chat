import { useState } from "react";
import { ChevronDown, Clock, MapPin, Lightbulb, Clapperboard } from "lucide-react";
import { week, events } from "../data.js";

const CATS = ["All events", "Tech", "Culture", "Sports"];

export default function Events() {
  const [day, setDay] = useState(23);
  const [cat, setCat] = useState("All events");
  const list = events.filter((e) => e.day === day && (cat === "All events" || e.cat === cat));
  const hi = list.find((e) => e.highlight);
  const rest = list.filter((e) => !e.highlight);

  return (
    <>
      <header className="top">
        <h1>Campus events</h1>
        <small>Find your people. Make a memory.</small>
        <div className="row between"><button className="plain">October 2026 <ChevronDown size={14} /></button><a className="link" href="#" onClick={(e) => e.preventDefault()}>Today</a></div>
        <div className="week">
          {week.map((w) => (
            <button key={w.n} className={day === w.n ? "on" : ""} onClick={() => setDay(w.n)} aria-pressed={day === w.n}>
              <small>{w.d}</small><b>{w.n}</b>{w.dot && <i className="dot" />}
            </button>
          ))}
        </div>
        <div className="chips">{CATS.map((c) => <button key={c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>{c}</button>)}</div>
      </header>

      <section className="panel">
        <div className="row between"><h3>Friday, October {day}</h3><small>{list.length} events</small></div>
        {list.length === 0 && <p className="empty">No events on this day. Check another date or category.</p>}
        {hi && (
          <article className="card flush">
            <div className="hero tall"><span className="tag-float">Campus highlight</span></div>
            <div className="pad">
              <small><b>{hi.org}</b> <span className="badge off">OFFICIAL</span></small>
              <h2>{hi.title}</h2>
              <p className="body">{hi.desc}</p>
              <div className="meta"><span><Clock size={13} /> {hi.time}</span><span><MapPin size={13} /> {hi.place}</span></div>
              <div className="row between"><span className="going">{hi.going}</span><small>{hi.note}</small></div>
              <button className="btn full">Read updates & comments</button>
            </div>
          </article>
        )}
        {rest.length > 0 && <h3>More on Friday</h3>}
        {rest.map((e) => (
          <article className="card row gap" key={e.id}>
            <span className={"ev-ico " + (e.cat === "Tech" ? "a" : "b")}>{e.cat === "Tech" ? <Lightbulb size={22} /> : <Clapperboard size={22} />}</span>
            <div><small className="eyebrow">{e.label}</small><h2 className="sm">{e.title}</h2><small>{e.time} · {e.place}</small></div>
          </article>
        ))}
      </section>
    </>
  );
}
