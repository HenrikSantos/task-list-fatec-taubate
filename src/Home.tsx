import { useState, useEffect } from "react";
import ChecklistGroup from "./components/ChecklistGroup";
import SideBarForm from "./components/SideBarForm";
import SearchBar from "./components/SearchBar";
import PageTitle from "./components/PageTitle";
import ExportImportButtons from "./components/ExportImportButtons";
import type { Checklist } from "./interfaces/checklist-interface";

function Home() {
  // Dados iniciais padrão caso não exista nada no localStorage
  const initialCheckLists: Checklist[] = [];

  // Carrega dados do localStorage ou usa os iniciais
  const [checkList, setCheckList] = useState<Checklist[]>(() => {
    try {
      const saved = localStorage.getItem("task-lists");
      return saved ? JSON.parse(saved) : initialCheckLists;
    } catch (e) {

      return initialCheckLists;
    }
  });

  // Salva no localStorage sempre que checkList mudar
  useEffect(() => {
    try {
      localStorage.setItem("task-lists", JSON.stringify(checkList));
    } catch (e) {

    }
  }, [checkList]);

  const [searchFilter, setSearchFilter] = useState<string>("");

  // Função para filtrar as checklists baseada no termo de busca
  const filteredCheckLists = checkList.filter((checklist) =>
    checklist.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    checklist.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
    checklist.tasks.some((task) =>
      task.name.toLowerCase().includes(searchFilter.toLowerCase())
    )
  );

  function addNewTask(checklist: Checklist): void {
    // Gerar novo ID único para a checklist
    const newChecklist = {
      ...checklist,
      id: Date.now(),
      tasks: checklist.tasks.map((task, index) => ({
        ...task,
        id: Date.now() + index + 1
      }))
    };

    setCheckList((prevList) => {
      const newList = [...prevList, newChecklist];

      return newList;
    });
  }

  function updateTaskStatus(checklistId: number, taskId: number): void {
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
    setCheckList((prevCheckList) =>
      prevCheckList.filter((checklist) => checklist.id !== checklistId)
    );
  }

  function updateChecklist(checklistId: number, updatedData: { name: string; description: string; tasks: { id: number; name: string; completed: boolean }[] }): void {
    setCheckList((prevCheckList) =>
      prevCheckList.map((checklist) =>
        checklist.id === checklistId
          ? { ...checklist, ...updatedData }
          : checklist
      )
    );
  }

  function handleImportData(importedData: Checklist[]): void {
    setCheckList(importedData);
  }

  return (
    <>
      <PageTitle title="Lista de Tarefas" />

      <div className="flex gap-8 h-full items-start bg-gray-50">
        <div className="flex-1 overflow-y-auto h-full pr-4">
          <SearchBar
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
            resultCount={filteredCheckLists.length}
          />

          <ChecklistGroup
            checkList={filteredCheckLists}
            updateTaskStatus={updateTaskStatus}
            deleteChecklist={deleteChecklist}
            updateChecklist={updateChecklist}
          />
        </div>

        <div className="sticky top-4 flex-shrink-0 space-y-6">
          <SideBarForm addNewTask={addNewTask} />
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Backup</h2>
            <ExportImportButtons
              data={checkList}
              onImport={handleImportData}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
