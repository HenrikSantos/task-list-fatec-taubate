import React, { useState } from 'react'
import './Home.css'
import type { Checklist } from './interfaces/checklist-interface'
import ChecklistGroup from './components/ChecklistGroup'
import SideBarForm from './components/SideBarForm'
import EditChecklistModal from './components/EditChecklistModal'

function Home() {
  const [checkList, setCheckList] = useState<Checklist[]>([]);
  const [editingChecklist, setEditingChecklist] = useState<Checklist | null>(null);

  function adicionarChecklist(novoChecklist: Checklist) {
    setCheckList([...checkList, novoChecklist]);
  }
  function removerChecklist(id: number) {
    setCheckList(checkList.filter((c) => c.id !== id));
  }
  function editarChecklist(updated: Checklist) {
    setCheckList(checkList.map(c => c.id === updated.id ? updated : c));
  }
  function toggleTask(checklistId: number, taskId: number) {
    setCheckList(checkList.map(cl =>
      cl.id === checklistId
        ? { ...cl, tasks: cl.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) }
        : cl
    ));
  }
  return (
    <>
     <ChecklistGroup
        checklists={checkList}
        onRemoverChecklist={removerChecklist}
        onEditarChecklist={setEditingChecklist}
        onToggleTask={toggleTask}
     />
     <SideBarForm onSalvarTarefas={adicionarChecklist}/>
     {editingChecklist && (
        <EditChecklistModal
            checklist={editingChecklist}
            onSave={editarChecklist}
            onClose={() => setEditingChecklist(null)}
        />
     )}
    </>
  )
}

export default Home
