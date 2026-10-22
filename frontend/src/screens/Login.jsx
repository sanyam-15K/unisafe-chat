import { useState } from "react";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { APP, users } from "../data.js";

export default function Login({ onLogin, notice }) {
  const [erp, setErp] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(notice || "");
  const submit = (e) => { e.preventDefault(); setErr(onLogin(erp, pw)); };

  return (
    <div className="login">
      <span className="logo big-logo"><ShieldCheck size={30} /></span>
      <h1>{APP.name}</h1>
      <p className="c">{APP.institute}</p>
      <p className="c muted">Sign in with your ERP number and your date of birth as DDMMYY.</p>
      <form className="form" onSubmit={submit}>
        <label>ERP number<input value={erp} onChange={(e) => setErp(e.target.value)} autoComplete="username" placeholder="e.g. 2024CS001" /></label>
        <label>Password
          <span className="pw">
            <input type={show ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} inputMode="numeric" autoComplete="current-password" placeholder="DDMMYY" />
            <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </span>
        </label>
        {err && <p className="err" role="alert">{err}</p>}
        <button className="btn full" type="submit">Sign in</button>
      </form>
      <div className="demo">
        <small>Demo accounts (tap to fill)</small>
        {users.map((u) => (
          <button type="button" key={u.erp} onClick={() => { setErp(u.erp); setPw(u.dob); setErr(""); }}>
            <b>{u.name}</b><small>{u.role} · {u.erp} · {u.dob}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
