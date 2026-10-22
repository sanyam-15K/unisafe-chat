import { ArrowLeft, MoreHorizontal, Clock, FileText, Database, Download } from "lucide-react";
import { assignment as a } from "../data.js";
import Avatar from "../components/Avatar.jsx";
import Comments from "../components/Comments.jsx";

export default function Assignment({ user, db, actions, onBack }) {
  return (
    <>
      <header className="top plain-top">
        <div className="row gap">
          <button className="icon-btn" onClick={onBack} aria-label="Back"><ArrowLeft size={20} /></button>
          <div><h1>Assignment</h1><small>{a.course}</small></div>
        </div>
        <small className="eyebrow">Assignment {a.number}</small>
        <h2 className="big">{a.title}</h2>
        <div className="row gap">
          <Avatar name={a.teacher} />
          <div className="grow">
            <div className="who"><b>{a.teacher}</b><span className="badge fac">FACULTY</span></div>
            <small>CS 204 · Faculty admin · {a.sections}</small>
          </div>
          <MoreHorizontal size={18} />
        </div>
        <div className="due-banner">
          <Clock size={22} />
          <div className="grow"><b>{a.dueShort}</b><small>11:59 PM · {a.daysLeft}</small></div>
          <div className="pts"><b>{a.points}</b><small>POINTS</small></div>
        </div>
      </header>
      <section className="panel">
        <h3>{a.intro}</h3>
        <p className="muted">{a.summary}</p>
        <ol className="tasks">{a.tasks.map((t, i) => <li key={i}><span>{String(i + 1).padStart(2, "0")}</span>{t}</li>)}</ol>
        <div className="row between"><h3>Everything you need</h3><small>{a.files.length} files</small></div>
        {a.files.map((f, i) => (
          <div className="file" key={f.name}>
            <span className="file-ico">{i === 0 ? <FileText size={18} /> : <Database size={18} />}</span>
            <div className="grow"><b>{f.name}</b><small>{f.meta}</small></div>
            <Download size={18} />
          </div>
        ))}
        <Comments postId={2} user={user} db={db} actions={actions} />
      </section>
    </>
  );
}
