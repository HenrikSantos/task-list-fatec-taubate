import { useState } from "react";
import type { Checklist, Task } from "../interfaces/checklist-interface.ts";

interface SidebarFormProps {
  addNewTask: (checklist: Checklist) => void;
}

function SidebarForm({ addNewTask }: SidebarFormProps) {
  const [checklist, setChecklist] = useState<Checklist>({
    id: 0,
    name: "",
    description: "",
    tasks: [],
  });

  const [newTaskName, setNewTaskName] = useState<string>("");

  function addLine(): void {
    if (newTaskName.trim() !== "") {
      const newTask: Task = {
        id: Date.now(),
        name: newTaskName.trim(),
        completed: false,
      };

      setChecklist({
        ...checklist,
        tasks: [...checklist.tasks, newTask],
      });
      setNewTaskName("");
    }
  }

  function removeTask(taskId: number): void {
    setChecklist({
      ...checklist,
      tasks: checklist.tasks.filter((task) => task.id !== taskId),
    });
  }

  function updateTaskName(taskId: number, newName: string): void {
    setChecklist({
      ...checklist,
      tasks: checklist.tasks.map((task) =>
        task.id === taskId ? { ...task, name: newName } : task
      ),
    });
  }

  function handleSave(): void {
    const trimmedName = checklist.name.trim();
    const trimmedDescription = checklist.description.trim();
    const validTasks = checklist.tasks.filter(
      (task) => task.name.trim() !== ""
    );

    if (trimmedName === "") {
      alert("Por favor, digite um nome para a lista de tarefas.");
      return;
    }

    if (validTasks.length === 0) {
      alert("Por favor, adicione pelo menos uma tarefa à lista.");
      return;
    }

    const newChecklist: Checklist = {
      ...checklist,
      id: Date.now(),
      name: trimmedName,
      description: trimmedDescription,
      tasks: validTasks,
    };

    addNewTask(newChecklist);

    // Reset form
    setChecklist({
      id: 0,
      name: "",
      description: "",
      tasks: [],
    });
    setNewTaskName("");

    console.log("Checklist salvo:", newChecklist);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      addLine();
    }
  }

  const canSave =
    checklist.name.trim() !== "" &&
    checklist.tasks.filter((task) => task.name.trim() !== "").length > 0;

  return (
    <aside className="w-auto bg-white rounded-lg p-6 shadow-sm max-h-[calc(100vh-3rem)] overflow-y-auto">
      <div className="space-y-6 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={checklist.name}
            onChange={(evento) =>
              setChecklist({ ...checklist, name: evento.target.value })
            }
            placeholder="Digite o nome da lista"
            className="w-full mb-4"
          />

          <input
            type="text"
            value={checklist.description}
            onChange={(evento) =>
              setChecklist({ ...checklist, description: evento.target.value })
            }
            placeholder="Digite a descrição da lista"
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          {checklist.tasks.length === 0 && (
            <p className="text-gray-400 italic text-center py-4">
              Nenhuma tarefa adicionada
            </p>
          )}
          {checklist.tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3">
              <button
                onClick={() => removeTask(task.id)}
                className="w-6 h-6 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 flex items-center justify-center text-sm"
                title="Remover tarefa"
              >
                ×
              </button>
              <input
                type="text"
                value={task.name}
                onChange={(evento) =>
                  updateTaskName(task.id, evento.target.value)
                }
                className="flex-1"
                placeholder="Nome da tarefa"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newTaskName}
            onChange={(evento) => setNewTaskName(evento.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite o nome da tarefa"
            className="flex-1"
          />
          <button
            onClick={addLine}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors disabled:opacity-50"
            disabled={newTaskName.trim() === ""}
          >
            Adicionar
          </button>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!canSave}
        >
          Salvar
        </button>
      </div>
    </aside>
  );
}

export default SidebarForm;
