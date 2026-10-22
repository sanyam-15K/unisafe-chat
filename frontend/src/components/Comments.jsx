import { useState } from "react";
import { Flag, MessageSquare, VolumeX } from "lucide-react";
import Avatar from "./Avatar.jsx";

export default function Comments({ postId, user, db, actions }) {
  const [text, setText] = useState("");
  const list = db.comments.filter((c) => c.postId === postId);
  const status = db.status[user.erp] || "active";
  const send = () => { if (text.trim()) { actions.addComment(postId, text.trim()); setText(""); } };
  const reported = (id) => db.reports.some((r) => r.commentId === id && r.by === user.erp);

  return (
    <>
      <div className="row between"><h3>Class discussion</h3><small>{list.length} comments</small></div>
      {list.length === 0 && <p className="empty">No comments yet. Be the first.</p>}
      {list.map((c) => (
        <div className="comment" key={c.id}>
          <Avatar name={c.name} size={30} />
          <div className="grow">
            {/* Name and ERP are always visible: no anonymous comments */}
            <div className="who"><b>{c.name}</b><span className={"badge " + (c.role === "STUDENT" ? "stu" : "fac")}>{c.role}</span><small>{c.erp} · {c.time}</small></div>
            <p className="body">{c.text}</p>
            {c.reply && <small className="link">{c.reply}</small>}
            {c.erp !== user.erp && (reported(c.id)
              ? <small className="block">Reported. The admin will review it.</small>
              : <button className="rep" onClick={() => window.confirm("Report this comment to the admin?") && actions.report(c.id)}><Flag size={12} /> Report</button>)}
          </div>
        </div>
      ))}
      {status === "active" ? (
        <div className="composer">
          <MessageSquare size={18} />
          <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Add a comment…" aria-label="Add a comment" />
          <button className="btn sm" onClick={send}>Comment</button>
        </div>
      ) : (
        <div className="note"><b><VolumeX size={14} /> You are muted</b><p>The admin has paused your commenting. You can still read everything.</p></div>
      )}
    </>
  );
}
