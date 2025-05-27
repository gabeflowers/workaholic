import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '../types';
import { SortableTaskCard } from './SortableTaskCard';

interface TaskColumnProps {
  title: string;
  status: 'todo' | 'done';
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  status,
  tasks = [],
  onUpdateTask,
  onDeleteTask,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const taskIds = tasks?.map(task => task.id) || [];

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h3 className="heading-secondary text-2xl">
            {status === 'todo' ? '📋' : '✅'} {title}
          </h3>
          <span className="text-sm text-white/70 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            {tasks.length}
          </span>
        </div>
      </div>
      
      <div
        ref={setNodeRef}
        className={`drop-zone min-h-[500px] glass-card-dark p-4 space-y-4 ${
          isOver ? 'drag-over' : ''
        }`}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div 
                key={task.id}
                className="slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <SortableTaskCard
                  task={task}
                  onUpdate={onUpdateTask}
                  onDelete={onDeleteTask}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-white/60">
              <div className="text-4xl mb-3">
                {status === 'todo' ? '📝' : '🎉'}
              </div>
              <p className="text-lg mb-1">
                {status === 'todo' ? 'Nenhuma tarefa pendente' : 'Nenhuma tarefa concluída'}
              </p>
              <p className="text-sm opacity-75">
                {status === 'todo' 
                  ? 'Adicione uma nova tarefa para começar' 
                  : 'Complete algumas tarefas para vê-las aqui'
                }
              </p>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
}; 