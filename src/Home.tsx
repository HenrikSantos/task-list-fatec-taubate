import { useState } from "react";
import ChecklistGroup from "./components/ChecklistGroup";
import SideBarForm from "./components/SideBarForm";
import type { Checklist } from "./interfaces/checklist-interface";

function Home() {
  const [checkList, setCheckList] = useState<Checklist[]>([
    {
      id: 1,
      name: "Lista de Tarefas 1",
      description: "Lista de Tarefas 1",
      tasks: [
        {
          id: 1,
          name: "Tarefa 1",
          completed: false,
        },
        {
          id: 2,
          name: "Tarefa 2",
          completed: false,
        },
        {
          id: 3,
          name: "Tarefa 3",
          completed: false,
        },
      ],
    },
    {
      id: 2,
      name: "Lista de Tarefas 2",
      description: "Lista de Tarefas 2",
      tasks: [
        {
          id: 4,
          name: "Tarefa 4",
          completed: false,
        },
      ],
    },
    {
      id: 3,
      name: "Lista de Tarefas 3",
      description: "Lista de Tarefas 3",
      tasks: [
        {
          id: 5,
          name: "Tarefa 5",
          completed: true,
        },
      ],
    },
    {
      id: 4,
      name: "Lista de Tarefas 4",
      description: "Lista de Tarefas 4",
      tasks: [
        {
          id: 6,
          name: "Tarefa 6",
          completed: false,
        },
      ],
    },
  ]);

  function addNewTask(checklist: Checklist): void {
    console.log("addNewTask chamada com:", checklist);
    setCheckList((prevList) => {
      const newList = [...prevList, checklist];
      console.log("Nova lista:", newList);
      return newList;
    });
  }

  function updateTaskStatus(checklistId: number, taskId: number): void {
    console.log("updateTaskStatus chamada:", { checklistId, taskId });
    setCheckList((prevCheckList) =>
      prevCheckList.map((checklist) =>
        checklist.id === checklistId
          ? {
              ...checklist,
              tasks: checklist.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : checklist
      )
    );
  }

  function deleteChecklist(checklistId: number): void {
    console.log("deleteChecklist chamada:", { checklistId });
    setCheckList((prevCheckList) =>
      prevCheckList.filter((checklist) => checklist.id !== checklistId)
    );
  }

  return (
    <div className="flex gap-8 h-full items-start bg-gray-50">
      <div className="flex-1 overflow-y-auto h-full pr-4">
        <ChecklistGroup
          checkList={checkList}
          updateTaskStatus={updateTaskStatus}
          deleteChecklist={deleteChecklist}
        />
      </div>

      <div className="sticky top-4 flex-shrink-0">
        <SideBarForm addNewTask={addNewTask} />
      </div>
    </div>
  );
}

export default Home;
