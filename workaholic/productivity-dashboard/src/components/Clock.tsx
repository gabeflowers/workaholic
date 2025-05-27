import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time
      className="select-none font-mono text-6xl tracking-widest"
      dateTime={now.toISOString()}
    >
      {now.toLocaleTimeString("pt-BR", { hour12: false })}
    </time>
  );
}
