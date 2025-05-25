import React, { useState } from "react";
import type { Checklist } from "../interfaces/checklist-interface";
import type { Task } from "../interfaces/task-interface";


function SidebarForm (props: {onSalvarTarefas: (Checklist: Checklist) => void}) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tarefas, setTarefas] = useState<Task[]>([]);
    const [inputNomeTarefa, setInputNomeTarefa] = useState("");

    function addLine(){
        if (inputNomeTarefa.trim() !== "") {
            setTarefas([...tarefas, { id: Date.now(), name: inputNomeTarefa, completed: false }]);
            setInputNomeTarefa("");
        }
    }

    function salvarChecklist() {
        const novoChecklist: Checklist = {
            id: Date.now(),
            name: nome,
            description: descricao,
            tasks: tarefas
        };
        props.onSalvarTarefas(novoChecklist);
        setNome("");
        setDescricao("");
        setTarefas([]);
    }
    

    return <>
    <div>
        <p>Minha Lista de Tarefas</p>
        <img src="/Logo.png" alt="logo" />
    </div>
    
    <div>
        <p>Nome </p>
        <input type="text" value={nome } onChange={e => setNome(e.target.value)}/>
    </div>
    
    <div>
        <p>Descrição</p>
        <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} />
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
        {tarefas.map((tarefa, index) => (
                <p key={tarefa.id}>{tarefa.name}</p>
            ))}
    </div>
    <button onClick={addLine}>Adicionar</button>
    <button onClick={salvarChecklist}>Salvar</button>
    </>
}

export default SidebarForm