import type { Task } from "../interfaces/checklist-interface";

interface TaskItemProps {
  task: Task;
  onToggleComplete: () => void;
}

function TaskItem({ task, onToggleComplete }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        onChange={onToggleComplete}
        type="checkbox"
        checked={task.completed}
        className="flex-shrink-0"
      />
      <p
        className={`flex-1 transition-all duration-200 ${
          task.completed
            ? "line-through text-gray-400"
            : "text-gray-700"
        }`}
      >
        {task.name}
      </p>
      {task.completed && (
        <span className="text-gray-500 text-sm">✓</span>
      )}
    </div>
  );
}

export default TaskItem; 