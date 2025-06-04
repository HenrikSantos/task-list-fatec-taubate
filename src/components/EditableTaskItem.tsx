import type { Task } from "../interfaces/checklist-interface";

interface EditableTaskItemProps {
  task: Task;
  onUpdateName: (newName: string) => void;
  onRemove: () => void;
}

function EditableTaskItem({ task, onUpdateName, onRemove }: EditableTaskItemProps) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={task.completed}
        disabled
        className="flex-shrink-0 opacity-50"
      />
      <input
        type="text"
        value={task.name}
        onChange={(e) => onUpdateName(e.target.value)}
        className="flex-1 border border-gray-300 rounded px-2 py-1"
        placeholder="Nome da tarefa"
      />
      <button
        onClick={onRemove}
        className="text-red-500 hover:text-red-700 font-bold text-lg px-2"
        title="Remover tarefa"
      >
        ×
      </button>
    </div>
  );
}

export default EditableTaskItem; 