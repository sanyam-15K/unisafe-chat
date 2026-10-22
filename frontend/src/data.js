// Mock data. Later, replace each export with a call to the backend API.
export const APP = { name: "UniSafe Chat", institute: "Dev Bhoomi University, Uttarakhand", campus: "Main campus" };


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
  { id: 2, kind: "course", author: "Dr. Maya Rao", badge: "FACULTY", audience: "CS 204 · CSE, Year 2", time: "24 min ago",
    body: "Let's put those SQL skills to work. Your next assignment is live!", assignment: true },
  { id: 3, kind: "course", author: "Prof. A. Sen", badge: "FACULTY", audience: "CS 201 · CSE, Year 2", time: "1 hour ago",
    body: "Slides from today's class are up. Please review the heap examples before tomorrow's lab." },
  { id: 4, kind: "course", author: "Dr. Neha Joshi", badge: "FACULTY", audience: "CSE · Year 2 · All sections", time: "3 hours ago",
    title: "Mid-term revision class", body: "Saturday, 10 AM, Room 204. Bring your doubts from Units 1 to 3." },
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

// Demo accounts: login is ERP number + date of birth as DDMMYY. Replace with real data later.
export const users = [
  { erp: "26BTBIO001", dob: "150805", name: "Siddharth ", role: "student", branch: "BIOTECHNOLOGY· Year 1" },
  { erp: "26BTBIO002", dob: "220306", name: "Aryaman ", role: "student", branch: "BIOTECHNOLOGY· Year 1" },
  { erp: "26BTBIO003", dob: "010206", name: "Vansh", role: "student", branch: "BIOTECHNOLOGY· Year 1" },
  { erp: "26BTBIO004", dob: "301105", name: "Sanyam", role: "student", branch: "BIOTECHNOLOGY· Year 1" },
  { erp: "FAC001", dob: "100680", name: "Dr. Maya Rao", role: "faculty", branch: "BIOTECHNOLOGY" },
  { erp: "FAC002", dob: "050575", name: "Prof. A. Sen", role: "faculty", branch: "BIOTECHNOLOGY" },
  { erp: "FAC003", dob: "140982", name: "Dr. Neha Joshi", role: "faculty", branch: "BIOTECHNOLOGY" },
  { erp: "ADM001", dob: "010180", name: "Campus Admin", role: "admin", branch: "Administration" },
];

const S = (id, postId, erp, name, time, text) => ({ id, postId, erp, name, role: "STUDENT", time, text });
const F = (id, postId, erp, name, time, text) => ({ id, postId, erp, name, role: "FACULTY", time, text });

export const initialDb = {
  posts,
  comments: [
    S(1, 2, "26BTBIO001", "Siddharth ", "20m", "Should we include query outputs in the PDF?"),
    F(2, 2, "FAC001", "Dr. Maya Rao", "15m", "Yes, add a short explanation under each output."),
    S(3, 2, "26BTBIO002", "Aryaman ", "10m", "Is the dataset file the same one we used in class?"),
    S(4, 2, "26BTBIO003", "Vansh", "6m", "Can we use a subquery inside a JOIN for question 2?"),
    S(5, 3, "26BTBIO004", "Sanyam", "50m", "Will heap sort come in the lab test, sir?"),
    S(6, 3, "26BTBIO002", "Aryaman ", "40m", "Thank you sir, the slides are very clear."),
    S(7, 3, "26BTBIO001", "Siddharth ", "25m", "Could you also upload the lab manual?"),
    S(8, 4, "26BTBIO003", "Vansh", "2h", "Will the revision class be recorded?"),
    S(9, 4, "26BTBIO004", "Sanyam", "1h", "Can we ask doubts from Unit 3 first?"),
  ],
  reports: [], status: {}, warnings: {},
};
