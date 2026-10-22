export default function Avatar({ name, size = 40 }) {
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.38 }}>
      {name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
    </span>
  );
}
