import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Task } from '../types';
import { TaskColumn } from './TaskColumn';
import { TaskCard } from './TaskCard';
import { useAppStore } from '../stores/useAppStore';

export const KanbanBoard: React.FC = () => {
  const { tasks, updateTask, deleteTask, moveTask } = useAppStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const doneTasks = tasks.filter(task => task.status === 'done');

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    if (!activeTask) return;

    // Se foi solto em uma coluna diferente
    if (over.id === 'todo' || over.id === 'done') {
      if (activeTask.status !== over.id) {
        moveTask(activeTask.id, over.id as 'todo' | 'done');
      }
    }
  };

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📋</span>
          <div>
            <h2 className="heading-secondary text-2xl mb-1">Kanban Board</h2>
            <p className="text-white/70 text-sm">
              {tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'} • {todoTasks.length} pendente{todoTasks.length !== 1 ? 's' : ''} • {doneTasks.length} concluída{doneTasks.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
      
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 h-[calc(100%-120px)]">
          <TaskColumn
            title="A Fazer"
            status="todo"
            tasks={todoTasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
          <TaskColumn
            title="Concluído"
            status="done"
            tasks={doneTasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="task-card p-4 opacity-90 rotate-3 scale-105">
              <TaskCard
                task={activeTask}
                onUpdate={() => {}}
                onDelete={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}; 