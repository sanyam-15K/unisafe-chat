import { ArrowLeft } from "lucide-react";
import Comments from "../components/Comments.jsx";

export default function Thread({ post, user, db, actions, onBack }) {
  if (!post) return null;
  return (
    <>
      <header className="top plain-top">
        <div className="row gap">
          <button className="icon-btn" onClick={onBack} aria-label="Back"><ArrowLeft size={20} /></button>
          <div><h1>Discussion</h1><small>{post.audience}</small></div>
        </div>
      </header>
      <section className="panel">
        <article className="card">
          <div className="who"><b>{post.author}</b><span className={"badge " + (post.badge === "FACULTY" ? "fac" : "off")}>{post.badge}</span></div>
          {post.title && <h2>{post.title}</h2>}
          <p className="body">{post.body || post.event}</p>
        </article>
        <Comments postId={post.id} user={user} db={db} actions={actions} />
      </section>
    </>
  );
}
