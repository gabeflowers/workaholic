import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '../types';
import { SortableTaskCard } from './SortableTaskCard';

interface TaskColumnProps {
  title: string;
  status: 'todo' | 'progress' | 'done';
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

  const getColumnIcon = () => {
    switch (status) {
      case 'todo': return '📋';
      case 'progress': return '⚡';
      case 'done': return '✅';
      default: return '📋';
    }
  };

  const getEmptyIcon = () => {
    switch (status) {
      case 'todo': return '📝';
      case 'progress': return '🚀';
      case 'done': return '🎉';
      default: return '📝';
    }
  };

  const getEmptyTitle = () => {
    switch (status) {
      case 'todo': return 'Nenhuma tarefa pendente';
      case 'progress': return 'Nenhuma tarefa em progresso';
      case 'done': return 'Nenhuma tarefa concluída';
      default: return 'Nenhuma tarefa';
    }
  };

  const getEmptySubtitle = () => {
    switch (status) {
      case 'todo': return 'Adicione uma nova tarefa para começar';
      case 'progress': return 'Mova tarefas para cá quando começar a trabalhar nelas';
      case 'done': return 'Complete algumas tarefas para vê-las aqui';
      default: return '';
    }
  };

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h3 className="heading-secondary text-2xl">
            {getColumnIcon()} {title}
          </h3>
          <span className="text-base text-white/70 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
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
              <div className="text-5xl mb-4">
                {getEmptyIcon()}
              </div>
              <p className="text-xl mb-2">
                {getEmptyTitle()}
              </p>
              <p className="text-base opacity-75 text-center max-w-xs">
                {getEmptySubtitle()}
              </p>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
}; 