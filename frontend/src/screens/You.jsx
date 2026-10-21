import { ShieldCheck, LogOut } from "lucide-react";
import { me, APP } from "../data.js";
import { Avatar } from "./Feed.jsx";

export default function You() {
  return (
    <>
      <header className="top"><h1>You</h1><small>{APP.institute}</small></header>
      <section className="panel">
        <article className="card row gap">
          <Avatar name={me.name} size={52} />
          <div><b>{me.name}</b><small className="block">{me.erp}</small><small className="block">{me.branch}</small></div>
        </article>
        <div className="note">
          <b><ShieldCheck size={14} /> Verified student</b>
          <p>Your name and ERP number show on every comment you write. This keeps the campus safe and accountable.</p>
        </div>
        <button className="btn full ghost"><LogOut size={16} /> Log out</button>
      </section>
    </>
  );
}
