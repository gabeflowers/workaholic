import { Task, useTasks } from "@/store/useTasks";
import { CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const { toggle, remove } = useTasks();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`mb-2 cursor-grab select-none rounded-lg border p-2 text-sm shadow-sm ${
        task.done ? "bg-emerald-100 line-through opacity-60" : "bg-white"
      }`}
    >
      <div className="flex justify-between gap-2">
        <span onClick={() => toggle(task.id)}>{task.title}</span>
        <button
          onClick={() => remove(task.id)}
          className="text-xs text-gray-400 hover:text-red-500"
          title="Excluir"
        >
          ✕
        </button>
      </div>
      {task.desc && (
        <p className="mt-1 text-gray-500">
          {task.desc}
        </p>
      )}
    </div>
  );
}
