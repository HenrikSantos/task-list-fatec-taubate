import type { Checklist } from "../interfaces/checklist-interface.ts";
import { useState } from "react";
import ChecklistHeader from "./ChecklistHeader";
import ProgressBar from "./ProgressBar";
import TaskList from "./TaskList";
import ActionButtons from "./ActionButtons";

interface ChecklistGroupProps {
  checkList: Checklist[];
  updateTaskStatus: (checklistId: number, taskId: number) => void;
  deleteChecklist: (checklistId: number) => void;
  updateChecklist?: (checklistId: number, updatedData: { name: string; description: string; tasks: { id: number; name: string; completed: boolean }[] }) => void;
}

function ChecklistGroup({
  checkList,
  updateTaskStatus,
  deleteChecklist,
  updateChecklist,
}: ChecklistGroupProps) {
  const [isEditing, setIsEditing] = useState<Record<number, boolean>>({});
  const [editingValues, setEditingValues] = useState<Record<number, { name: string; description: string; tasks: { id: number; name: string; completed: boolean }[] }>>({});

  const startEditing = (checklist: Checklist): void => {
    setIsEditing(prev => ({ ...prev, [checklist.id]: true }));
    setEditingValues(prev => ({
      ...prev,
      [checklist.id]: {
        name: checklist.name,
        description: checklist.description,
        tasks: [...checklist.tasks]
      }
    }));
  };

  const cancelEditing = (checklistId: number): void => {
    setIsEditing(prev => ({ ...prev, [checklistId]: false }));
    setEditingValues(prev => {
      const { [checklistId]: _, ...rest } = prev;
      return rest;
    });
  };

  const saveChanges = (checklistId: number): void => {
    if (updateChecklist && editingValues[checklistId]) {
      updateChecklist(checklistId, editingValues[checklistId]);
      setIsEditing(prev => ({ ...prev, [checklistId]: false }));
      setEditingValues(prev => {
        const { [checklistId]: _, ...rest } = prev;
        return rest;
      });
    } else {
      console.warn('updateChecklist function not provided or editingValues not found');
    }
  };

  const updateEditingName = (checklistId: number, newName: string): void => {
    setEditingValues(prev => ({
      ...prev,
      [checklistId]: {
        ...prev[checklistId],
        name: newName
      }
    }));
  };

  const updateEditingDescription = (checklistId: number, newDescription: string): void => {
    setEditingValues(prev => ({
      ...prev,
      [checklistId]: {
        ...prev[checklistId],
        description: newDescription
      }
    }));
  };

  const updateEditingTaskName = (checklistId: number, taskId: number, newName: string): void => {
    setEditingValues(prev => ({
      ...prev,
      [checklistId]: {
        ...prev[checklistId],
        tasks: prev[checklistId].tasks.map(task =>
          task.id === taskId ? { ...task, name: newName } : task
        )
      }
    }));
  };

  const addNewTask = (checklistId: number): void => {
    const newTaskId = Date.now(); // Usar Date.now() para IDs únicos
    setEditingValues(prev => ({
      ...prev,
      [checklistId]: {
        ...prev[checklistId],
        tasks: [
          ...prev[checklistId].tasks,
          { id: newTaskId, name: '', completed: false }
        ]
      }
    }));
  };

  const removeTask = (checklistId: number, taskId: number): void => {
    setEditingValues(prev => ({
      ...prev,
      [checklistId]: {
        ...prev[checklistId],
        tasks: prev[checklistId].tasks.filter(task => task.id !== taskId)
      }
    }));
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {checkList.map((checklist) => {
        const isCurrentlyEditing = isEditing[checklist.id] || false;
        const currentValues = editingValues[checklist.id];

        const completedTasks = checklist.tasks.filter(
          (task) => task.completed
        ).length;
        const totalTasks = checklist.tasks.length;

        const displayTasks = isCurrentlyEditing ? currentValues?.tasks || [] : checklist.tasks;
        const displayName = isCurrentlyEditing ? currentValues?.name || '' : checklist.name;
        const displayDescription = isCurrentlyEditing ? currentValues?.description || '' : checklist.description;

        return (
          <div
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-fit"
            key={checklist.id}
          >
            <ChecklistHeader
              name={displayName}
              description={displayDescription}
              isEditing={isCurrentlyEditing}
              onUpdateName={(newName) => updateEditingName(checklist.id, newName)}
              onUpdateDescription={(newDescription) => updateEditingDescription(checklist.id, newDescription)}
            />

            <ProgressBar
              completedTasks={completedTasks}
              totalTasks={totalTasks}
            />

            <TaskList
              tasks={displayTasks}
              isEditing={isCurrentlyEditing}
              onToggleTaskComplete={(taskId) => updateTaskStatus(checklist.id, taskId)}
              onUpdateTaskName={(taskId, newName) => updateEditingTaskName(checklist.id, taskId, newName)}
              onRemoveTask={(taskId) => removeTask(checklist.id, taskId)}
              onAddNewTask={() => addNewTask(checklist.id)}
            />

            <ActionButtons
              isEditing={isCurrentlyEditing}
              onEdit={() => startEditing(checklist)}
              onDelete={() => deleteChecklist(checklist.id)}
              onSave={() => saveChanges(checklist.id)}
              onCancel={() => cancelEditing(checklist.id)}
              canSave={!!updateChecklist}
            />
          </div>
        );
      })}
    </section>
  );
}

export default ChecklistGroup;
