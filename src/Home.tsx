import React, { useState } from 'react'
import './Home.css'
import ChecklistGroup from './components/ChecklistGroup'
import SideBarForm from './components/SideBarForm'

function Home() {
  const [checkList, setCheckList] = useState([]);
  return (
    <>
     <ChecklistGroup tarefas={checkList}/>
     <SideBarForm onSalvarTarefas={setCheckList}/>
    </>
  )
}

export default Home
