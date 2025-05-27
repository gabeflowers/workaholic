import { useNotes } from "@/store/useNotes";
import { useState } from "react";

const COLORS = ["yellow-100", "pink-100", "sky-100"];

export default function NoteWall() {
  const { notes, add, update, remove } = useNotes();
  const [draft, setDraft] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  return (
    <section className="flex h-full flex-col gap-2 overflow-y-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.trim()) return;
          add(draft.trim(), color);
          setDraft("");
        }}
        className="flex gap-2"
      >
        <input
          className="flex-1 rounded border p-1 text-sm"
          placeholder="Nota rápida..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="rounded border p-1 text-sm"
        >
          {COLORS.map((c) => (
            <option key={c} value={c}>
              {c.split("-")[0]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded bg-emerald-600 px-3 py-1 text-sm text-white"
        >
          +
        </button>
      </form>

      {notes.map((note) => (
        <textarea
          key={note.id}
          defaultValue={note.body}
          onBlur={(e) => update(note.id, e.target.value)}
          className={`mb-2 w-full resize-none rounded p-2 text-sm shadow-inner outline-none focus:ring ${
            note.color ? `bg-${note.color}` : "bg-yellow-100"
          }`}
          rows={4}
        />
      ))}

      {notes.length > 0 && (
        <button
          onClick={() =>
            notes.forEach((n) => {
              if (!n.body.trim()) remove(n.id);
            })
          }
          className="self-end text-xs text-gray-400 hover:text-red-500"
          title="Remove empty notes"
        >
          Limpar vazias
        </button>
      )}
    </section>
  );
}
