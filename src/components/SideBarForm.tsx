import React, { useState } from "react";
import type { Checklist } from "../interfaces/checklist-interface";
import type { Task } from "../interfaces/task-interface";


function SidebarForm({ onSalvarTarefas,  }: { onSalvarTarefas: (Checklist: Checklist) => void }) {
    const [checklist, setChecklist] = useState<Checklist>({
        id: 0,
        name: "",
        description: "",
        tasks: [],
    });

    const [inputNomeTarefa, setInputNomeTarefa] = useState("");

    function addLine() {
        if (inputNomeTarefa.trim() !== "") {
            setChecklist({
                ...checklist,
                tasks: [...checklist.tasks, { id: Date.now(), name: inputNomeTarefa, completed: false }]
            });
            setInputNomeTarefa("");
        }
    }

    function salvarChecklist() {
        const novoChecklist: Checklist = {
            ...checklist,
            id: Date.now(),
        };
        onSalvarTarefas(novoChecklist);
        setChecklist({
        id: 0,
        name: "",
        description: "",
        tasks: [],
        })
    }

    function removeTask(id: number){
        setChecklist({...checklist, tasks : checklist.tasks.filter((task) => task.id !== id)})
    }

const {name, description, tasks} = checklist;

    return <>
        <div>
            <p>Minha Lista de Tarefas</p>
            <img src="/Logo.png" alt="logo" />
        </div>

        <div>
            <p>Nome </p>
            <input type="text" value={name} onChange={e => setChecklist({...checklist, name:e.target.value})} />
        </div>

        <div>
            <p>Descrição</p>
            <input type="text" value={description} onChange={e => setChecklist({...checklist, description:e.target.value})} />
        </div>

        <div>
            <p>Adicionar Tarefa</p>
            <input
                type="text"
                value={inputNomeTarefa}
                onChange={e => setInputNomeTarefa(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") addLine(); }}
            />

        </div>

        <div>
            {tasks.map((tarefa) => (
                <>
                    <button onClick={() => removeTask(tarefa.id)}>X</button> 
                    <p key={tarefa.id}>{tarefa.name}</p>
                </>
                
            ))}
        </div>
        <button onClick={addLine}>Adicionar</button>
        <button onClick={salvarChecklist}>Salvar</button>
    </>
}

export default SidebarForm