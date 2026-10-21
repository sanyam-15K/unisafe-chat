// Mock data. Later, replace each export with a call to the backend API.
export const APP = { name: "UniSafe Chat", institute: "Dev Bhoomi University, Uttarakhand", campus: "Main campus" };

export const me = { name: "Arjun Shah", erp: "ERP-2024-0192", role: "student", branch: "CSE · Year 2" };

export const assignment = {
  id: "a04", number: "04", title: "SQL joins & subqueries", course: "CS 204 · Database Management",
  teacher: "Dr. Maya Rao", sections: "Sections A & B", due: "Tomorrow, Oct 20 · 11:59 PM", dueShort: "Due tomorrow · Oct 20",
  daysLeft: "1 day left", points: 20, intro: "Turn data into answers.",
  summary: "Apply what we explored in class to a real-world library database. Work individually.",
  tasks: [
    "Write INNER, LEFT and RIGHT JOIN queries for the campus library dataset.",
    "Use subqueries to find the most-borrowed books in each department.",
    "Document your query results with a short explanation.",
  ],
  files: [
    { name: "Assignment_04_Brief.pdf", meta: "PDF document · 248 KB" },
    { name: "Library_Dataset.sql", meta: "SQL dataset · 32 KB" },
  ],
  comments: [
    { id: 1, name: "Arjun Shah", erp: "ERP-2024-0192", role: "STUDENT", time: "12m",
      text: "Should we include query outputs in the PDF?", reply: "1 reply from Dr. Maya Rao" },
  ],
};

export const posts = [
  { id: 1, kind: "official", pinned: true, author: "Office of the Registrar", badge: "OFFICIAL", audience: "All students", time: "1 hour ago",
    title: "Next semester starts with your choices.",
    body: "Course registration opens Oct 22 at 9 AM. Review your electives on the student portal.",
    link: "Read official update", seen: "Seen by 2.4k" },
  { id: 2, kind: "course", author: "Dr. Maya Rao", badge: "FACULTY", audience: "CS 204 · CSE, Year 2", time: "24 min ago",
    body: "Let's put those SQL skills to work. Your next assignment is live!", assignment: true, comments: 8 },
  { id: 3, kind: "official", author: "Student Affairs", badge: "OFFICIAL", audience: "All campus", time: "2 hours ago",
    title: "Big ideas. Real campus energy.", event: "Innovate '26 · Central Quad · 10 AM–5 PM", month: "OCT", day: "23",
    note: "Open to all students", link: "Explore event", comments: 12 },
];

export const week = [
  { d: "M", n: 19 }, { d: "T", n: 20 }, { d: "W", n: 21, dot: true }, { d: "T", n: 22 },
  { d: "F", n: 23, dot: true }, { d: "S", n: 24, dot: true }, { d: "S", n: 25 },
];

export const events = [
  { id: 1, day: 23, cat: "Culture", highlight: true, org: "Student Affairs", title: "Innovate '26",
    desc: "Big ideas, bold prototypes, and the people building what's next. Come find your spark.",
    time: "10 AM–5 PM", place: "Central Quad", going: "+126", note: "Open to all students · Free" },
  { id: 2, day: 23, cat: "Tech", label: "WORKSHOP", title: "Design your first startup", time: "2–4 PM", place: "Innovation Lab" },
  { id: 3, day: 23, cat: "Culture", label: "CULTURE", title: "Cinema under the stars", time: "7–9 PM", place: "East Lawn" },
];

export const groups = [
  { id: 1, type: "official", name: "Registrar's office", sub: "University channel · All students",
    last: "Course registration opens Oct 22.", time: "9:30", unread: 1, badge: "OFFICIAL" },
  { id: 2, type: "course", name: "CS 204 · Database Mgmt", sub: "Course group · Dr. Maya Rao · 64 members",
    last: "Dr. Maya Rao: Add query outputs with a short explanation.", time: "9:24", unread: 3, comments: 18, badge: "FACULTY ADMIN", enrolled: true },
  { id: 3, type: "course", name: "CS 201 · Data Structures", sub: "Course group · Prof. A. Sen · 64 members",
    last: "Prof. A. Sen: Slides from today are up. Review the heap examples before lab.", time: "Yesterday", unread: 1, comments: 9, badge: "FACULTY ADMIN", enrolled: true },
];
