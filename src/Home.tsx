import React, { useState } from 'react'
import './Home.css'
import type { Checklist } from './interfaces/checklist-interface'
import ChecklistGroup from './components/ChecklistGroup'
import SideBarForm from './components/SideBarForm'

function Home() {
  const [checkList, setCheckList] = useState<Checklist[]>([]);
  function adicionarChecklist(novoChecklist: Checklist) {
    setCheckList([...checkList, novoChecklist]);
  }
  return (
    <>
     <ChecklistGroup checklists={checkList}/>
     <SideBarForm onSalvarTarefas={adicionarChecklist}/>
    </>
  )
}

export default Home
