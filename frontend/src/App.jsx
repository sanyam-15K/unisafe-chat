import { useState } from "react";
import { Home, CalendarDays, MessagesSquare, User } from "lucide-react";
import Feed from "./screens/Feed.jsx";
import Assignment from "./screens/Assignment.jsx";
import Events from "./screens/Events.jsx";
import Groups from "./screens/Groups.jsx";
import You from "./screens/You.jsx";
import { assignment, me } from "./data.js";

const TABS = [
  { id: "feed", label: "Feed", Icon: Home },
  { id: "events", label: "Events", Icon: CalendarDays },
  { id: "groups", label: "Groups", Icon: MessagesSquare, dot: true },
  { id: "you", label: "You", Icon: User },
];

export default function App() {
  const [tab, setTab] = useState("feed");
  const [openAssignment, setOpenAssignment] = useState(false);
  const [comments, setComments] = useState(assignment.comments);

  // Students can comment (with name + ERP). Only faculty can post.
  const addComment = (text) =>
    setComments((c) => [...c, { id: Date.now(), name: me.name, erp: me.erp, role: "STUDENT", time: "now", text }]);

  const go = (id) => { setOpenAssignment(false); setTab(id); };

  return (
    <div className="phone">
      <main className="screen">
        {openAssignment ? (
          <Assignment comments={comments} onAdd={addComment} onBack={() => setOpenAssignment(false)} />
        ) : tab === "feed" ? (
          <Feed commentCount={comments.length} onOpenAssignment={() => setOpenAssignment(true)} />
        ) : tab === "events" ? <Events />
        : tab === "groups" ? <Groups />
        : <You />}
      </main>
      <nav className="tabbar" aria-label="Main">
        {TABS.map(({ id, label, Icon, dot }) => (
          <button key={id} className={"tab" + (tab === id ? " on" : "")} onClick={() => go(id)} aria-current={tab === id}>
            <span className="tab-ico"><Icon size={20} />{dot && <i className="pip" />}</span>
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
