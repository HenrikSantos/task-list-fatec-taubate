interface ChecklistHeaderProps {
  name: string;
  description: string;
  isEditing: boolean;
  onUpdateName?: (newName: string) => void;
  onUpdateDescription?: (newDescription: string) => void;
}

function ChecklistHeader({ 
  name, 
  description, 
  isEditing, 
  onUpdateName, 
  onUpdateDescription 
}: ChecklistHeaderProps) {
  if (isEditing) {
    return (
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => onUpdateName?.(e.target.value)}
          className="text-2xl font-bold text-gray-800 mb-2 w-full border border-gray-300 rounded px-2 py-1 font-cinzel"
          placeholder="Nome da lista"
        />
        <textarea
          value={description}
          onChange={(e) => onUpdateDescription?.(e.target.value)}
          className="text-gray-600 w-full border border-gray-300 rounded px-2 py-1 resize-none"
          placeholder="Descrição da lista"
          rows={2}
        />
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-2 text-start font-cinzel">
        {name}
      </h1>
      <p className="text-gray-600 text-start">
        {description}
      </p>
    </div>
  );
}

export default ChecklistHeader; 