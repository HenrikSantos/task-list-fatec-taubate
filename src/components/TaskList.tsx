import type { Task } from "../interfaces/checklist-interface";
import TaskItem from "./TaskItem";
import EditableTaskItem from "./EditableTaskItem";

interface TaskListProps {
  tasks: Task[];
  isEditing: boolean;
  onToggleTaskComplete: (taskId: number) => void;
  onUpdateTaskName?: (taskId: number, newName: string) => void;
  onRemoveTask?: (taskId: number) => void;
  onAddNewTask?: () => void;
}

function TaskList({ 
  tasks, 
  isEditing, 
  onToggleTaskComplete, 
  onUpdateTaskName, 
  onRemoveTask, 
  onAddNewTask 
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="space-y-3">
        <p className="text-gray-400 italic text-center py-4">
          Nenhuma tarefa adicionada
        </p>
        {isEditing && onAddNewTask && (
          <button
            onClick={onAddNewTask}
            className="w-full py-2 px-4 border-2 border-dashed border-gray-300 text-gray-500 rounded hover:border-blue-400 hover:text-blue-500 flex items-center justify-center text-sm font-medium"
          >
            + Adicionar Tarefa
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {isEditing ? (
        <>
          {tasks.map((task) => (
            <EditableTaskItem
              key={task.id}
              task={task}
              onUpdateName={(newName) => onUpdateTaskName?.(task.id, newName)}
              onRemove={() => onRemoveTask?.(task.id)}
            />
          ))}
          {onAddNewTask && (
            <button
              onClick={onAddNewTask}
              className="w-full py-2 px-4 border-2 border-dashed border-gray-300 text-gray-500 rounded hover:border-blue-400 hover:text-blue-500 flex items-center justify-center text-sm font-medium"
            >
              + Adicionar Tarefa
            </button>
          )}
        </>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={() => onToggleTaskComplete(task.id)}
          />
        ))
      )}
    </div>
  );
}

export default TaskList; 