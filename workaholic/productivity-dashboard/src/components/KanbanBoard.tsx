import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
  } from "@dnd-kit/core";
  import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
  } from "@dnd-kit/sortable";
  import { useTasks } from "@/store/useTasks";
  import TaskCard from "./TaskCard";
  import { useState } from "react";
  
  export default function KanbanBoard() {
    const { tasks, add } = useTasks();
    const [input, setInput] = useState("");
  
    const todo = tasks.filter((t) => !t.done);
    const done = tasks.filter((t) => t.done);
  
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor)
    );
  
    return (
      <section className="flex h-full flex-col gap-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            add(input.trim());
            setInput("");
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nova tarefa..."
            className="flex-1 rounded border p-1 text-sm"
          />
          <button
            type="submit"
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
          >
            +
          </button>
        </form>
  
        <div className="grid flex-1 grid-cols-2 gap-4 overflow-y-auto">
          {[
            { title: "Todo", items: todo },
            { title: "Done", items: done }
          ].map((col) => (
            <div
              key={col.title}
              className="flex flex-col rounded-xl bg-gray-100 p-3"
            >
              <h2 className="mb-2 font-semibold">{col.title}</h2>
  
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(event) => {
                  const { active, over } = event;
                  if (!over || active.id === over.id) return;
  
                  // Rearranjar apenas dentro da coluna atual
                  useTasks.setState((state) => {
                    const list = col.items;
                    const oldIdx = list.findIndex((t) => t.id === active.id);
                    const newIdx = list.findIndex((t) => t.id === over.id);
                    return {
                      tasks: arrayMove(list, oldIdx, newIdx).concat(
                        state.tasks.filter((t) => t.done !== list[0]?.done)
                      )
                    };
                  });
                }}
              >
                <SortableContext
                  items={col.items}
                  strategy={verticalListSortingStrategy}
                >
                  {col.items.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          ))}
        </div>
      </section>
    );
  }
  